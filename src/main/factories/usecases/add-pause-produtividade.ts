import { DbAddPausaProdutividade } from '@/data/useCases/db-adicionar-pausa'
import { DbFinalizarProdutividade } from '@/data/useCases/db-finalizar-produtividade'
import { AddPauseProdutividade } from '@/domain/usecases/add-pause-produtividade'
import FinalizarProdutividade from '@/domain/usecases/finalizarProdutividade'
import { AccountPrismaRepository } from '@/infra/data/prisma/account'

export const makeDbAddPausaProdutividade= (): AddPauseProdutividade => {
  const accountMongoRepository = new AccountPrismaRepository()
  return new DbAddPausaProdutividade(accountMongoRepository)
}
