import { Controller } from "@/presentation/protocols"
import { FinalizarProdutividadeController } from "@/presentation/controllers/finalizar-produtividade"
import { makeDbFinalizarProdutividade } from "../usecases/finalizar-produtividade"

export const makeFinalizarProdutividadeController = (): Controller => {
  const controller = new FinalizarProdutividadeController(makeDbFinalizarProdutividade())
  return controller
}
