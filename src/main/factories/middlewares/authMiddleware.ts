import { JwtAdapterMake } from '@/infra/auth/jwt/jwt-adapter-make'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { type Middleware } from '@/presentation/protocols'

export const makeAuthMiddleware = (): Middleware => {
  const jwtAdapter = new JwtAdapterMake()
  return new AuthMiddleware(jwtAdapter)
}
