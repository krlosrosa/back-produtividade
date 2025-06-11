import { DbAddFuncionarioEmMassa } from '@/data/useCases'
import { AddFuncionarioEmMassa } from '@/domain/usecases'
import { AccountPrismaRepository } from '@/infra/data/prisma/account'

export const makeAddFuncionarioEmMassa= (): AddFuncionarioEmMassa => {
  const accountMongoRepository = new AccountPrismaRepository()
  return new DbAddFuncionarioEmMassa(accountMongoRepository)
}
