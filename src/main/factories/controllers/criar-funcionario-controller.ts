import { Controller } from "@/presentation/protocols";
import { makeDbCriarFuncionario } from "../usecases/criar-funcrionario-factory";
import { CriarFuncionarioController } from "@/presentation/controllers/criar-funcionario-controller";

export const makeCriarFuncionarioController = (): Controller => {
  const controller = new CriarFuncionarioController(makeDbCriarFuncionario());
  return controller;
};
