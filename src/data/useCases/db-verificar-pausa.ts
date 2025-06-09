import { type VerificarPausa } from "../../domain/usecases";
import { VerificarPausaRepository } from "../protocols";

export class DbVerificarPausa implements VerificarPausa {
  constructor(private readonly verificar: VerificarPausaRepository) {}
  async verificarPausa(
    params: VerificarPausa.Params
  ): Promise<VerificarPausa.Result> {
    const response = await this.verificar.verificarPausa(params);
    return response;
  }
}
