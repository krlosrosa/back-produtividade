import { Controller } from "@/presentation/protocols";
import { SignUpController } from "@/presentation/controllers/create-account";
import { makeDbCreateAccount } from "../usecases/create-account";

export const makeAAddAccountController = (): Controller => {
  const controller = new SignUpController(makeDbCreateAccount());
  return controller;
};
