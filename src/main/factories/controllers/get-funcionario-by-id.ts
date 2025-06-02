import { Controller } from "@/presentation/protocols"
import { makeDbGetFuncionarioByIdCenter } from "../usecases/get-funcionario-by-id"
import { GetFuncionarioByIdController } from "@/presentation/controllers/get-funcionario-by-id-controller "


export const makeGetFuncionarioByIdController = (): Controller => {
  const controller = new GetFuncionarioByIdController(makeDbGetFuncionarioByIdCenter())
  return controller
}
