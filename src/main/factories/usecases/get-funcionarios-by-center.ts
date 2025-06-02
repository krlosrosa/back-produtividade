import { DbGetFuncionariosByCenter } from '@/data/useCases/db-getFuncionariosByCenter'
import { GetFuncionariosByCenter } from '@/domain/usecases/get-funcionarios-by-center'
import { AccountPrismaRepository } from '@/infra/data/prisma/account'

export const makeDbGetFuncionariosByCenter = (): GetFuncionariosByCenter => {
  const accountMongoRepository = new AccountPrismaRepository()
  return new DbGetFuncionariosByCenter(accountMongoRepository)
}
