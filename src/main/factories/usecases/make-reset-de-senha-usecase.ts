import { DbResetDeSenha } from "@/data/useCases";
import { ResetDeSenha } from "@/domain/usecases";
import { BcryptAdapter } from "@/infra/cryptography";
import { AccountPrismaRepository } from "@/infra/data/prisma/account";

export const makeResetDeSenha = (): ResetDeSenha => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountPrismaRepository();
  return new DbResetDeSenha(bcryptAdapter, accountMongoRepository);
};
