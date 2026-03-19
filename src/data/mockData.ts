export interface Concert {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  totalTickets: number;
  reservedTickets: number;
  waitlistCount: number;
  description: string;
}

export interface Reservation {
  id: string;
  concertId: string;
  name: string;
  email: string;
  whatsapp: string;
  quantity: number;
  isWaitlist: boolean;
  lgpdConsent: boolean;
  createdAt: string;
}

export const initialConcerts: Concert[] = [
  {
    id: "1",
    title: "Noite de Gala — Beethoven & Chopin",
    date: "2026-04-12",
    time: "20:00",
    location: "Teatro Municipal de São Paulo",
    totalTickets: 100,
    reservedTickets: 87,
    waitlistCount: 3,
    description: "Uma noite inesquecível com obras-primas do repertório clássico.",
  },
  {
    id: "2",
    title: "Concerto ao Pôr do Sol",
    date: "2026-05-03",
    time: "17:30",
    location: "Parque Ibirapuera — Auditório",
    totalTickets: 150,
    reservedTickets: 42,
    waitlistCount: 0,
    description: "Música clássica ao ar livre com vista para o pôr do sol paulistano.",
  },
  {
    id: "3",
    title: "Jovens Talentos em Cena",
    date: "2026-06-21",
    time: "19:00",
    location: "Sala São Paulo",
    totalTickets: 80,
    reservedTickets: 80,
    waitlistCount: 12,
    description: "Os melhores jovens músicos do projeto apresentam seus talentos.",
  },
  {
    id: "4",
    title: "Sinfonia de Inverno",
    date: "2026-07-15",
    time: "20:00",
    location: "Teatro Municipal do Rio de Janeiro",
    totalTickets: 120,
    reservedTickets: 15,
    waitlistCount: 0,
    description: "Um concerto acolhedor para celebrar a chegada do inverno.",
  },
];

export const initialReservations: Reservation[] = [
  {
    id: "r1",
    concertId: "1",
    name: "Maria Silva",
    email: "maria@email.com",
    whatsapp: "11999990001",
    quantity: 2,
    isWaitlist: false,
    lgpdConsent: true,
    createdAt: "2026-03-01T10:00:00",
  },
  {
    id: "r2",
    concertId: "1",
    name: "João Santos",
    email: "joao@email.com",
    whatsapp: "11999990002",
    quantity: 1,
    isWaitlist: false,
    lgpdConsent: true,
    createdAt: "2026-03-02T14:30:00",
  },
  {
    id: "r3",
    concertId: "3",
    name: "Ana Oliveira",
    email: "ana@email.com",
    whatsapp: "11999990003",
    quantity: 2,
    isWaitlist: true,
    lgpdConsent: true,
    createdAt: "2026-03-10T09:00:00",
  },
];
