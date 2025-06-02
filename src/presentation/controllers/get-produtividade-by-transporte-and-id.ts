import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError, ok } from "@/presentation/helpers";
import { GetProdutividadeByTransporteAndId } from "@/domain/usecases/get-produtividade-by-tranpode-and-id";

export class GetProdutividadeByTransporteController implements Controller {
  constructor(
    private readonly GetProdutividadeByTransporte: GetProdutividadeByTransporteAndId,
  ) {}

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const transporte = await this.GetProdutividadeByTransporte.getProdutividadeByTransporte(request);
      return ok(transporte);
    } catch (error) {
      console.log(error)
      return serverError(error);
    }
  }
}

export namespace SignUpController {
  export type Request = {
  idPallet: string;
  transporte: string;
  processo:string
  };
}

