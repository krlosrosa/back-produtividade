import { type Authorization } from '@/infra/auth/protocols/authorization'
import { type Decrypter } from '@/infra/auth/protocols/decrypter'
import jwt from 'jsonwebtoken'
import env from '@/main/config/env'
import { TokenExpiredError } from '@/presentation/errors/token-expired'
import { TokenInvalidError } from '@/presentation/errors/token-invalid'
import { loggerWraper } from '@/infra/observability/logger/logger-provider'

export class JwtAdapter implements Decrypter, Authorization {
  async decrypt (ciphertext: string): Promise<any> {
    const info = jwt.decode(ciphertext) as any
    if (info) {
      return info.preferred_username
    }
  }

  async authorization (ciphertext: string): Promise<boolean> {
    try {
      const validToken = jwt.verify(ciphertext, env.publicKey, { algorithms: ['RS256'] })
      return !!validToken
    } catch (error) {
      loggerWraper.error(`JwtAdapter | authorization ${error}`)
      if (error.name === 'TokenExpiredError') throw new TokenExpiredError()
      if (error.name === 'JsonWebTokenError') throw new TokenInvalidError()
      throw new Error('Token inválido') // Lança um erro customizado
    }
  }
}
