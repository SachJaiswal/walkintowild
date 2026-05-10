const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:8000";

export type ContactRequest = {
  full_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export type ContactResponse = {
  contact_id: string;
  full_name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "pending" | "read" | "replied" | "archived";
  created_at: string;
  updated_at: string;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

export class ContactApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ContactApiError";
    this.status = status;
  }
}

async function parseResponse<T>(response: Response): Promise<ApiResponse<T>> {
  const contentType = response.headers.get("content-type");
  const payload = contentType?.includes("application/json")
    ? ((await response.json()) as ApiResponse<T>)
    : null;

  if (!response.ok || payload?.success === false) {
    throw new ContactApiError(
      payload?.message || `Request failed with status ${response.status}`,
      response.status,
    );
  }

  return payload || { success: true };
}

export async function submitContact(payload: ContactRequest) {
  const response = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await parseResponse<ContactResponse>(response);

  if (!data.data) {
    throw new ContactApiError("Failed to submit contact form", 500);
  }

  return {
    contact: data.data,
    message: data.message || "Your message has been sent successfully.",
  };
}
