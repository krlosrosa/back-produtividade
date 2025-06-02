import { type HttpResponse, type Middleware } from '../protocols'
import { type VerifyPermission } from '../../infra/auth/protocols/permission'
import { badRequest, forbidden, ok } from '../helpers'
import { type Decrypter } from '../../infra/auth/protocols/decrypter'
import { AccessDeniedError } from '../errors/access-denied-error'
import { loggerWraper } from '@/infra/observability/logger/logger-provider'

export class VerifyPermissionsMiddleware implements Middleware {
  constructor (
    private readonly verifyPermission: VerifyPermission,
    private readonly decodedJwt: Decrypter,
    private readonly action: string,
    private readonly subject: string
  ) {}

  async handle (request: VerifyPermissionsMiddleware.Request): Promise<HttpResponse> {
    try {
      const { center, accessToken } = request
      const user = await this.decodedJwt.decrypt(accessToken)
      const permissionValidate = await this.verifyPermission.validate({ center, user, action: this.action, subject: this.subject })
      if (permissionValidate) return ok(permissionValidate)
      return forbidden(new AccessDeniedError())
    } catch (error) {
      loggerWraper.error(`VerifyPermissionsMiddleware | handle ${error}`)
      return badRequest(error)
    }
  }
}

export namespace VerifyPermissionsMiddleware {
  export type Request = {
    accessToken: string
    center: string
  }
}
