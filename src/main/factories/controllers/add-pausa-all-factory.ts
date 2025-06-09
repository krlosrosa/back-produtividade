import { Controller } from "@/presentation/protocols"
import { AddPausaAllController } from "@/presentation/controllers/add-pausa-all"
import { makeDbAddPausaAll } from "../usecases/add-pausa-all"

export const makeAddPausaAllController = (): Controller => {
  const controller = new AddPausaAllController(makeDbAddPausaAll())
  return controller
}
