import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError, ok } from "@/presentation/helpers";
import { GetProdutividadeByCenterAndData } from "@/domain/usecases/get-productivity-by-center-and-data";

export class GetProdutivicidadeByCenterController implements Controller {
  constructor(
    private readonly getProdutividade: GetProdutividadeByCenterAndData
  ) {}

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      console.log(request)
      const isValid = await this.getProdutividade.getProdutivicidade(request);
      return ok(isValid);
    } catch (error) {
      console.log(error);
      return serverError(error);
    }
  }
}

export namespace SignUpController {
  export type Request = {
    centerId: string;
    data: Date;
    processo: string
  };
}
