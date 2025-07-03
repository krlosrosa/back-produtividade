import { GetProdutividadeByCenterAndData } from "@/domain/usecases/get-productivity-by-center-and-data";
import GetProdutividadeByCenterAndDataRepository from "../protocols/get-produtividade-by-center-repository";
import { calcularProdutividade } from "@/utils/calcularProdutividade";
import { calcularIntervaloTrabalhado } from "@/utils/calcularIntervaloTrabalhado";

export class DbGetProdutividadeByCenter
  implements GetProdutividadeByCenterAndData
{
  constructor(
    private readonly getProdutividade: GetProdutividadeByCenterAndDataRepository
  ) {}

  async getProdutivicidade(
    params: GetProdutividadeByCenterAndData.Params
  ): Promise<GetProdutividadeByCenterAndData.Result[]> {
    const add = await this.getProdutividade.getProdutivicidade(params);
    return add.map((item) => ({
      ...item,
      produtividade: calcularProdutividade(item),
      intervaloTrabalhado: calcularIntervaloTrabalhado(item),
    }));
  }
}
