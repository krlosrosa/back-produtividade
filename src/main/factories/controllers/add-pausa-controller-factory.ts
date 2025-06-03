import { Controller } from "@/presentation/protocols"
import { makeDbAddPausaProdutividade } from "../usecases/add-pause-produtividade"
import { AddPausaProdutividadeController } from "@/presentation/controllers/add-pausa-produtividade"

export const makeAddPPausarodutividadeController = (): Controller => {
  const controller = new AddPausaProdutividadeController(makeDbAddPausaProdutividade())
  return controller
}
