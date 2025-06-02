import { GetProdutividadeByCenterAndData } from "@/domain/usecases/get-productivity-by-center-and-data";

export default interface GetProdutividadeByCenterAndDataRepository {
  getProdutivicidade: (
    params: GetProdutividadeByCenterAndData.Params
  ) => Promise<GetProdutividadeByCenterAndData.Result[]>;
}
