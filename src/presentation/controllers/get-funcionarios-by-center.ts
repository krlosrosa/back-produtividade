import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError, ok } from "@/presentation/helpers";
import { GetFuncionariosByCenter } from "@/domain/usecases/get-funcionarios-by-center";

export class GetFuncionariosByCenterController implements Controller {
  constructor(
    private readonly getfuncionarios: GetFuncionariosByCenter,
  ) {}

  async handle(request: GetFuncionariosController.Request): Promise<HttpResponse> {
    try {
      const funcionarios = await this.getfuncionarios.getFuncionarios(request);
      return ok(funcionarios);
    } catch (error) {
      console.log(error)
      return serverError(error);
    }
  }
}

export namespace GetFuncionariosController {
  export type Request = {
    centerId: string
  };
}
