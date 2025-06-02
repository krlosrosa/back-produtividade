import { Controller } from "@/presentation/protocols"
import { GetProdutividadeByTransporteController } from "@/presentation/controllers/get-produtividade-by-transporte-and-id"
import { makeDbGetProdutividadeByTransporte } from "../usecases/get-produtividade-by-transporte-factory"

export const makeGetProdutividadeByTransporteController = (): Controller => {
  const controller = new GetProdutividadeByTransporteController(makeDbGetProdutividadeByTransporte())
  return controller
}
