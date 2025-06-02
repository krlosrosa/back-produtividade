import { CriarFunctionario } from "@/domain/usecases/criar-funcionario";

export interface CriarFunctionarioRepository {
  criarFuncionario: (
    params: CriarFunctionario.Params
  ) => Promise<CriarFunctionario.Result>;
}
