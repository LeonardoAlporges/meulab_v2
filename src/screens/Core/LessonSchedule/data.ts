export interface LessonSlot {
  time: string;
  days: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
  };
}

export interface LessonPeriod {
  id: string;
  title: string;
  slots: LessonSlot[];
}

export const lessonSchedule: LessonPeriod[] = [
  {
    id: "periodo1",
    title: "1º Período",
    slots: [
      {
        time: "18:00 às 20:00",
        days: {
          monday: "Introdução à Informática • Lab 1 - Chiu-Chiu",
          tuesday: "Vetores e Geometria Analítica • Sala 03 - Prédio Ciclo Básico",
          wednesday: "Lógica Computacional I • Sala 03 - Prédio Ciclo Básico",
          thursday: "Programação I • Lab 1 - Chiu-Chiu",
          friday: "Introdução aos Sistemas de Informação • Sala 03 - Prédio Ciclo Básico",
        },
      },
      {
        time: "20:00 às 22:00",
        days: {
          monday: "Lógica Computacional I • Sala 03 - Prédio Ciclo Básico",
          tuesday: "Português Instrumental • Lab 1 - Chiu-Chiu",
          wednesday: "Introdução à Informática • Lab 1 - Chiu-Chiu",
          thursday: "Vetores e Geometria Analítica • Sala 03 - Prédio Ciclo Básico",
          friday: "Programação I • Lab 1 - Chiu-Chiu",
        },
      },
    ],
  },
  {
    id: "periodo3",
    title: "3º Período",
    slots: [
      {
        time: "18:00 às 20:00",
        days: {
          monday: "Sistemas de Apoio à Decisão • Sala 07 - Prédio Central",
          tuesday: "Estruturas de Dados I • Lab 1 - Chiu-Chiu",
          wednesday: "Engenharia de Software I • Sala 07 - Prédio Central",
          thursday: "Computabilidade e Complexidade • Sala 07 - Prédio Central",
          friday: "Computabilidade e Complexidade • Sala 07 - Prédio Central",
        },
      },
      {
        time: "20:00 às 22:00",
        days: {
          monday: "Estruturas de Dados I • Lab 1 - Chiu-Chiu",
          tuesday: "Álgebra Linear • Sala 07 - Prédio Central",
          wednesday: "Sistemas de Apoio à Decisão • Sala 07 - Prédio Central",
          thursday: "Álgebra Linear • Sala 07 - Prédio Central",
          friday: "Engenharia de Software I • Sala 07 - Prédio Central",
        },
      },
    ],
  },
  {
    id: "periodo5",
    title: "5º Período",
    slots: [
      {
        time: "18:00 às 20:00",
        days: {
          monday: "Otimização Linear • Lab 1 - Chiu-Chiu",
          tuesday: "Otimização Linear • Lab 1 - Chiu-Chiu",
          wednesday: "Banco de Dados • Lab 3 - Chiu-Chiu",
          thursday: "Projeto de Sistemas de Software • Lab 3 - Chiu-Chiu",
          friday: "Interação Humano-Máquina • Lab 3 - Chiu-Chiu",
        },
      },
      {
        time: "20:00 às 22:00",
        days: {
          monday: "Sistemas Operacionais • Lab 1 - Chiu-Chiu",
          tuesday: "Sistemas Operacionais • Lab 1 - Chiu-Chiu",
          wednesday: "Interação Humano-Máquina • Lab 3 - Chiu-Chiu",
          thursday: "Banco de Dados • Lab 3 - Chiu-Chiu",
          friday: "Projeto de Sistemas de Software • Lab 3 - Chiu-Chiu",
        },
      },
    ],
  },
  {
    id: "periodo7",
    title: "7º Período",
    slots: [
      {
        time: "18:00 às 20:00",
        days: {
          monday: "Sistemas Distribuídos • Lab. Desenv. SW I - Reuni",
          tuesday: "Sistemas Distribuídos • Lab. Desenv. SW I - Reuni",
          wednesday: "Segurança e Auditoria de Sistemas • Lab. Desenv. SW I - Reuni",
          thursday: "Administração e Economia • Lab. Desenv. SW I - Reuni",
          friday: "Comércio Eletrônico • Lab. Desenv. SW I - Reuni",
        },
      },
      {
        time: "20:00 às 22:00",
        days: {
          monday: "Informática e Sociedade • Lab. Desenv. SW I - Reuni",
          wednesday: "Comércio Eletrônico • Lab. Desenv. SW I - Reuni",
          thursday: "Administração e Economia • Lab. Desenv. SW I - Reuni",
          friday: "Segurança e Auditoria de Sistemas • Lab. Desenv. SW I - Reuni",
        },
      },
    ],
  },
  {
    id: "periodo9",
    title: "9º Período",
    slots: [
      {
        time: "18:00 às 20:00",
        days: {
          monday: "Algoritmos Numéricos • Sala 04 - Prédio Central",
          tuesday: "Sistemas de Software Livre • Lab. Desenv. SW 2 - Reuni",
          wednesday: "Algoritmos Numéricos • Sala 04 - Prédio Central",
        },
      },
      {
        time: "20:00 às 22:00",
        days: {
          monday: "Tópicos Esp. em Redes de Computadores I • Lab. Desenv. SW 2 - Reuni",
          tuesday: "Tópicos Esp. em Análise Combinatória • Lab. Desenv. SW I - Reuni",
          wednesday: "Tópicos Esp. em Análise Combinatória • Lab. Desenv. SW I - Reuni",
        },
      },
    ],
  },
];

