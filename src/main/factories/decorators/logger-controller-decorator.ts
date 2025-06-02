import { Controller } from '@/presentation/protocols'
import { makeLogger } from '../observability/logger'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  return new LogControllerDecorator(controller, makeLogger())
}
