import { Controller, HttpResponse } from "@/presentation/protocols";
import { LoggerProtocol } from "@/infra/observability/protocols/logger.protocol";

export class LogControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logger: LoggerProtocol
  ) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const controllerName = this.controller.constructor.name
      const startTime = Date.now();
      const httpResponse = await this.controller.handle(request);
      const duration = Date.now() - startTime;

      // Log com base no status da resposta
      if (httpResponse.statusCode >= 500) {
        this.logger.error(
          `Erro interno no servidor (${controllerName}) : ${httpResponse.statusCode} (${duration}ms)`,
          {
            error: httpResponse.body?.stack || httpResponse.body,
            path: request.url,
            method: request.method,
          }
        );
      } else if (httpResponse.statusCode >= 400) {
        this.logger.warn(
          `Erro de requisição do cliente (${controllerName}): ${httpResponse.statusCode} (${duration}ms)`,
          {
            error: httpResponse.body,
            path: request.url,
            method: request.method,
          }
        );
      } else {
        this.logger.info(
          `Requisição bem-sucedida (${controllerName}): ${httpResponse.statusCode} (${duration}ms)`,
          {
            path: request.url,
            method: request.method,
          }
        );
      }

      return httpResponse;
    } catch (error) {
      // Captura erros não tratados no controller
      this.logger.error(
        "Exceção não tratada no controller", 
        {
        name: error instanceof Error ? error.name : undefined,
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        path: request.url,
        method: request.method,
      });

      return {
        statusCode: 500,
        body: {
          error: "Erro interno no servidor",
          stack: error instanceof Error ? error.stack : String(error),
        },
      };
    }
  }
}
