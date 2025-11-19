import { Reservation } from "@services/reservationService/types";

export const normalizeReservation = (data: any): Reservation => ({
  id: data.id,
  username: data.username,
  email: data.email,
  cpf: data.cpf,
  phone: data.phone ?? data.telefone ?? "",
  functionAtUfes: data.functionAtUfes ?? data.function_at_ufes ?? "",
  reservationDate: data.reservationDate ?? data.reservation_date ?? "",
  startTime: data.startTime ?? data.start_time ?? "",
  endTime: data.endTime ?? data.end_time ?? "",
  room: data.room,
  userId: data.userId ?? data.user_id ?? 0,
  consentForm:
    typeof data.consentForm === "boolean"
      ? data.consentForm
      : Boolean(data.consent_form),
  status:
    data.status === "approved"
      ? "aproved"
      : data.status ?? "analysis",
  justify: data.justify ?? null,
  isDelivered: data.isDelivered ?? data.is_delivered ?? false,
  isReturned: data.isReturned ?? data.is_returned ?? false,
  createdAt: data.createdAt ?? data.createAt ?? "",
  updatedAt: data.updatedAt ?? data.updateAt ?? "",
});

