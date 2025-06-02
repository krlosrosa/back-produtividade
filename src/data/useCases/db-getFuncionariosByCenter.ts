import FinalizarProdutividade, { FinalizarParams } from "@/domain/usecases/finalizarProdutividade";
import FinalizarProdutividadeRepository from "../protocols/finalizar-produtividade-repository";
import { GetFuncionariosByCenter } from "@/domain/usecases/get-funcionarios-by-center";
import { GetFuncionariosByCenterRepository } from "../protocols/get-funcionarios-by-center-repository";


export class DbGetFuncionariosByCenter implements GetFuncionariosByCenter {
  constructor(
    private readonly getFuncionariosByCenter: GetFuncionariosByCenterRepository
  ) {}

  async getFuncionarios(params: GetFuncionariosByCenter.Params): Promise<GetFuncionariosByCenter.Result[]> {
    const funcionarios = await this.getFuncionariosByCenter.getFuncionarios(params);
    return funcionarios
  }
}
