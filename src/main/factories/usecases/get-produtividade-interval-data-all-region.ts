import { DbGetProdutividadeIntervalDataAllRegion } from '@/data/useCases/db-get-produtividade-interval-data-all-region'
import { GetProdutividadeIntervalDataAllRegion } from '@/domain/usecases/get-produtividade-interval-date-all-region'
import { AccountPrismaRepository } from '@/infra/data/prisma/account'

export const makeDbGetProdutividadeIntervalDataAllRegion = (): GetProdutividadeIntervalDataAllRegion => {
  const accountMongoRepository = new AccountPrismaRepository()
  return new DbGetProdutividadeIntervalDataAllRegion(accountMongoRepository)
}
