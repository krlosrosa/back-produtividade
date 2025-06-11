import { AddFuncionarioEmMassa } from "@/domain/usecases";

export interface AddFuncionarioEmMassaRepository {
  addFuncionarioEmMassa: (params: AddFuncionarioEmMassa.Params) => Promise<AddFuncionarioEmMassa.Result>
}
