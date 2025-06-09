import { DbVerificarPausa } from '@/data/useCases'
import { VerificarPausa } from '@/domain/usecases'
import { AccountPrismaRepository } from '@/infra/data/prisma/account'

export const makeVerificarPausa= (): VerificarPausa => {
  const prisma = new AccountPrismaRepository()
  return new DbVerificarPausa(prisma)
}
