export interface User {
  id: number;
  username: string;
  registrationNumber?: string;
  course?: string;
  functionAtUfes?: string;
  institutionalEmail?: string;
  password?: string | null;
  expoToken?: string;
  isWatchman?: boolean;
  deleteAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  isAdm?: boolean;
  isMonitor?: boolean;
  isCoordinator?: boolean;
  coordinatorId?: number;
  idMonitor?: number;
}

export interface LoginRequest {
  userLogin: string;
  password: string;
  expoToken: string;
}

export interface LoginAsWatchmanRequest {
  userLogin: string;
  password: string;
  expoToken: string;
}
