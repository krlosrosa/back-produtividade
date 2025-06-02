import { AddAccount } from "@/domain/usecases";
import { Hasher } from "../protocols/hasher";
import { AddAccountRepository } from "../protocols/add-account-repository";

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async addAccount(accountData: AddAccount.Params): Promise<AddAccount.Result> {
    const hashedPassword = await this.hasher.hash(accountData.password);
    const isValid = await this.addAccountRepository.addAccount({
      ...accountData,
      password: hashedPassword,
    });
    return isValid;
  }
}
