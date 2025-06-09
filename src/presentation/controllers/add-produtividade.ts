import { Controller, HttpResponse } from "@/presentation/protocols";
import { serverError, ok } from "@/presentation/helpers";
import AddProdutividade from "@/domain/usecases/addProdutividade";

export class AddProdutividadeController implements Controller {
  constructor(
    private readonly addProdutividade: AddProdutividade,
    
  ) {}

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      console.log(request);
      const isValid = await this.addProdutividade.add({
        ...request,
        registradoPor: request.accountId,
      });
      return ok(isValid);
    } catch (error) {
      return serverError(error);
    }
  }
}

export namespace SignUpController {
  export type Request = {
    transporte: string;
    empresa: string;
    processo: string;
    caixas: number;
    unidade: number;
    visitado: number;
    horaInicio: Date;
    items: Item[];
    centerId: string;
    accountId: string;
    dataRegistro: Date;
    funcionarioId: string;
    segmento: string;
  };
}

type Item = {
  empresa: string;
  idPallet: string;
  linhasPickingVisitadas: number;
  quantidadeCaixa: number;
  quantidadeUnidade: number;
  transporte: string;
  segmento: string
};
