import { Controller } from "@/presentation/protocols"
import { GetProdutivicidadeIntervalDataAllRegionsController } from "@/presentation/controllers/get-produtividade-interval-data-all-regions"
import { makeDbGetProdutividadeIntervalDataAllRegion } from "../usecases/get-produtividade-interval-data-all-region"

export const makeGetProdutividadeIntervalDataAllRegionController = (): Controller => {
  const controller = new GetProdutivicidadeIntervalDataAllRegionsController(makeDbGetProdutividadeIntervalDataAllRegion())
  return controller
}
