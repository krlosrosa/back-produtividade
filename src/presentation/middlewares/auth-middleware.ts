import { type HttpResponse, type Middleware } from '../protocols'
import { forbidden, ok, serverError, unauthorized } from '../helpers'
import { AccessDeniedError } from '../errors/access-denied-error'
import { type Decrypter } from '../../infra/auth/protocols/decrypter'
import { loggerWraper } from '@/infra/observability/logger/logger-provider'
export class AuthMiddleware implements Middleware {
  constructor (
    private readonly decrypt: Decrypter
  ) {}

  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request
      const user = await this.decrypt.decrypt(accessToken)
      if (user) return ok({ accountId: user })
      return forbidden(new AccessDeniedError())
    } catch (error) {
      loggerWraper.error(`AuthMiddleware | handle ${error}`)
      return serverError(error)
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
    center?: string
    user?: string
  }
}
