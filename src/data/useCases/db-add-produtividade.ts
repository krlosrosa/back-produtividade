import AddProdutividade, { DadosTransporte } from "@/domain/usecases/addProdutividade";
import AddProdutividadeRepository from "../protocols/addProdutividade-repository";


export class DbAddProdutividade implements AddProdutividade {
  constructor(
    private readonly addProdutividadeRepository: AddProdutividadeRepository,
  ) {}

  async add(params: DadosTransporte): Promise<boolean> {
    const add = await this.addProdutividadeRepository.add(params);
    return add
  }
}
