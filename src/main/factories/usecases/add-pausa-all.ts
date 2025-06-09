import { DbAddPausaAll } from '@/data/useCases/db-add-pause-all'
import { AddPausaAll } from '@/domain/usecases/add-pause-all'
import { AccountPrismaRepository } from '@/infra/data/prisma/account'

export const makeDbAddPausaAll= (): AddPausaAll => {
  const accountMongoRepository = new AccountPrismaRepository()
  return new DbAddPausaAll(accountMongoRepository)
}
