import { DbAuthentication } from '@/data/useCases/db-authentication'
import { Authentication } from '@/domain/usecases/authentication'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { AccountPrismaRepository } from '@/infra/data/prisma/account'
import env from '@/main/config/env'


export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountPrismaRepository()
  return new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
}
