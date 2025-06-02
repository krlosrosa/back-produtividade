import { GetFunctionarioById } from "@/domain/usecases/get-funcionario";
import { GetFunctionarioByIdRepository } from "../protocols/get-funcionario-by-id";

export class DbGetFuncionarioById implements GetFunctionarioById {
  constructor(
    private readonly getFuncionarioById: GetFunctionarioByIdRepository
  ) {}

  async getFuncionario(params: GetFunctionarioById.Params): Promise<GetFunctionarioById.Result> {
    const funcionario = await this.getFuncionarioById.getFuncionario(params);
    return funcionario;
  }
}
