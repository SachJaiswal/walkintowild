// types/profile.types.ts

export interface Address {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  pincode?: string;
  country?: string;
}

export interface EmergencyContact {
  name?: string;
  relationship?: string;
  mobile?: string;
}

export interface UserProfile {
  _id?: string;
  user_id: string;
  name: string;
  email: string;
  role: "admin" | "wildlife_officer" | "guide" | "visitor";
  mobile?: string;
  alternate_mobile?: string;
  profile_picture?: string;
  date_of_birth?: string;
  gender?: "male" | "female" | "other";
  address?: Address;
  emergency_contact?: EmergencyContact;
  interests?: string[];
  status: "active" | "inactive" | "suspended";
  email_verified: boolean;
  mobile_verified: boolean;
  last_login?: string;
  created_at: string;
  updated_at: string;
}

export interface UpdateProfileData {
  name?: string;
  mobile?: string;
  alternate_mobile?: string;
  date_of_birth?: string;
  gender?: "male" | "female" | "other";
  address?: Address;
  emergency_contact?: EmergencyContact;
  interests?: string[];
}

export interface ProfileState {
  user: UserProfile | null;
  isLoading: boolean;
  isEditing: boolean;
  error: string | null;
  success: string | null;
}

export interface ProfileContextType extends ProfileState {
  fetchProfile: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  setEditing: (isEditing: boolean) => void;
  clearError: () => void;
  clearSuccess: () => void;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}
