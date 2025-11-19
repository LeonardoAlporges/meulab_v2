export interface CreateSupportRequest {
  userId: number;
  functionAtUfes: string;
  requestType: string;
  room: string;
  equipmentIdentification: string;
  description: string;
  dateOccurrence: string;
  status?: string;
}

export interface Support {
  id: number;
  userId: number;
  functionAtUfes: string;
  requestType: string;
  room: string;
  equipmentIdentification: string;
  description: string;
  dateOccurrence: string;
  status: string;
  descriptionResolution?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateSupportStatusRequest {
  descriptionResolution?: string;
}

export interface SupportFeedbackRequest {
  userId: number;
  email: string;
  message: string;
}
