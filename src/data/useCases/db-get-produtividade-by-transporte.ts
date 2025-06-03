import { GetProdutividadeByTransporteAndId } from "@/domain/usecases/get-produtividade-by-tranpode-and-id";
import GetProdutividadeByTransporteAndIdRepository from "../protocols/get-produtividade-by-transporte-repository";
import { calcularProdutividade } from "@/utils/calcularProdutividade";

export class DbGetProdutividadeByTransporteAndId
  implements GetProdutividadeByTransporteAndId
{
  constructor(
    private readonly getProdutividadeByTransporteAndId: GetProdutividadeByTransporteAndIdRepository
  ) {}

  async getProdutividadeByTransporte(
    params: GetProdutividadeByTransporteAndId.Params
  ): Promise<GetProdutividadeByTransporteAndId.Result> {
    const data =
      await this.getProdutividadeByTransporteAndId.getProdutividadeByTransporte(
        params
      );
    const produtividade = calcularProdutividade(data)


    return { ...data, produtividade };
  }
}
