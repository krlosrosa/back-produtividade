import { Controller, HttpResponse, Validation } from "@/presentation/protocols";
import { badRequest, serverError, ok, forbidden } from "@/presentation/helpers";
import { AddAccount } from "@/domain/usecases";

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
  ) {}

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const { name, id, password, centerId } = request;
      const isValid = await this.addAccount.addAccount({
        name,
        id,
        password,
        centerId
      });
      return ok(isValid);
    } catch (error) {
      console.log(error)
      return serverError(error);
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string;
    id: string;
    password: string;
    centerId: string;
    passwordConfirmation: string;
  };
}
