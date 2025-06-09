import { VerificarPausaController } from '@/presentation/controllers'
import { type Controller } from '@/presentation/protocols'
import { verificarPausaSchema } from '@/validation/validators'
import { makeVerificarPausa } from '../usecases'
import { makeLogControllerDecorator } from '../decorators/logger-controller-decorator'

export const makeVerificarPausaController = (): Controller => {
  const controller = new VerificarPausaController(makeVerificarPausa())
  return makeLogControllerDecorator(controller)
}
