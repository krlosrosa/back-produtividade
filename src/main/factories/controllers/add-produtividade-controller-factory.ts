import { Controller } from "@/presentation/protocols"
import { makeDbAddProdutividade } from "../usecases/add-produtividade"
import { AddProdutividadeController } from "@/presentation/controllers/add-produtividade"

export const makeAddProdutividadeController = (): Controller => {
  const controller = new AddProdutividadeController(makeDbAddProdutividade())
  return controller
}
