import { GetProdutividadeIntervalData } from "@/domain/usecases/get-produtividade-interval-date";

export interface GetProdutividadeIntervalDataRepository {
  getProdutividadeInterval: (
    params: GetProdutividadeIntervalData.Params
  ) => Promise<GetProdutividadeIntervalData.Result[]>;
}
