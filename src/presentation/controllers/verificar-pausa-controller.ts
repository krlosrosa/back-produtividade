import { type HttpResponse, type Controller } from "../protocols";
import { type Validator } from "../../validation/protocols/validator";
import { badRequest, ok, serverError } from "../helpers";
import { type VerificarPausa } from "@/domain/usecases";

export class VerificarPausaController implements Controller {
  constructor(private readonly verificarPausa: VerificarPausa) {}

  async handle(
    request: VerificarPausaController.Request
  ): Promise<HttpResponse> {

    try {
      const response = await this.verificarPausa.verificarPausa({
        ...request,
        data: new Date(request.data),
      });
      console.log({responder: response})
      return ok(response);
    } catch (err) {
      return serverError(err);
    }
  }
}

export namespace VerificarPausaController {
  export type Request = {
    centerId: string;
    data: string;
    processo: string;
  };
}
