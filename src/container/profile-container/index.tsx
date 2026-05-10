"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Check,
  CircleAlert,
  Clock3,
  Heart,
  Loader2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import { useAuth } from "@/src/context/auth-context";
import {
  getProfile,
  ProfileApiError,
  sendProfileOtp,
  updateProfile,
  verifyProfileEmail,
} from "@/src/lib/profile/api";
import type { UpdateProfileData, UserProfile } from "@/src/types/profile.types";
import "./style.css";

type ProfileForm = {
  name: string;
  mobile: string;
  alternate_mobile: string;
  date_of_birth: string;
  gender: "" | "male" | "female" | "other";
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  emergency_name: string;
  emergency_relationship: string;
  emergency_mobile: string;
  interestsText: string;
};

const emptyForm: ProfileForm = {
  name: "",
  mobile: "",
  alternate_mobile: "",
  date_of_birth: "",
  gender: "",
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
  emergency_name: "",
  emergency_relationship: "",
  emergency_mobile: "",
  interestsText: "",
};

function toDateInputValue(value?: string) {
  if (!value) {
    return "";
  }

  return value.slice(0, 10);
}

function formatDate(value?: string) {
  if (!value) {
    return "Not added";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function getInitials(name?: string) {
  const parts = (name || "Visitor").trim().split(/\s+/);
  return `${parts[0]?.[0] || "V"}${parts[1]?.[0] || ""}`.toUpperCase();
}

function profileToForm(profile: UserProfile): ProfileForm {
  return {
    name: profile.name || "",
    mobile: profile.mobile || "",
    alternate_mobile: profile.alternate_mobile || "",
    date_of_birth: toDateInputValue(profile.date_of_birth),
    gender: profile.gender || "",
    line1: profile.address?.line1 || "",
    line2: profile.address?.line2 || "",
    city: profile.address?.city || "",
    state: profile.address?.state || "",
    pincode: profile.address?.pincode || "",
    country: profile.address?.country || "",
    emergency_name: profile.emergency_contact?.name || "",
    emergency_relationship: profile.emergency_contact?.relationship || "",
    emergency_mobile: profile.emergency_contact?.mobile || "",
    interestsText: profile.interests?.join(", ") || "",
  };
}

function formToPayload(form: ProfileForm): UpdateProfileData {
  const interests = form.interestsText
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return {
    name: form.name.trim(),
    mobile: form.mobile.trim() || undefined,
    alternate_mobile: form.alternate_mobile.trim() || undefined,
    date_of_birth: form.date_of_birth || undefined,
    gender: form.gender || undefined,
    address: {
      line1: form.line1.trim() || undefined,
      line2: form.line2.trim() || undefined,
      city: form.city.trim() || undefined,
      state: form.state.trim() || undefined,
      pincode: form.pincode.trim() || undefined,
      country: form.country.trim() || undefined,
    },
    emergency_contact: {
      name: form.emergency_name.trim() || undefined,
      relationship: form.emergency_relationship.trim() || undefined,
      mobile: form.emergency_mobile.trim() || undefined,
    },
    interests,
  };
}

const getErrorMessage = (err: unknown) => {
  if (err instanceof ProfileApiError || err instanceof Error) {
    return err.message;
  }

  return "Something went wrong. Please try again.";
};

const ProfileContainer = () => {
  const router = useRouter();
  const {
    accessToken,
    isAuthenticated,
    isLoading: authLoading,
    refreshAccessToken,
  } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [form, setForm] = useState<ProfileForm>(emptyForm);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);

  const loadProfile = useCallback(
    async (token: string) => {
      setIsLoading(true);
      setError("");

      try {
        const data = await getProfile(token);
        setProfile(data);
        setForm(profileToForm(data));
      } catch (err) {
        if (err instanceof ProfileApiError && err.status === 401) {
          const freshToken = await refreshAccessToken();
          if (freshToken) {
            const data = await getProfile(freshToken);
            setProfile(data);
            setForm(profileToForm(data));
            return;
          }
        }

        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    },
    [refreshAccessToken],
  );

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!isAuthenticated || !accessToken) {
      router.replace("/login?returnTo=/profile");
      return;
    }

    queueMicrotask(() => {
      loadProfile(accessToken);
    });
  }, [accessToken, authLoading, isAuthenticated, loadProfile, router]);

  const displayLocation = useMemo(() => {
    const parts = [profile?.address?.city, profile?.address?.state, profile?.address?.country]
      .filter(Boolean)
      .join(", ");

    return parts || "Location not added";
  }, [profile]);

  const stats = useMemo(
    () => [
      { label: "Role", value: profile?.role?.replace("_", " ") || "visitor" },
      { label: "Status", value: profile?.status || "active" },
      { label: "Email", value: profile?.email_verified ? "verified" : "pending" },
      { label: "Interests", value: String(profile?.interests?.length || 0) },
    ],
    [profile],
  );

  const updateField = (field: keyof ProfileForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleCancel = () => {
    if (profile) {
      setForm(profileToForm(profile));
    }
    setError("");
    setMessage("");
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!accessToken) {
      return;
    }

    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }

    setIsSaving(true);
    setError("");
    setMessage("");

    try {
      const updatedProfile = await updateProfile(accessToken, formToPayload(form));
      setProfile(updatedProfile);
      setForm(profileToForm(updatedProfile));
      setIsEditing(false);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendOtp = async () => {
    if (!profile?.email) {
      return;
    }

    setOtpLoading(true);
    setError("");
    setMessage("");

    try {
      await sendProfileOtp(profile.email);
      setMessage("OTP sent to your email.");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!profile?.email || !otp.trim() || !accessToken) {
      setError("Enter the OTP from your email.");
      return;
    }

    setOtpLoading(true);
    setError("");
    setMessage("");

    try {
      await verifyProfileEmail(profile.email, otp.trim());
      await loadProfile(accessToken);
      setOtp("");
      setMessage("Email verified successfully.");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setOtpLoading(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="profile-page profile-page--centered">
        <Loader2 className="profile-spinner" />
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="profile-page profile-page--centered">
        <CircleAlert />
        <p>{error || "Unable to load profile."}</p>
        <Link className="profile-link-button" href="/login?returnTo=/profile">
          Sign in again
        </Link>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <section className="profile-hero">
        <div className="profile-hero-content">
          <span className="profile-hero-badge">My Profile</span>
          <h1 className="profile-hero-title">Welcome back, {profile.name.split(" ")[0]}</h1>
          <p className="profile-hero-lead">
            Keep your safari account details, emergency contact, and travel preferences ready.
          </p>
        </div>
      </section>

      <div className="profile-container">
        <div className="profile-layout">
          <aside className="profile-sidebar">
            <div className="profile-avatar">
              {profile.profile_picture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.profile_picture} alt="" />
              ) : (
                <span>{getInitials(profile.name)}</span>
              )}
            </div>
            <h2 className="profile-name">{profile.name}</h2>
            <p className="profile-email">{profile.email}</p>

            <div className="profile-identity">
              <span className={`profile-pill profile-pill--${profile.status}`}>{profile.status}</span>
              <span className="profile-pill">{profile.role.replace("_", " ")}</span>
            </div>

            <div className="profile-stats">
              {stats.map((stat) => (
                <div key={stat.label} className="profile-stat">
                  <div className="profile-stat-value">{stat.value}</div>
                  <div className="profile-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <nav className="profile-nav" aria-label="Profile navigation">
              <Link href="/profile" className="profile-nav-item active">
                <User />
                <span>Profile Information</span>
              </Link>
              <Link href="/my-bookings" className="profile-nav-item">
                <Calendar />
                <span>My Bookings</span>
              </Link>
              <Link href="/safari-packages" className="profile-nav-item">
                <Heart />
                <span>Safari Packages</span>
              </Link>
            </nav>
          </aside>

          <section className="profile-content">
            <div className="profile-content-header">
              <div>
                <h3>Account Details</h3>
                <p>Information used for bookings and visitor coordination.</p>
              </div>

              {!isEditing ? (
                <button className="profile-edit-btn" onClick={() => setIsEditing(true)}>
                  <Pencil />
                  Edit Profile
                </button>
              ) : (
                <div className="profile-edit-actions">
                  <button className="profile-save-btn" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? <Loader2 className="profile-button-spinner" /> : <Check />}
                    Save
                  </button>
                  <button className="profile-cancel-btn" onClick={handleCancel} disabled={isSaving}>
                    <X />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {error && <div className="profile-alert profile-alert--error">{error}</div>}
            {message && <div className="profile-alert profile-alert--success">{message}</div>}

            <div className="profile-summary-grid">
              <div className="profile-summary-item">
                <Mail />
                <div>
                  <span>Email</span>
                  <strong>{profile.email}</strong>
                </div>
              </div>
              <div className="profile-summary-item">
                <Phone />
                <div>
                  <span>Mobile</span>
                  <strong>{profile.mobile || "Not added"}</strong>
                </div>
              </div>
              <div className="profile-summary-item">
                <MapPin />
                <div>
                  <span>Location</span>
                  <strong>{displayLocation}</strong>
                </div>
              </div>
              <div className="profile-summary-item">
                <Clock3 />
                <div>
                  <span>Last login</span>
                  <strong>{formatDate(profile.last_login)}</strong>
                </div>
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-section-title">
                <h4>Personal Information</h4>
              </div>
              <div className="profile-form-grid">
                <label className="profile-form-group">
                  <span>Full Name</span>
                  {isEditing ? (
                    <input value={form.name} onChange={(event) => updateField("name", event.target.value)} />
                  ) : (
                    <strong>{profile.name}</strong>
                  )}
                </label>
                <label className="profile-form-group">
                  <span>Date of Birth</span>
                  {isEditing ? (
                    <input
                      type="date"
                      value={form.date_of_birth}
                      onChange={(event) => updateField("date_of_birth", event.target.value)}
                    />
                  ) : (
                    <strong>{formatDate(profile.date_of_birth)}</strong>
                  )}
                </label>
                <label className="profile-form-group">
                  <span>Gender</span>
                  {isEditing ? (
                    <select
                      value={form.gender}
                      onChange={(event) => updateField("gender", event.target.value as ProfileForm["gender"])}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <strong>{profile.gender || "Not added"}</strong>
                  )}
                </label>
                <label className="profile-form-group">
                  <span>Alternate Mobile</span>
                  {isEditing ? (
                    <input
                      value={form.alternate_mobile}
                      onChange={(event) => updateField("alternate_mobile", event.target.value)}
                    />
                  ) : (
                    <strong>{profile.alternate_mobile || "Not added"}</strong>
                  )}
                </label>
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-section-title">
                <h4>Address</h4>
              </div>
              <div className="profile-form-grid">
                {(["line1", "line2", "city", "state", "pincode", "country"] as const).map((field) => (
                  <label key={field} className="profile-form-group">
                    <span>{field === "line1" ? "Address Line 1" : field === "line2" ? "Address Line 2" : field}</span>
                    {isEditing ? (
                      <input value={form[field]} onChange={(event) => updateField(field, event.target.value)} />
                    ) : (
                      <strong>{profile.address?.[field] || "Not added"}</strong>
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div className="profile-section">
              <div className="profile-section-title">
                <h4>Emergency Contact</h4>
              </div>
              <div className="profile-form-grid">
                <label className="profile-form-group">
                  <span>Name</span>
                  {isEditing ? (
                    <input
                      value={form.emergency_name}
                      onChange={(event) => updateField("emergency_name", event.target.value)}
                    />
                  ) : (
                    <strong>{profile.emergency_contact?.name || "Not added"}</strong>
                  )}
                </label>
                <label className="profile-form-group">
                  <span>Relationship</span>
                  {isEditing ? (
                    <input
                      value={form.emergency_relationship}
                      onChange={(event) => updateField("emergency_relationship", event.target.value)}
                    />
                  ) : (
                    <strong>{profile.emergency_contact?.relationship || "Not added"}</strong>
                  )}
                </label>
                <label className="profile-form-group">
                  <span>Mobile</span>
                  {isEditing ? (
                    <input
                      value={form.emergency_mobile}
                      onChange={(event) => updateField("emergency_mobile", event.target.value)}
                    />
                  ) : (
                    <strong>{profile.emergency_contact?.mobile || "Not added"}</strong>
                  )}
                </label>
                <label className="profile-form-group profile-form-group--wide">
                  <span>Interests</span>
                  {isEditing ? (
                    <input
                      value={form.interestsText}
                      onChange={(event) => updateField("interestsText", event.target.value)}
                      placeholder="Photography, Tiger tracking, Bird watching"
                    />
                  ) : (
                    <strong>{profile.interests?.join(", ") || "Not added"}</strong>
                  )}
                </label>
              </div>
            </div>

            {!profile.email_verified && (
              <div className="profile-verify">
                <div>
                  <ShieldCheck />
                  <div>
                    <h4>Email Verification</h4>
                    <p>Verify your email to keep booking updates and OTP recovery available.</p>
                  </div>
                </div>
                <div className="profile-verify-actions">
                  <button onClick={handleSendOtp} disabled={otpLoading}>
                    {otpLoading ? "Sending..." : "Send OTP"}
                  </button>
                  <input
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(event) => setOtp(event.target.value)}
                  />
                  <button onClick={handleVerifyOtp} disabled={otpLoading || !otp.trim()}>
                    Verify
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
