import { DbAddAccount } from "@/data/useCases/db-add-account";
import { DbAddProdutividade } from "@/data/useCases/db-add-produtividade";
import { AddAccount } from "@/domain/usecases";
import AddProdutividade from "@/domain/usecases/addProdutividade";
import { BcryptAdapter } from "@/infra/cryptography";
import { AccountPrismaRepository } from "@/infra/data/prisma/account";

export const makeDbCreateAccount = (): AddAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountPrismaRepository();
  return new DbAddAccount(bcryptAdapter, accountMongoRepository);
};
