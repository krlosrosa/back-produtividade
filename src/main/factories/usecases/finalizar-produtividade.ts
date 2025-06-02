import { DbFinalizarProdutividade } from '@/data/useCases/db-finalizar-produtividade'
import FinalizarProdutividade from '@/domain/usecases/finalizarProdutividade'
import { AccountPrismaRepository } from '@/infra/data/prisma/account'

export const makeDbFinalizarProdutividade = (): FinalizarProdutividade => {
  const accountMongoRepository = new AccountPrismaRepository()
  return new DbFinalizarProdutividade(accountMongoRepository)
}
