import { Controller } from "@/presentation/protocols"
import { FinalizarPausaAllController } from "@/presentation/controllers/finalizar-pausaall-controller"
import { makeDbFinalizarPausaAll } from "../usecases/finalizar-pausa-all"

export const makeFinalizarPausaAllController = (): Controller => {
  const controller = new FinalizarPausaAllController(makeDbFinalizarPausaAll())
  return controller
}
