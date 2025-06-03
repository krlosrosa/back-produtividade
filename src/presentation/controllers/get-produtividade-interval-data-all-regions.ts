import { Controller, HttpResponse } from "@/presentation/protocols";
import ExcelJS from "exceljs";
import { ok, serverError } from "@/presentation/helpers";
import { formatToBrazilianTimezone } from "@/utils/ajusteData";
import { GetProdutividadeIntervalDataAllRegion } from "@/domain/usecases/get-produtividade-interval-date-all-region";


export class GetProdutivicidadeIntervalDataAllRegionsController implements Controller {
  constructor(
    private readonly getProdutividadeAllRegion: GetProdutividadeIntervalDataAllRegion
  ) {}

  async handle(
    request: GetProdutivicidadeIntervalDataAllRegionsController.Request
  ): Promise<HttpResponse> {
    try {
      console.log(request);
      // Obtém os dados do use case
      const registros = await this.getProdutividadeAllRegion.getProdutividadeIntervalAllRegions(
        request
      );

      // Cria a planilha Excel
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Registros de Transporte");

      // Define as colunas
      worksheet.columns = [
        { header: "ID", key: "id", width: 10 },
        { header: "Transporte", key: "transporte", width: 20 },
        { header: "Empresa", key: "empresa", width: 20 },
        { header: "Processo", key: "processo", width: 20 },
        { header: "Caixas", key: "caixas", width: 10 },
        { header: "Unidade", key: "unidade", width: 10 },
        { header: "Visitado", key: "visitado", width: 10 },
        {
          header: "Hora Início",
          key: "horaInicio",
          width: 20,
          style: { numFmt: "dd/mm/yyyy hh:mm:ss" },
        },
        {
          header: "Hora Fim",
          key: "horaFim",
          width: 20,
          style: { numFmt: "dd/mm/yyyy hh:mm:ss" },
        },
        {
          header: "Início Pausa",
          key: "inicioPausa",
          width: 20,
          style: { numFmt: "dd/mm/yyyy hh:mm:ss" },
        },
        {
          header: "Termino Pausa",
          key: "terminoPause",
          width: 20,
          style: { numFmt: "dd/mm/yyyy hh:mm:ss" },
        },
        { header: "Center ID", key: "centerId", width: 15 },
        { header: "User ID", key: "userId", width: 15 },
        {
          header: "Data Registro",
          key: "dataRegistro",
          width: 20,
          style: { numFmt: "dd/mm/yyyy hh:mm:ss" },
        },
        { header: "Funcionário ID", key: "funcionarioId", width: 15 },
         { header: "Produtividade", key: "produtividade", width: 15 },
      ];

      // Adiciona os dados
      registros.forEach((registro) => {
        worksheet.addRow({
          id: registro.id,
          transporte: registro.transporte,
          empresa: registro.empresa,
          processo: registro.processo,
          caixas: registro.caixas,
          unidade: registro.unidade,
          visitado: registro.visitado,
          horaInicio: formatToBrazilianTimezone(registro.horaInicio),
          horaFim: formatToBrazilianTimezone(registro.horaFim) || null,
          inicioPausa: formatToBrazilianTimezone(registro.inicioPausa) || null,
          terminoPause: formatToBrazilianTimezone(registro.terminoPause) || null,
          centerId: registro.centerId,
          userId: registro.userId,
          dataRegistro: registro.dataRegistro,
          funcionarioId: registro.funcionarioId,
          produtividade: registro.produtividade
        });
      });

      // Gera o buffer do Excel
      const buffer = await workbook.xlsx.writeBuffer();

      // Retorna a resposta com o arquivo para download
      return ok(registros)
      return {
        statusCode: 200,
        body: Buffer.from(buffer),
      };
    } catch (error) {
      console.error(error);
      return serverError(error);
    }
  }
}

export namespace GetProdutivicidadeIntervalDataAllRegionsController {
  export type Request = {
    dataInicio: Date;
    dataFim: Date;
  };
}
