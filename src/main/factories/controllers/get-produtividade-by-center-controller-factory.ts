import { Controller } from "@/presentation/protocols"
import { GetProdutivicidadeByCenterController } from "@/presentation/controllers/get-produtividade-by-center-controller"
import { makeDbGetProdutividadeByCenter } from "../usecases/get-produtividade-by-center"

export const makeGetProdutividadeByCenterController = (): Controller => {
  const controller = new GetProdutivicidadeByCenterController(makeDbGetProdutividadeByCenter())
  return controller
}
