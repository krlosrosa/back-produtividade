import { ResetDeSenhaController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { makeResetDeSenha } from '../usecases'
import { makeLogControllerDecorator } from '../decorators/logger-controller-decorator'

export const makeResetDeSenhaController = (): Controller => {
  const controller = new ResetDeSenhaController(makeResetDeSenha())
  return makeLogControllerDecorator(controller)
}
