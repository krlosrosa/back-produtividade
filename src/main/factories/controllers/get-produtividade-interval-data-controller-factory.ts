import { Controller } from "@/presentation/protocols"
import { GetProdutivicidadeByCenterController } from "@/presentation/controllers/get-produtividade-by-center-controller"
import { makeDbGetProdutividadeByCenter } from "../usecases/get-produtividade-by-center"
import { makeDbGetProdutividadeIntervalData } from "../usecases/get-produtividade-interval-data"
import { GetProdutivicidadeIntervalDataController } from "@/presentation/controllers/get-produtividade-interval-data"

export const makeGetProdutividadeIntervalDatarController = (): Controller => {
  const controller = new GetProdutivicidadeIntervalDataController(makeDbGetProdutividadeIntervalData())
  return controller
}
