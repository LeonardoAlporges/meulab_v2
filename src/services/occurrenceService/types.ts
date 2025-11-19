export interface CreateOccurrenceRequest {
  monitorResponsibleId: number;
  dateOccurrence: string;
  description: string;
  provisions: string;
  occurrenceUser: string;
  status?: string;
}

export interface Occurrence {
  id: number;
  monitorResponsibleId: number;
  dateOccurrence: string;
  date_occurrence?: string;
  description: string;
  provisions: string;
  occurrenceUser: string;
  occurrence_user?: string;
  descriptionResolution?: string | null;
  description_resolution?: string | null;
  status: string;
  resolvedIn?: string | null;
  resolved_in?: string | null;
  deleteAt?: string | null;
  delete_at?: string | null;
  createAt?: string;
  create_at?: string;
  updateAt?: string;
  update_at?: string;
  username?: string;
}

export interface UpdateOccurrenceStatusRequest {
  descriptionResolution?: string;
}

