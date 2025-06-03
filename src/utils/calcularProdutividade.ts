
import { GetProdutividadeByTransporteAndId } from "@/domain/usecases/get-produtividade-by-tranpode-and-id";
import { differenceInMinutes } from "date-fns";

export const calcularProdutividade = (item: Omit<GetProdutividadeByTransporteAndId.Result, "produtividade">) => {
    const horaInicio = new Date(item.horaInicio);
    const horaFim = item.horaFim ? new Date(item.horaFim) : new Date();

    // Calcula o tempo total em minutos
    let tempoTotalMinutos = differenceInMinutes(horaFim, horaInicio);

    // Verifica e desconta o tempo de pausa se estiver completo (inicio e fim)
    if (item.inicioPausa && item.terminoPause) {
        const inicioPausa = new Date(item.inicioPausa);
        const terminoPausa = new Date(item.terminoPause);
        
        // Calcula o tempo de pausa em minutos
        const tempoPausaMinutos = differenceInMinutes(terminoPausa, inicioPausa);
        
        // Subtrai o tempo de pausa do tempo total
        tempoTotalMinutos = Math.max(0, tempoTotalMinutos - tempoPausaMinutos);
    } 
    // Caso só tenha início de pausa mas não tenha término
    else if (item.inicioPausa && !item.terminoPause) {
        const inicioPausa = new Date(item.inicioPausa);
        
        // Considera o tempo até o fim do trabalho como pausa
        const tempoPausaMinutos = differenceInMinutes(horaFim, inicioPausa);
        
        // Subtrai o tempo de pausa do tempo total, mas garante pelo menos 1 minuto
        tempoTotalMinutos = Math.max(1, differenceInMinutes(inicioPausa, horaInicio));
    }

    // Garante pelo menos 1 minuto de trabalho para evitar divisão por zero
    const minutosEfetivos = Math.max(1, tempoTotalMinutos);

    // Converte minutos para horas
    const horasEfetivas = minutosEfetivos / 60;

    // Calcula a produtividade (caixas por hora) permitindo frações
    const produtividade = item.caixas / horasEfetivas / item.visitado;

    // Arredonda para 1 casa decimal
    return Math.round(produtividade * 10) / 10;
};