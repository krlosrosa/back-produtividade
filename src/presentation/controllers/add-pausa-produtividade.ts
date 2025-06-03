import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError, ok } from "@/presentation/helpers";
import FinalizarProdutividade from "@/domain/usecases/finalizarProdutividade";
import { AddPauseProdutividade } from "@/domain/usecases/add-pause-produtividade";

export class AddPausaProdutividadeController implements Controller {
  constructor(private readonly addPausaProdutividade: AddPauseProdutividade) {}

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const isValid = await this.addPausaProdutividade.addPausa({
        id: parseInt(request.id),
      });
      return ok(isValid);
    } catch (error) {
      console.log(error);
      return serverError(error);
    }
  }
}

export namespace SignUpController {
  export type Request = {
    id: string;
  };
}
