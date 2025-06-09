import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError, ok } from "@/presentation/helpers";
import { AddPausaAll } from "@/domain/usecases/add-pause-all";

export class AddPausaAllController implements Controller {
  constructor(private readonly addPausaProdutividade: AddPausaAll) {}

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const isValid = await this.addPausaProdutividade.addPausaAll({...request, data: new Date(request.data)});
      return ok(isValid);
    } catch (error) {
      console.log(error);
      return serverError(error);
    }
  }
}

export namespace SignUpController {
  export type Request = {
    centerId: string
    data: string
    processo: string
  };
}
