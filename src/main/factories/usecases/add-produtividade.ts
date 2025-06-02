import { DbAddProdutividade } from '@/data/useCases/db-add-produtividade'
import AddProdutividade from '@/domain/usecases/addProdutividade'
import { AccountPrismaRepository } from '@/infra/data/prisma/account'

export const makeDbAddProdutividade = (): AddProdutividade => {
  const accountMongoRepository = new AccountPrismaRepository()
  return new DbAddProdutividade(accountMongoRepository)
}
