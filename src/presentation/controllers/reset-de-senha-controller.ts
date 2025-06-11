import { type HttpResponse, type Controller } from "../protocols";
import { type Validator } from "../../validation/protocols/validator";
import { badRequest, ok, serverError } from "../helpers";
import { type ResetDeSenha } from "@/domain/usecases";

export class ResetDeSenhaController implements Controller {
  constructor(private readonly resetDeSenha: ResetDeSenha) {}

  async handle(request: ResetDeSenhaController.Request): Promise<HttpResponse> {
    try {
      const response = await this.resetDeSenha.reset({
        newPassword: request.newPassword,
        userId: request.accountId,
      });
      return ok(response);
    } catch (err) {
      return serverError(err);
    }
  }
}

export namespace ResetDeSenhaController {
  export type Request = {
    accountId: string;
    currentPassword: string;
    newPassword: string;
  };
}
