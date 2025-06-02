import { GetFunctionarioById } from "@/domain/usecases/get-funcionario";

export interface GetFunctionarioByIdRepository {
  getFuncionario: (
    params: GetFunctionarioById.Params
  ) => Promise<GetFunctionarioById.Result>;
}
