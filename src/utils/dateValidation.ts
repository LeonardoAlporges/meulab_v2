/**
 * Valida se uma data no formato DD/MM/AAAA é válida
 * Verifica se o dia e mês são válidos, considerando anos bissextos
 * @param value - Data no formato DD/MM/AAAA
 * @returns true se a data é válida, false caso contrário
 */
export const validateDate = (value: string | undefined): boolean => {
  if (!value?.length || value.length !== 10) {
    return false;
  }

  // Verificar formato DD/MM/AAAA
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  const match = dateRegex.exec(value);

  if (!match) {
    return false;
  }

  const day = Number.parseInt(match[1], 10);
  const month = Number.parseInt(match[2], 10);
  const year = Number.parseInt(match[3], 10);

  // Validar mês (01-12)
  if (month < 1 || month > 12) {
    return false;
  }

  // Validar dia (01-31, considerando o mês)
  if (day < 1 || day > 31) {
    return false;
  }

  // Validar dias por mês
  const daysInMonth = [
    31, // Janeiro
    year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28, // Fevereiro (ano bissexto)
    31, // Março
    30, // Abril
    31, // Maio
    30, // Junho
    31, // Julho
    31, // Agosto
    30, // Setembro
    31, // Outubro
    30, // Novembro
    31, // Dezembro
  ];

  if (day > daysInMonth[month - 1]) {
    return false;
  }

  // Validar ano (não pode ser muito antigo ou futuro)
  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear + 1) {
    return false;
  }

  return true;
};

