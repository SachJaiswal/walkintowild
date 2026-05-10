import type { UpdateProfileData, UserProfile } from "@/src/types/profile.types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:8000";

export class ProfileApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ProfileApiError";
    this.status = status;
  }
}

type ApiResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
};

async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const contentType = response.headers.get("content-type");
  const payload = contentType?.includes("application/json")
    ? ((await response.json()) as ApiResponse<T>)
    : null;

  if (!response.ok || payload?.success === false) {
    throw new ProfileApiError(
      payload?.message || `Request failed with status ${response.status}`,
      response.status,
    );
  }

  return payload || { success: true };
}

async function profileRequest<T>(
  path: string,
  accessToken: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });

  return parseResponse<T>(response);
}

export async function getProfile(accessToken: string): Promise<UserProfile> {
  const response = await profileRequest<UserProfile>("/api/profile", accessToken);

  if (!response.data) {
    throw new ProfileApiError("Failed to load profile", 500);
  }

  return response.data;
}

export async function updateProfile(
  accessToken: string,
  data: UpdateProfileData,
): Promise<UserProfile> {
  const response = await profileRequest<UserProfile>("/api/profile", accessToken, {
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!response.data) {
    throw new ProfileApiError("Failed to update profile", 500);
  }

  return response.data;
}

export async function sendProfileOtp(email: string): Promise<void> {
  await fetch(`${API_BASE_URL}/api/send-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }).then(parseResponse);
}

export async function verifyProfileEmail(
  email: string,
  otp: string,
): Promise<void> {
  await fetch(`${API_BASE_URL}/api/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, otp }),
  }).then(parseResponse);
}
