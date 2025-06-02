
import { LoginController } from '@/presentation/controllers/login-controller'
import { Controller } from '@/presentation/protocols'
import { makeDbAuthentication } from '../usecases/authentication-factory'
import { makeLogControllerDecorator } from '../decorators/logger-controller-decorator'


export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication())
  return controller
}
