import { GetProdutividadeIntervalData } from "@/domain/usecases/get-produtividade-interval-date";
import { GetProdutividadeIntervalDataRepository } from "../protocols/get-produtividade-interval-data-repository";
import { calcularProdutividade } from "@/utils/calcularProdutividade";
import { calcularIntervaloTrabalhado } from "@/utils/calcularIntervaloTrabalhado";


export class DbGetProdutividadeIntervalData implements GetProdutividadeIntervalData {
  constructor(
    private readonly getProdutividade: GetProdutividadeIntervalDataRepository
  ) {}

  async getProdutividadeInterval(params: GetProdutividadeIntervalData.Params): Promise<GetProdutividadeIntervalData.Result[]> {
    const add = await this.getProdutividade.getProdutividadeInterval(params);
    return add.map((item) => ({...item, produtividade: calcularProdutividade(item), intervaloTrabalhado: calcularIntervaloTrabalhado(item) }))
  }
}
