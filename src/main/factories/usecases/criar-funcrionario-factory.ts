import { DbCriarFuncionario } from '@/data/useCases/db-criar-funcionario'
import { CriarFunctionario } from '@/domain/usecases/criar-funcionario'
import { AccountPrismaRepository } from '@/infra/data/prisma/account'

export const makeDbCriarFuncionario = (): CriarFunctionario => {
  const accountMongoRepository = new AccountPrismaRepository()
  return new DbCriarFuncionario(accountMongoRepository)
}
