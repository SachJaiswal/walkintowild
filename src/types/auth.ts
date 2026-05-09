export type UserRole = "admin" | "wildlife_officer" | "guide" | "visitor";

export type UserStatus = "active" | "inactive" | "suspended";

export type UserGender = "male" | "female" | "other";

export interface AuthUser {
  user_id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  designation?: string;
  mobile?: string;
  profile_image?: string;
  profile_picture?: string;
  is_google_user?: boolean;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  expires_in: string;
}

export interface AuthSession extends AuthTokens {
  user: AuthUser;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: true;
  data: AuthSession;
}

export interface GoogleLoginRequest {
  id_token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  mobile?: string;
  date_of_birth?: string;
  gender?: UserGender;
  interests?: string[];
}

export interface RegisteredUser {
  user_id: string;
  name: string;
  email: string;
  role: UserRole;
  mobile?: string;
  date_of_birth?: string;
  gender?: UserGender;
  interests?: string[];
  status: UserStatus;
  email_verified: boolean;
  mobile_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface RegisterResponse {
  success: true;
  message: string;
  data: RegisteredUser;
}

export interface RefreshTokenResponse {
  success: true;
  data: {
    access_token: string;
    expires_in: string;
  };
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}

export interface AuthContextValue {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginRequest) => Promise<AuthSession>;
  register: (payload: RegisterRequest) => Promise<RegisteredUser>;
  googleLogin: (idToken: string) => Promise<AuthSession>;
  logout: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
}
