export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string | null;
  role: string;
  language: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export interface UserCreation {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: Blob;
  password: string;
  role?: "admin" | "user";
}

export interface UserCreationPart2 {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: File;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export enum Role {
  ADMIN = "admin",
  USER = "user",
}
