import type {
  AuthSession,
  GoogleLoginRequest,
  LoginRequest,
  LoginResponse,
  RefreshTokenResponse,
  RegisterRequest,
  RegisterResponse,
} from "@/src/types/auth";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";

export class AuthApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AuthApiError";
    this.status = status;
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  const payload = contentType?.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok || payload?.success === false) {
    throw new AuthApiError(
      payload?.message || `Request failed with status ${response.status}`,
      response.status,
    );
  }

  return payload as T;
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  return parseResponse<T>(response);
}

export async function loginUser(payload: LoginRequest): Promise<AuthSession> {
  const response = await request<LoginResponse>("/api/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function registerUser(payload: RegisterRequest) {
  const response = await request<RegisterResponse>("/api/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function loginWithGoogle(
  payload: GoogleLoginRequest,
): Promise<AuthSession> {
  const response = await request<LoginResponse>("/api/google-login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function refreshAccessToken(refreshToken: string) {
  const response = await request<RefreshTokenResponse>("/api/refresh-token", {
    method: "POST",
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  return response.data;
}

export async function logoutUser(
  accessToken: string,
  refreshToken?: string,
): Promise<void> {
  await request("/api/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });
}
