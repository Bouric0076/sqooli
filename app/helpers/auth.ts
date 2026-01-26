import { apiFetcher } from "./apiFetcher";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  expires_in: number;
  user: any;
}

export const login = (payload: LoginPayload) =>
  apiFetcher<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const acceptInvitation = (token: string) =>
  apiFetcher("/api/auth/accept-invitation", {
    method: "POST",
    body: JSON.stringify({ token }),
  });
