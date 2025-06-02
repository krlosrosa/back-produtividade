import { DbGetFuncionarioById } from '@/data/useCases/db-get-funcionario-by-id'
import { GetFunctionarioById } from '@/domain/usecases/get-funcionario'
import { AccountPrismaRepository } from '@/infra/data/prisma/account'

export const makeDbGetFuncionarioByIdCenter = (): GetFunctionarioById => {
  const accountMongoRepository = new AccountPrismaRepository()
  return new DbGetFuncionarioById(accountMongoRepository)
}
