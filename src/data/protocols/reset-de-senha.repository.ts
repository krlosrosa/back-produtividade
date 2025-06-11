import { ResetDeSenha } from "@/domain/usecases";

export interface ResetDeSenhaRepository {
  reset: (params: ResetDeSenha.Params) => Promise<ResetDeSenha.Result>
}
