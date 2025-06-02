import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError, ok } from "@/presentation/helpers";
import { GetFunctionarioById } from "@/domain/usecases/get-funcionario";
import { CriarFunctionario } from "@/domain/usecases/criar-funcionario";

export class CriarFuncionarioController implements Controller {
  constructor(
    private readonly criarFuncionario: CriarFunctionario
  ) {}

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const usuario = await this.criarFuncionario.criarFuncionario(request);
      return ok(usuario);
    } catch (error) {
      console.log(error);
      return serverError(error);
    }
  }
}

export namespace SignUpController {
  export type Request = {
    id: string;
    name: string
    centerId: string
  };
}
