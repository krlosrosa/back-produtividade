import { calcularProdutividade } from "@/utils/calcularProdutividade";
import { calcularIntervaloTrabalhado } from "@/utils/calcularIntervaloTrabalhado";
import { GetProdutividadeIntervalDataAllRegion } from "@/domain/usecases/get-produtividade-interval-date-all-region";
import { GetProdutividadeIntervalDataAllRegionRepository } from "../protocols/get-produtividade-interval-data-repository-all-region";


export class DbGetProdutividadeIntervalDataAllRegion implements GetProdutividadeIntervalDataAllRegion {
  constructor(
    private readonly getProdutividade: GetProdutividadeIntervalDataAllRegionRepository
  ) { }

  async getProdutividadeIntervalAllRegions(params: GetProdutividadeIntervalDataAllRegion.Params): Promise<GetProdutividadeIntervalDataAllRegion.Result[]> {
    const add = await this.getProdutividade.getProdutividadeIntervalAllRegions(params);
    return add.map((item) => ({ ...item, produtividade: calcularProdutividade(item), intervaloTrabalhado: calcularIntervaloTrabalhado(item) }))
  }
}
