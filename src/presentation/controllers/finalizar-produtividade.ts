import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError, ok } from "@/presentation/helpers";
import FinalizarProdutividade from "@/domain/usecases/finalizarProdutividade";

export class FinalizarProdutividadeController implements Controller {
  constructor(
    private readonly finalizarProdutividade: FinalizarProdutividade,
  ) {}

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const isValid = await this.finalizarProdutividade.finalizar(request);
      return ok(isValid);
    } catch (error) {
      console.log(error)
      return serverError(error);
    }
  }
}

export namespace SignUpController {
  export type Request = {
    idPallet: string;
    transporte: string;
    processo:string
    observacao?: {
      informacao: string;
    }
  };
}

