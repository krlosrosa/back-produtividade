import { FinalizarPausaAll } from "@/domain/usecases/finalizar-pausa-all";

export interface FinalizarPausaAllRepository {
  finalizarPausaAll: (account: FinalizarPausaAll.Params) => Promise<FinalizarPausaAll.Result>
}
