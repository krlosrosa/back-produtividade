import { DbFinalizarPausaAll } from '@/data/useCases/db-finalizar-pausa-All'
import { FinalizarPausaAll } from '@/domain/usecases/finalizar-pausa-all'
import { AccountPrismaRepository } from '@/infra/data/prisma/account'

export const makeDbFinalizarPausaAll= (): FinalizarPausaAll => {
  const accountMongoRepository = new AccountPrismaRepository()
  return new DbFinalizarPausaAll(accountMongoRepository)
}
