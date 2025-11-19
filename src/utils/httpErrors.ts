const HTTP_STATUS_MESSAGES: Record<number, string> = {
  400: "Requisição inválida. Verifique os dados enviados.",
  401: "Sessão expirada ou não autorizada.",
  403: "Você não tem permissão para acessar este recurso.",
  404: "Erro ao encontrar rota desejada.",
  408: "Tempo da requisição esgotado. Tente novamente.",
  409: "Conflito ao processar a solicitação.",
  422: "Não foi possível processar os dados enviados.",
  429: "Muitas requisições. Aguarde um pouco e tente novamente.",
  500: "Erro ao se comunicar com o servidor.",
  502: "Serviço temporariamente indisponível.",
  503: "Servidor indisponível no momento.",
  504: "Tempo limite do servidor excedido.",
};

const DEFAULT_HTTP_ERROR_MESSAGE =
  "Ocorreu um erro inesperado. Tente novamente em instantes.";

export const getHttpErrorMessage = (status?: number): string => {
  if (!status) {
    return DEFAULT_HTTP_ERROR_MESSAGE;
  }

  return HTTP_STATUS_MESSAGES[status] ?? DEFAULT_HTTP_ERROR_MESSAGE;
};

export const httpStatusMessages = HTTP_STATUS_MESSAGES;

