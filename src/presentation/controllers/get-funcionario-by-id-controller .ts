import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError, ok } from "@/presentation/helpers";
import { GetFunctionarioById } from "@/domain/usecases/get-funcionario";

export class GetFuncionarioByIdController implements Controller {
  constructor(
    private readonly getFuncionario: GetFunctionarioById
  ) {}

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      console.log(request)
      const usuario = await this.getFuncionario.getFuncionario(request);
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
    centerId: string
  };
}
