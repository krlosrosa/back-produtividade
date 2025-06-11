import { type AddFuncionarioEmMassaRepository } from '../protocols'
import { type AddFuncionarioEmMassa } from '../../domain/usecases'

export class DbAddFuncionarioEmMassa implements AddFuncionarioEmMassa {
  constructor (private readonly addFuncionario: AddFuncionarioEmMassaRepository) {}
  async addFuncionarioEmMassa (params: AddFuncionarioEmMassa.Params): Promise<AddFuncionarioEmMassa.Result> {
    const response = await this.addFuncionario.addFuncionarioEmMassa(params)
    return response
  }
}


