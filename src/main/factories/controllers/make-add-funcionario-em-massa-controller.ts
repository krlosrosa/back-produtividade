import { AddFuncionarioEmMassaController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeAddFuncionarioEmMassa } from '../usecases'
import { makeLogControllerDecorator } from '../decorators/logger-controller-decorator'

export const makeAddFuncionarioEmMassaController = (): Controller => {
  const controller = new AddFuncionarioEmMassaController(makeAddFuncionarioEmMassa())
  return makeLogControllerDecorator(controller)
}
