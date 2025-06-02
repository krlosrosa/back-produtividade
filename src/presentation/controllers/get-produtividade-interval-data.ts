import { Controller, HttpResponse } from "@/presentation/protocols";
import ExcelJS from "exceljs";
import { serverError } from "@/presentation/helpers";
import { GetProdutividadeIntervalData } from "@/domain/usecases/get-produtividade-interval-date";

export class GetProdutivicidadeIntervalDataController implements Controller {
  constructor(
    private readonly getProdutividade: GetProdutividadeIntervalData
  ) {}

  async handle(request: GetProdutivicidadeIntervalDataController.Request): Promise<HttpResponse> {
    try {

      console.log(request)
      // Obtém os dados do use case
      const registros = await this.getProdutividade.getProdutividadeInterval(request);
      
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
          style: { numFmt: "dd/mm/yyyy hh:mm:ss" }
        },
        {
          header: "Hora Fim",
          key: "horaFim",
          width: 20,
          style: { numFmt: "dd/mm/yyyy hh:mm:ss" }
        },
        { header: "Center ID", key: "centerId", width: 15 },
        { header: "User ID", key: "userId", width: 15 },
        {
          header: "Data Registro",
          key: "dataRegistro",
          width: 20,
          style: { numFmt: "dd/mm/yyyy hh:mm:ss" }
        },
        { header: "Funcionário ID", key: "funcionarioId", width: 15 },
      ];

      // Adiciona os dados
      registros.forEach(registro => {
        worksheet.addRow({
          id: registro.id,
          transporte: registro.transporte,
          empresa: registro.empresa,
          processo: registro.processo,
          caixas: registro.caixas,
          unidade: registro.unidade,
          visitado: registro.visitado,
          horaInicio: registro.horaInicio,
          horaFim: registro.horaFim || null,
          centerId: registro.centerId,
          userId: registro.userId,
          dataRegistro: registro.dataRegistro,
          funcionarioId: registro.funcionarioId
        });
      });

      // Gera o buffer do Excel
      const buffer = await workbook.xlsx.writeBuffer();

      // Retorna a resposta com o arquivo para download
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

export namespace GetProdutivicidadeIntervalDataController {
  export type Request = {
    centerId: string;
    dataInicio: Date;
    dataFim: Date;
  };
}