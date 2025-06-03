import { GetProdutividadeByTransporteAndId } from "@/domain/usecases/get-produtividade-by-tranpode-and-id";

export default interface GetProdutividadeByTransporteAndIdRepository {
  getProdutividadeByTransporte: (
    params: GetProdutividadeByTransporteAndId.Params
  ) => Promise<Omit<GetProdutividadeByTransporteAndId.Result, "produtividade">>;
}