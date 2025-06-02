import AddProdutividadeRepository from "@/data/protocols/addProdutividade-repository";
import { CriarFunctionarioRepository } from "@/data/protocols/criar-funcionario";
import FinalizarProdutividadeRepository from "@/data/protocols/finalizar-produtividade-repository";
import { GetFunctionarioByIdRepository } from "@/data/protocols/get-funcionario-by-id";
import { GetFuncionariosByCenterRepository } from "@/data/protocols/get-funcionarios-by-center-repository";
import GetProdutividadeByCenterAndDataRepository from "@/data/protocols/get-produtividade-by-center-repository";
import { GetProdutividadeIntervalDataRepository } from "@/data/protocols/get-produtividade-interval-data-repository";
import GetProdutividadeByTransporteAndIdRepository from "@/data/protocols/get=produtividade-by-transporte-repository";
import {
  LoadAccountByEmailRepository,
  LoadAccountByIdRepository,
} from "@/data/protocols/load-account-by-id-repository";
import { UpdateAccessTokenRepository } from "@/data/protocols/update-access-token-repository";
import { AddAccount } from "@/domain/usecases";
import { DadosTransporte } from "@/domain/usecases/addProdutividade";
import { CriarFunctionario } from "@/domain/usecases/criar-funcionario";
import { FinalizarParams } from "@/domain/usecases/finalizarProdutividade";
import { GetFunctionarioById } from "@/domain/usecases/get-funcionario";
import { GetFuncionariosByCenter } from "@/domain/usecases/get-funcionarios-by-center";
import { GetProdutividadeByCenterAndData } from "@/domain/usecases/get-productivity-by-center-and-data";
import { GetProdutividadeByTransporteAndId } from "@/domain/usecases/get-produtividade-by-tranpode-and-id";
import { GetProdutividadeIntervalData } from "@/domain/usecases/get-produtividade-interval-date";
import { getDayRange } from "@/utils/dateRange";
import { PrismaClient } from "@prisma/client";

export class AccountPrismaRepository
  implements
    AddProdutividadeRepository,
    FinalizarProdutividadeRepository,
    AddAccount,
    LoadAccountByIdRepository,
    UpdateAccessTokenRepository,
    GetProdutividadeByCenterAndDataRepository,
    GetProdutividadeIntervalDataRepository,
    GetFunctionarioByIdRepository,
    GetProdutividadeByTransporteAndIdRepository,
    CriarFunctionarioRepository,
    GetFuncionariosByCenterRepository
{
  private readonly prisma = new PrismaClient();

  async add(params: DadosTransporte): Promise<boolean> {
    const produtividade = await this.prisma.dadosTransporte.create({
      data: {
        transporte: params.transporte,
        empresa: params.empresa,
        processo: params.processo,
        caixas: params.caixas,
        unidade: params.unidade,
        visitado: params.visitado,
        horaInicio: params.horaInicio,
        centerId: params.centerId,
        userId: params.registradoPor,
        dataRegistro: params.dataRegistro,
        funcionarioId: params.funcionarioId,
        items: {
          createMany: {
            data: params.items,
          },
        },
      },
    });

    return !!produtividade;
  }

  async finalizar(params: FinalizarParams): Promise<boolean> {
    const finalizarProdutividade = await this.prisma.item.findFirst({
      where: {
        idPallet: params.idPallet,
        transporte: params.transporte,
      },
    });
    const updateProdutividade = await this.prisma.dadosTransporte.update({
      where: {
        id: finalizarProdutividade.idDemanda,
      },
      data: {
        horaFim: new Date(),
      },
    });

    return !!updateProdutividade;
  }

  async addAccount(account: AddAccount.Params): Promise<AddAccount.Result> {
    const addAccount = await this.prisma.user.create({
      data: {
        id: account.id,
        name: account.name,
        password: account.password,
        centerId: account.centerId,
      },
    });
    return !!addAccount;
  }
  async loadByEmail(id: string): Promise<LoadAccountByEmailRepository.Result> {
    const user = await this.prisma.user.findUnique({ where: { id: id } });
    return {
      id: user.id,
      name: user.name,
      password: user.password,
      center: user.centerId,
    };
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: id },
      data: {
        token: token,
      },
    });
  }

  async getProdutivicidade(
    params: GetProdutividadeByCenterAndData.Params
  ): Promise<GetProdutividadeByCenterAndData.Result[]> {
    const { end, start } = getDayRange(params.data);
    const produtividade = await this.prisma.dadosTransporte.findMany({
      where: {
        centerId: params.centerId,
        processo: params.processo,
        dataRegistro: {
          gte: start,
          lte: end,
        },
      },
    });

    return produtividade;
  }

  async getProdutividadeInterval(
    params: GetProdutividadeIntervalData.Params
  ): Promise<GetProdutividadeIntervalData.Result[]> {
    const { start } = getDayRange(params.dataInicio);
    const { end } = getDayRange(params.dataFim);
    const produtividade = await this.prisma.dadosTransporte.findMany({
      where: {
        dataRegistro: {
          gte: start,
          lte: end,
        },
        centerId: params.centerId,
      },
    });
    return produtividade;
  }

  async getFuncionario(
    params: GetFunctionarioById.Params
  ): Promise<GetFunctionarioById.Result> {
    const funcionario = await this.prisma.funcionarios.findUnique({
      where: {
        id: params.id,
        centerId: params.centerId,
      },
    });
    return funcionario;
  }

  async getProdutividadeByTransporte(
    params: GetProdutividadeByTransporteAndId.Params
  ): Promise<Omit<GetProdutividadeByTransporteAndId.Result, "produtividade">> {
    const produtividade = await this.prisma.item
      .findFirst({
        where: {
          idPallet: params.idPallet,
          transporte: params.transporte,
          AND: {
            dadosTransporte: {
              processo: params.processo,
            },
          },
        },
      })
      .dadosTransporte();
    return produtividade;
  }
  async criarFuncionario(
    params: CriarFunctionario.Params
  ): Promise<CriarFunctionario.Result> {
    const funcionario = await this.prisma.funcionarios.create({
      data: {
        id: params.id,
        name: params.name,
        centerId: params.centerId,
      },
    });
    return !!funcionario;
  }
  async getFuncionarios(
    params: GetFuncionariosByCenter.Params
  ): Promise<GetFuncionariosByCenter.Result[]> {
    return await this.prisma.funcionarios.findMany({
      where: { centerId: params.centerId },
    });
  }
}
