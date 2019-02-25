import { InteressadoSEI } from './interessado-sei';
import { AssuntoSEI } from './assunto-sei';
import { AndamentoSEI } from './andamento-sei';
import { TipoProcedimentoSEI } from './tipo-procedimento-sei';
import { UnidadeProcedimentoAbertoSEI } from './unidade-procedimento-aberto-sei';
import { ObservacaoSEI } from './observacao-sei';
import { ProcedimentoResumidoSEI } from './procedimento-resumido-sei';

export class RetornoConsultaProcedimentoSEI {
  idProcedimento: string;
  procedimentoFormatado: string;
  especificacao: string;
  dataAutuacao: string;
  linkAcesso: string;
  tipoProcedimento: TipoProcedimentoSEI;
  andamentoGeracao: AndamentoSEI;
  andamentoConclusao: AndamentoSEI;
  ultimoAndamento: AndamentoSEI;
  unidadesProcedimentoAberto: UnidadeProcedimentoAbertoSEI[];
  assuntos: AssuntoSEI[];
  interessados: InteressadoSEI;
  observacoes: ObservacaoSEI;
  procedimentosRelacionados: ProcedimentoResumidoSEI;
  procedimentosAnexados: ProcedimentoResumidoSEI;

}
