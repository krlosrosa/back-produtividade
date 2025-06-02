import { DbGetProdutividadeByCenter } from '@/data/useCases/db-get-produtividade-by-center'
import { GetProdutividadeByCenterAndData } from '@/domain/usecases/get-productivity-by-center-and-data'
import { AccountPrismaRepository } from '@/infra/data/prisma/account'

export const makeDbGetProdutividadeByCenter = (): GetProdutividadeByCenterAndData => {
  const accountMongoRepository = new AccountPrismaRepository()
  return new DbGetProdutividadeByCenter(accountMongoRepository)
}
