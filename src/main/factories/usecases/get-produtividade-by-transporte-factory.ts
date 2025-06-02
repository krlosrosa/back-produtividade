import { DbGetProdutividadeByTransporteAndId } from '@/data/useCases/db-get-produtividade-by-transporte'
import { GetProdutividadeByTransporteAndId } from '@/domain/usecases/get-produtividade-by-tranpode-and-id'
import { AccountPrismaRepository } from '@/infra/data/prisma/account'

export const makeDbGetProdutividadeByTransporte = (): GetProdutividadeByTransporteAndId => {
  const accountMongoRepository = new AccountPrismaRepository()
  return new DbGetProdutividadeByTransporteAndId(accountMongoRepository)
}
