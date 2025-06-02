import { GetProdutividadeByTransporteAndId } from "@/domain/usecases/get-produtividade-by-tranpode-and-id";
import GetProdutividadeByTransporteAndIdRepository from "../protocols/get=produtividade-by-transporte-repository";

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
    const horaFim = data.horaFim ?? new Date();
    const duracaoEmHoras =
      (horaFim.getTime() - data.horaInicio.getTime()) / 1000 / 60 / 60;

    const produtividade = duracaoEmHoras > 0 ? data.caixas / duracaoEmHoras : 0;

    return { ...data, produtividade };
  }
}
