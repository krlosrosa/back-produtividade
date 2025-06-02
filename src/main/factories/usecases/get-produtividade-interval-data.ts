import { DbGetProdutividadeIntervalData } from '@/data/useCases/db-get-produtividade-interval-data'
import { GetProdutividadeIntervalData } from '@/domain/usecases/get-produtividade-interval-date'
import { AccountPrismaRepository } from '@/infra/data/prisma/account'

export const makeDbGetProdutividadeIntervalData = (): GetProdutividadeIntervalData => {
  const accountMongoRepository = new AccountPrismaRepository()
  return new DbGetProdutividadeIntervalData(accountMongoRepository)
}
