import { type ResetDeSenhaRepository } from "../protocols";
import { type ResetDeSenha } from "../../domain/usecases";
import { Hasher } from "../protocols/hasher";

export class DbResetDeSenha implements ResetDeSenha {
  constructor(
    private readonly hasher: Hasher,
    private readonly resetDeSenha: ResetDeSenhaRepository
  ) {}
  async reset(params: ResetDeSenha.Params): Promise<ResetDeSenha.Result> {
    const hashedPassword = await this.hasher.hash(params.newPassword);
    const response = await this.resetDeSenha.reset({
      ...params,
      newPassword: hashedPassword,
    });
    return response;
  }
}
