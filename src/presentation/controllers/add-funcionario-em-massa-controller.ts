import { type HttpResponse, type Controller } from '../protocols'
import { badRequest, ok, serverError } from '../helpers'
import { type AddFuncionarioEmMassa } from '@/domain/usecases'


export class AddFuncionarioEmMassaController implements Controller {
  constructor(
    private readonly addFuncionarioEmMassa: AddFuncionarioEmMassa,
  ) {}

  async handle(request: AddFuncionarioEmMassaController.Request): Promise<HttpResponse> {
    try {
      const response = await this.addFuncionarioEmMassa.addFuncionarioEmMassa(request);
      return ok(response);
    } catch (err) {
      console.log(err)
      return serverError(err);
    }
  }
}

export namespace AddFuncionarioEmMassaController {
  export type Request = {
    funcionarios:Funcionarios[]
  }
  export type Result = boolean
}

type Funcionarios = {
  id: string
  name: string
  centerId: string
}