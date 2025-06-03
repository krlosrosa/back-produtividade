import { GetProdutividadeIntervalDataAllRegion } from "@/domain/usecases/get-produtividade-interval-date-all-region";

export interface GetProdutividadeIntervalDataAllRegionRepository {
  getProdutividadeIntervalAllRegions: (
    params: GetProdutividadeIntervalDataAllRegion.Params
  ) => Promise<GetProdutividadeIntervalDataAllRegion.Result[]>;
}
