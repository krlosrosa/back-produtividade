import AddProdutividade, { DadosTransporte } from "@/domain/usecases/addProdutividade";
import AddProdutividadeRepository from "../protocols/addProdutividade-repository";
import FinalizarProdutividade, { FinalizarParams } from "@/domain/usecases/finalizarProdutividade";
import FinalizarProdutividadeRepository from "../protocols/finalizar-produtividade-repository";


export class DbFinalizarProdutividade implements FinalizarProdutividade {
  constructor(
    private readonly finalizarProdutividade: FinalizarProdutividadeRepository
  ) {}

  async finalizar(params: FinalizarParams): Promise<boolean> {
    const add = await this.finalizarProdutividade.finalizar(params);
    return add
  }
}
