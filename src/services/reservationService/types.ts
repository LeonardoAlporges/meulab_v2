export type ReservationStatus =
  | "analysis"
  | "aproved"
  | "approved"
  | "reprove"
  | "delivered"
  | "returned";

export interface Reservation {
  id: number;
  username: string;
  email: string;
  cpf: string;
  phone: string;
  functionAtUfes: string;
  reservationDate: string;
  startTime: string;
  endTime: string;
  room: string;
  userId: number;
  consentForm: boolean;
  status: ReservationStatus;
  justify?: string | null;
  isDelivered?: boolean | null;
  isReturned?: boolean | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateReservationRequest {
  userId: number;
  username: string;
  email: string;
  cpf: string;
  phone: string;
  functionAtUfes: string;
  reservationDate: string;
  startTime: string;
  endTime: string;
  consentForm: boolean;
  room: string;
}

export interface AnalyzeReservationRequest {
  idReservation: number;
  approve: boolean;
  reprove: boolean;
  justify?: string;
}

