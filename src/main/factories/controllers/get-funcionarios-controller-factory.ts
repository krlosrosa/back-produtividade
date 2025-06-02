import { Controller } from "@/presentation/protocols"
import { GetFuncionariosByCenterController } from "@/presentation/controllers/get-funcionarios-by-center"
import { makeDbGetFuncionariosByCenter } from "../usecases/get-funcionarios-by-center"


export const makeGetFuncionariosController = (): Controller => {
  const controller = new GetFuncionariosByCenterController(makeDbGetFuncionariosByCenter())
  return controller
}
