import { GetFuncionariosByCenter } from "@/domain/usecases/get-funcionarios-by-center";

export interface GetFuncionariosByCenterRepository {
  getFuncionarios: (
    params: GetFuncionariosByCenter.Params
  ) => Promise<GetFuncionariosByCenter.Result[]>;
}
