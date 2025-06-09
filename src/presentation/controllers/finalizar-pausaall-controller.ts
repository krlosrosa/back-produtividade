import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError, ok } from "@/presentation/helpers";
import { FinalizarPausaAll } from "@/domain/usecases/finalizar-pausa-all";


export class FinalizarPausaAllController implements Controller {
  constructor(private readonly finalizarPausaAll: FinalizarPausaAll) {}

  async handle(request: FinalizarPausaAllController.Request): Promise<HttpResponse> {
    try {
      const isValid = await this.finalizarPausaAll.finalizarPausaAll({...request, data: new Date(request.data)});
      return ok(isValid);
    } catch (error) {
      console.log(error);
      return serverError(error);
    }
  }
}

export namespace FinalizarPausaAllController {
  export type Request = {
    centerId: string
    data: string
    processo: string
  };
}
