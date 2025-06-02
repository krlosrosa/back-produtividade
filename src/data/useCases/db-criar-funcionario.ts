import { GetFunctionarioById } from "@/domain/usecases/get-funcionario";
import { GetFunctionarioByIdRepository } from "../protocols/get-funcionario-by-id";
import { CriarFunctionario } from "@/domain/usecases/criar-funcionario";
import { CriarFunctionarioRepository } from "../protocols/criar-funcionario";

export class DbCriarFuncionario implements CriarFunctionario {
  constructor(
    private readonly CriarFuncionario: CriarFunctionarioRepository
  ) {}

  async criarFuncionario(params: CriarFunctionario.Params): Promise<CriarFunctionario.Result> {
    const funcionario = await this.CriarFuncionario.criarFuncionario(params);
    return funcionario;
  }
}
