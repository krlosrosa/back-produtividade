import { VerificarPausa } from "@/domain/usecases";

export interface VerificarPausaRepository {
  verificarPausa: (params: VerificarPausa.Params) => Promise<VerificarPausa.Result>
}
