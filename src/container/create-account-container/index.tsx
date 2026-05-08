// "use client";

// import React, { useMemo, useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import "./style.css";

// type Gender = "male" | "female" | "other" | "";

// type CreateAccountForm = {
//   name: string;
//   email: string;
//   mobile: string;
//   password: string;
//   confirmPassword: string;
//   dateOfBirth: string;
//   gender: Gender;
//   city: string;
//   state: string;
//   country: string;
//   emergencyName: string;
//   emergencyMobile: string;
//   interests: string[];
// };

// const safariInterests = [
//   "Safari",
//   "Wildlife",
//   "Adventure",
//   "Photography",
//   "Birding",
//   "Conservation",
// ];

// const initialForm: CreateAccountForm = {
//   name: "",
//   email: "",
//   mobile: "",
//   password: "",
//   confirmPassword: "",
//   dateOfBirth: "",
//   gender: "",
//   city: "",
//   state: "",
//   country: "India",
//   emergencyName: "",
//   emergencyMobile: "",
//   interests: [],
// };

// export default function CreateAccountContainer() {
//   const router = useRouter();
//   const [form, setForm] = useState<CreateAccountForm>(initialForm);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const passwordReady = form.password.length >= 6;
//   const passwordsMatch = form.password === form.confirmPassword;
//   const requiredReady = Boolean(
//     form.name.trim() &&
//       form.email.trim() &&
//       form.mobile.trim() &&
//       form.password &&
//       form.confirmPassword
//   );

//   const canSubmit = requiredReady && passwordReady && passwordsMatch && !loading;

//   const accountPreview = useMemo(
//     () => ({
//       role: "visitor",
//       status: "active",
//       email_verified: false,
//       mobile_verified: false,
//       interests: form.interests,
//     }),
//     [form.interests]
//   );

//   const updateField = (field: keyof CreateAccountForm, value: string) => {
//     setForm((current) => ({ ...current, [field]: value }));
//   };

//   const toggleInterest = (interest: string) => {
//     setForm((current) => ({
//       ...current,
//       interests: current.interests.includes(interest)
//         ? current.interests.filter((item) => item !== interest)
//         : [...current.interests, interest],
//     }));
//   };

//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     setError("");

//     if (!requiredReady) {
//       setError("Please fill all required fields.");
//       return;
//     }

//     if (!passwordReady) {
//       setError("Password must be at least 6 characters.");
//       return;
//     }

//     if (!passwordsMatch) {
//       setError("Passwords do not match.");
//       return;
//     }

//     setLoading(true);

//     const userPayload = {
//       user_id: `USR-${Date.now()}`,
//       name: form.name.trim(),
//       email: form.email.trim(),
//       password: form.password,
//       role: "visitor",
//       mobile: form.mobile.trim(),
//       date_of_birth: form.dateOfBirth ? new Date(form.dateOfBirth) : undefined,
//       gender: form.gender || undefined,
//       address: {
//         city: form.city.trim() || undefined,
//         state: form.state.trim() || undefined,
//         country: form.country.trim() || undefined,
//       },
//       emergency_contact: {
//         name: form.emergencyName.trim() || undefined,
//         mobile: form.emergencyMobile.trim() || undefined,
//       },
//       interests: form.interests,
//       status: "active",
//       email_verified: false,
//       mobile_verified: false,
//       created_at: new Date(),
//       updated_at: new Date(),
//     };

//     console.log("Create account payload", userPayload);

//     window.setTimeout(() => {
//       setLoading(false);
//       router.push("/login");
//     }, 900);
//   };

//   return (
//     <div className="create-account-page">
//       <div className="create-account-pattern" aria-hidden="true" />
//       <div className="create-account-ring create-account-ring--one" aria-hidden="true" />
//       <div className="create-account-ring create-account-ring--two" aria-hidden="true" />

//       <section className="create-account-shell">
//         <div className="create-account-panel">
//           <div className="create-account-brand">
//             <span className="create-account-mark">WS</span>
//             <div>
//               <p className="create-account-kicker">Visitor account</p>
//               <h1>Create Account</h1>
//             </div>
//           </div>

//           <form className="create-account-form" onSubmit={handleSubmit} noValidate>
//             <div className="create-account-grid">
//               <label className="create-account-field create-account-field--wide">
//                 <span>Full name *</span>
//                 <input
//                   type="text"
//                   value={form.name}
//                   onChange={(event) => updateField("name", event.target.value)}
//                   autoComplete="name"
//                   placeholder="Your full name"
//                 />
//               </label>

//               <label className="create-account-field">
//                 <span>Email *</span>
//                 <input
//                   type="email"
//                   value={form.email}
//                   onChange={(event) => updateField("email", event.target.value)}
//                   autoComplete="email"
//                   placeholder="you@example.com"
//                 />
//               </label>

//               <label className="create-account-field">
//                 <span>Mobile *</span>
//                 <input
//                   type="tel"
//                   value={form.mobile}
//                   onChange={(event) => updateField("mobile", event.target.value)}
//                   autoComplete="tel"
//                   placeholder="+91 98765 43210"
//                 />
//               </label>

//               <label className="create-account-field">
//                 <span>Password *</span>
//                 <input
//                   type="password"
//                   value={form.password}
//                   onChange={(event) => updateField("password", event.target.value)}
//                   autoComplete="new-password"
//                   placeholder="Minimum 6 characters"
//                 />
//               </label>

//               <label className="create-account-field">
//                 <span>Confirm password *</span>
//                 <input
//                   type="password"
//                   value={form.confirmPassword}
//                   onChange={(event) =>
//                     updateField("confirmPassword", event.target.value)
//                   }
//                   autoComplete="new-password"
//                   placeholder="Repeat password"
//                 />
//               </label>

//               <label className="create-account-field">
//                 <span>Date of birth</span>
//                 <input
//                   type="date"
//                   value={form.dateOfBirth}
//                   onChange={(event) => updateField("dateOfBirth", event.target.value)}
//                 />
//               </label>

//               <label className="create-account-field">
//                 <span>Gender</span>
//                 <select
//                   value={form.gender}
//                   onChange={(event) => updateField("gender", event.target.value)}
//                 >
//                   <option value="">Select gender</option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                   <option value="other">Other</option>
//                 </select>
//               </label>

//               <label className="create-account-field">
//                 <span>City</span>
//                 <input
//                   type="text"
//                   value={form.city}
//                   onChange={(event) => updateField("city", event.target.value)}
//                   autoComplete="address-level2"
//                   placeholder="City"
//                 />
//               </label>

//               <label className="create-account-field">
//                 <span>State</span>
//                 <input
//                   type="text"
//                   value={form.state}
//                   onChange={(event) => updateField("state", event.target.value)}
//                   autoComplete="address-level1"
//                   placeholder="State"
//                 />
//               </label>

//               <label className="create-account-field">
//                 <span>Country</span>
//                 <input
//                   type="text"
//                   value={form.country}
//                   onChange={(event) => updateField("country", event.target.value)}
//                   autoComplete="country-name"
//                   placeholder="Country"
//                 />
//               </label>

//               <label className="create-account-field">
//                 <span>Emergency contact</span>
//                 <input
//                   type="text"
//                   value={form.emergencyName}
//                   onChange={(event) => updateField("emergencyName", event.target.value)}
//                   placeholder="Contact name"
//                 />
//               </label>

//               <label className="create-account-field">
//                 <span>Emergency mobile</span>
//                 <input
//                   type="tel"
//                   value={form.emergencyMobile}
//                   onChange={(event) =>
//                     updateField("emergencyMobile", event.target.value)
//                   }
//                   placeholder="+91 98765 43210"
//                 />
//               </label>
//             </div>

//             <div className="create-account-interests">
//               <span>Interests</span>
//               <div className="create-account-chips">
//                 {safariInterests.map((interest) => (
//                   <button
//                     key={interest}
//                     type="button"
//                     className={
//                       form.interests.includes(interest)
//                         ? "create-account-chip create-account-chip--active"
//                         : "create-account-chip"
//                     }
//                     onClick={() => toggleInterest(interest)}
//                   >
//                     {interest}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             <div className="create-account-system">
//               <span>Role: {accountPreview.role}</span>
//               <span>Status: {accountPreview.status}</span>
//               <span>Email verification after signup</span>
//             </div>

//             {error && <p className="create-account-error">{error}</p>}

//             <button
//               type="submit"
//               className="create-account-submit"
//               disabled={!canSubmit}
//             >
//               {loading ? "CREATING ACCOUNT..." : "CREATE VISITOR ACCOUNT"}
//             </button>
//           </form>

//           <p className="create-account-login">
//             Already have an account? <Link href="/login">Login</Link>
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./style.css";

interface FormData {
  // Basic Information
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobile: string;
  alternate_mobile: string;
  date_of_birth: string;
  gender: "male" | "female" | "other" | "";
  
  // Address
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  
  // Emergency Contact
  emergency_name: string;
  emergency_relationship: string;
  emergency_mobile: string;
  
  // Interests
  interests: string[];
}

const CreateAccountContainer = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [formData, setFormData] = useState<FormData>({
    // Basic Information
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    alternate_mobile: "",
    date_of_birth: "",
    gender: "",
    
    // Address
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    
    // Emergency Contact
    emergency_name: "",
    emergency_relationship: "",
    emergency_mobile: "",
    
    // Interests
    interests: [],
  });

  const interestOptions = [
    { value: "Wildlife Photography", icon: "📸", color: "#ffc107" },
    { value: "Bird Watching", icon: "🦜", color: "#7fd43a" },
    { value: "Tiger Tracking", icon: "🐅", color: "#ff9800" },
    { value: "Nature Walks", icon: "🌿", color: "#4caf50" },
    { value: "Night Safaris", icon: "🌙", color: "#2196f3" },
    { value: "Conservation", icon: "🌍", color: "#9c27b0" },
    { value: "Adventure Sports", icon: "🧗", color: "#f44336" },
    { value: "Cultural Tours", icon: "🏺", color: "#795548" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const validateStep1 = () => {
    if (!formData.name) {
      setError("Please enter your full name");
      return false;
    }
    if (!formData.email) {
      setError("Please enter your email address");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.password) {
      setError("Please create a password");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!agreedToTerms) {
      setError("Please agree to the Terms & Conditions");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.mobile) {
      setError("Please enter your mobile number");
      return false;
    }
    if (!/^[0-9]{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      setError("Please enter a valid 10-digit mobile number");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    setError("");
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validateStep2()) {
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    setError("");
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Prepare data for API
    const userData = {
      user_id: `USER_${Date.now()}`,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: "visitor",
      mobile: formData.mobile,
      alternate_mobile: formData.alternate_mobile || undefined,
      date_of_birth: formData.date_of_birth ? new Date(formData.date_of_birth) : undefined,
      gender: formData.gender || undefined,
      address: {
        line1: formData.address_line1 || undefined,
        line2: formData.address_line2 || undefined,
        city: formData.city || undefined,
        state: formData.state || undefined,
        pincode: formData.pincode || undefined,
        country: formData.country || undefined,
      },
      emergency_contact: {
        name: formData.emergency_name || undefined,
        relationship: formData.emergency_relationship || undefined,
        mobile: formData.emergency_mobile || undefined,
      },
      interests: formData.interests.length > 0 ? formData.interests : undefined,
      status: "active",
      email_verified: false,
      mobile_verified: false,
    };

    console.log("Create account payload", userData);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }, 1500);
  };

  // Canvas animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.6 ? "#ffc107" : "#7fd43a",
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const rgb = p.color === "#ffc107" ? "255,193,7" : "127,212,58";
        ctx.fillStyle = `rgba(${rgb}, ${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
      });
      
      raf = requestAnimationFrame(draw);
    };
    draw();
    
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="create-account-page">
      <canvas className="create-canvas" ref={canvasRef} />
      
      <div className="create-pattern-overlay"></div>
      <div className="create-bg-ring create-bg-ring--1"></div>
      <div className="create-bg-ring create-bg-ring--2"></div>
      <div className="create-bg-ring create-bg-ring--3"></div>

      <div className="create-leaf create-leaf--1">🌿</div>
      <div className="create-leaf create-leaf--2">🍃</div>
      <div className="create-leaf create-leaf--3">🌱</div>

      <div className="create-center">
        <div className="create-card">
          <div className="create-logo">
            <div className="create-logo-icon">🦁</div>
            <div className="create-logo-text">
              <span className="create-logo-main">
                Wild<span className="create-logo-highlight">Safari</span>
              </span>
              <span className="create-logo-sub">African Expeditions</span>
            </div>
          </div>

          <div className="create-divider">
            <span className="create-divider-line"></span>
            <span className="create-divider-icon">✦</span>
            <span className="create-divider-line"></span>
          </div>

          {/* Step Indicator */}
          <div className="create-steps">
            <div className={`create-step ${currentStep >= 1 ? "active" : ""}`}>
              <div className="create-step-number">1</div>
              <span>Basic Info</span>
            </div>
            <div className="create-step-line"></div>
            <div className={`create-step ${currentStep >= 2 ? "active" : ""}`}>
              <div className="create-step-number">2</div>
              <span>Contact</span>
            </div>
            <div className="create-step-line"></div>
            <div className={`create-step ${currentStep >= 3 ? "active" : ""}`}>
              <div className="create-step-number">3</div>
              <span>Preferences</span>
            </div>
          </div>

          <form className="create-form" onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="create-step-content">
                <div className="create-form-header">
                  <h1 className="create-title">Create Account</h1>
                  <p className="create-subtitle">
                    Join the wild adventure and start planning your safari
                  </p>
                </div>

                <div className="create-fields">
                  <div className={`create-field ${focused === "name" ? "focused" : ""} ${formData.name ? "filled" : ""}`}>
                    <label className="create-label">FULL NAME *</label>
                    <div className="create-input-wrap">
                      <span className="create-input-icon">👤</span>
                      <input
                        type="text"
                        name="name"
                        className="create-input"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <span className="create-field-line"></span>
                  </div>

                  <div className={`create-field ${focused === "email" ? "focused" : ""} ${formData.email ? "filled" : ""}`}>
                    <label className="create-label">EMAIL ADDRESS *</label>
                    <div className="create-input-wrap">
                      <span className="create-input-icon">📧</span>
                      <input
                        type="email"
                        name="email"
                        className="create-input"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <span className="create-field-line"></span>
                  </div>

                  <div className={`create-field ${focused === "password" ? "focused" : ""} ${formData.password ? "filled" : ""}`}>
                    <label className="create-label">PASSWORD *</label>
                    <div className="create-input-wrap">
                      <span className="create-input-icon">🔒</span>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="create-input"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleInputChange}
                        onFocus={() => setFocused("password")}
                        onBlur={() => setFocused(null)}
                      />
                      <button
                        type="button"
                        className="create-password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                    <span className="create-field-line"></span>
                  </div>

                  <div className={`create-field ${focused === "confirmPassword" ? "focused" : ""} ${formData.confirmPassword ? "filled" : ""}`}>
                    <label className="create-label">CONFIRM PASSWORD *</label>
                    <div className="create-input-wrap">
                      <span className="create-input-icon">🔒</span>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        className="create-input"
                        placeholder="••••••••"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        onFocus={() => setFocused("confirmPassword")}
                        onBlur={() => setFocused(null)}
                      />
                      <button
                        type="button"
                        className="create-password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? "🙈" : "👁️"}
                      </button>
                    </div>
                    <span className="create-field-line"></span>
                  </div>
                </div>

                <div className="create-terms">
                  <label className="create-checkbox">
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                    />
                    <span>I agree to the <Link href="/terms">Terms & Conditions</Link> and <Link href="/privacy-policy">Privacy Policy</Link></span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <div className="create-step-content">
                <div className="create-form-header">
                  <h1 className="create-title">Contact Information</h1>
                  <p className="create-subtitle">
                    How can we reach you?
                  </p>
                </div>

                <div className="create-fields">
                  <div className={`create-field ${focused === "mobile" ? "focused" : ""} ${formData.mobile ? "filled" : ""}`}>
                    <label className="create-label">MOBILE NUMBER *</label>
                    <div className="create-input-wrap">
                      <span className="create-input-icon">📱</span>
                      <input
                        type="tel"
                        name="mobile"
                        className="create-input"
                        placeholder="98765 43210"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        onFocus={() => setFocused("mobile")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <span className="create-field-line"></span>
                  </div>

                  <div className={`create-field ${focused === "alternate_mobile" ? "focused" : ""} ${formData.alternate_mobile ? "filled" : ""}`}>
                    <label className="create-label">ALTERNATE MOBILE NUMBER (Optional)</label>
                    <div className="create-input-wrap">
                      <span className="create-input-icon">📱</span>
                      <input
                        type="tel"
                        name="alternate_mobile"
                        className="create-input"
                        placeholder="98765 43210"
                        value={formData.alternate_mobile}
                        onChange={handleInputChange}
                        onFocus={() => setFocused("alternate_mobile")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <span className="create-field-line"></span>
                  </div>

                  <div className={`create-field ${focused === "date_of_birth" ? "focused" : ""} ${formData.date_of_birth ? "filled" : ""}`}>
                    <label className="create-label">DATE OF BIRTH</label>
                    <div className="create-input-wrap">
                      <span className="create-input-icon">🎂</span>
                      <input
                        type="date"
                        name="date_of_birth"
                        className="create-input"
                        value={formData.date_of_birth}
                        onChange={handleInputChange}
                        onFocus={() => setFocused("date_of_birth")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <span className="create-field-line"></span>
                  </div>

                  <div className={`create-field ${focused === "gender" ? "focused" : ""} ${formData.gender ? "filled" : ""}`}>
                    <label className="create-label">GENDER</label>
                    <div className="create-input-wrap">
                      <span className="create-input-icon">⚥</span>
                      <select
                        name="gender"
                        className="create-input create-select"
                        value={formData.gender}
                        onChange={handleInputChange}
                        onFocus={() => setFocused("gender")}
                        onBlur={() => setFocused(null)}
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <span className="create-field-line"></span>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Address & Preferences */}
            {currentStep === 3 && (
              <div className="create-step-content">
                <div className="create-form-header">
                  <h1 className="create-title">Address & Interests</h1>
                  <p className="create-subtitle">
                    Tell us more about yourself
                  </p>
                </div>

                <div className="create-fields">
                  <div className={`create-field ${focused === "address_line1" ? "focused" : ""} ${formData.address_line1 ? "filled" : ""}`}>
                    <label className="create-label">ADDRESS LINE 1</label>
                    <div className="create-input-wrap">
                      <span className="create-input-icon">🏠</span>
                      <input
                        type="text"
                        name="address_line1"
                        className="create-input"
                        placeholder="Street address"
                        value={formData.address_line1}
                        onChange={handleInputChange}
                        onFocus={() => setFocused("address_line1")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <span className="create-field-line"></span>
                  </div>

                  <div className={`create-field ${focused === "address_line2" ? "focused" : ""} ${formData.address_line2 ? "filled" : ""}`}>
                    <label className="create-label">ADDRESS LINE 2</label>
                    <div className="create-input-wrap">
                      <span className="create-input-icon">🏢</span>
                      <input
                        type="text"
                        name="address_line2"
                        className="create-input"
                        placeholder="Apartment, suite, etc."
                        value={formData.address_line2}
                        onChange={handleInputChange}
                        onFocus={() => setFocused("address_line2")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <span className="create-field-line"></span>
                  </div>

                  <div className="create-row">
                    <div className={`create-field ${focused === "city" ? "focused" : ""} ${formData.city ? "filled" : ""}`}>
                      <label className="create-label">CITY</label>
                      <div className="create-input-wrap">
                        <input
                          type="text"
                          name="city"
                          className="create-input"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleInputChange}
                          onFocus={() => setFocused("city")}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                      <span className="create-field-line"></span>
                    </div>

                    <div className={`create-field ${focused === "state" ? "focused" : ""} ${formData.state ? "filled" : ""}`}>
                      <label className="create-label">STATE</label>
                      <div className="create-input-wrap">
                        <input
                          type="text"
                          name="state"
                          className="create-input"
                          placeholder="State"
                          value={formData.state}
                          onChange={handleInputChange}
                          onFocus={() => setFocused("state")}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                      <span className="create-field-line"></span>
                    </div>
                  </div>

                  <div className="create-row">
                    <div className={`create-field ${focused === "pincode" ? "focused" : ""} ${formData.pincode ? "filled" : ""}`}>
                      <label className="create-label">PINCODE</label>
                      <div className="create-input-wrap">
                        <input
                          type="text"
                          name="pincode"
                          className="create-input"
                          placeholder="Pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          onFocus={() => setFocused("pincode")}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                      <span className="create-field-line"></span>
                    </div>

                    <div className={`create-field ${focused === "country" ? "focused" : ""} ${formData.country ? "filled" : ""}`}>
                      <label className="create-label">COUNTRY</label>
                      <div className="create-input-wrap">
                        <input
                          type="text"
                          name="country"
                          className="create-input"
                          placeholder="Country"
                          value={formData.country}
                          onChange={handleInputChange}
                          onFocus={() => setFocused("country")}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                      <span className="create-field-line"></span>
                    </div>
                  </div>

                  {/* Emergency Contact Section */}
                  <div className="create-section-title">
                    <span>🚨 Emergency Contact</span>
                  </div>

                  <div className="create-row">
                    <div className={`create-field ${focused === "emergency_name" ? "focused" : ""} ${formData.emergency_name ? "filled" : ""}`}>
                      <label className="create-label">CONTACT NAME</label>
                      <div className="create-input-wrap">
                        <input
                          type="text"
                          name="emergency_name"
                          className="create-input"
                          placeholder="Emergency contact name"
                          value={formData.emergency_name}
                          onChange={handleInputChange}
                          onFocus={() => setFocused("emergency_name")}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                      <span className="create-field-line"></span>
                    </div>

                    <div className={`create-field ${focused === "emergency_relationship" ? "focused" : ""} ${formData.emergency_relationship ? "filled" : ""}`}>
                      <label className="create-label">RELATIONSHIP</label>
                      <div className="create-input-wrap">
                        <input
                          type="text"
                          name="emergency_relationship"
                          className="create-input"
                          placeholder="e.g., Spouse, Parent"
                          value={formData.emergency_relationship}
                          onChange={handleInputChange}
                          onFocus={() => setFocused("emergency_relationship")}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                      <span className="create-field-line"></span>
                    </div>
                  </div>

                  <div className={`create-field ${focused === "emergency_mobile" ? "focused" : ""} ${formData.emergency_mobile ? "filled" : ""}`}>
                    <label className="create-label">EMERGENCY MOBILE</label>
                    <div className="create-input-wrap">
                      <span className="create-input-icon">📞</span>
                      <input
                        type="tel"
                        name="emergency_mobile"
                        className="create-input"
                        placeholder="Emergency contact number"
                        value={formData.emergency_mobile}
                        onChange={handleInputChange}
                        onFocus={() => setFocused("emergency_mobile")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>
                    <span className="create-field-line"></span>
                  </div>

                  {/* Interests Section */}
                  <div className="create-section-title">
                    <span>🌟 Your Interests</span>
                    <p>Select what excites you the most</p>
                  </div>

                  <div className="create-interests">
                    {interestOptions.map((interest) => (
                      <button
                        key={interest.value}
                        type="button"
                        className={`create-interest-btn ${formData.interests.includes(interest.value) ? "active" : ""}`}
                        onClick={() => handleInterestToggle(interest.value)}
                        style={{
                          borderColor: formData.interests.includes(interest.value) ? interest.color : "rgba(255,255,255,0.2)",
                          background: formData.interests.includes(interest.value) ? `${interest.color}20` : "transparent"
                        }}
                      >
                        <span>{interest.icon}</span>
                        {interest.value}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="create-error">
                <span className="create-error-icon">⚠️</span>
                <p>{error}</p>
              </div>
            )}

            {success && (
              <div className="create-success">
                <span className="create-success-icon">✓</span>
                <p>{success}</p>
              </div>
            )}

            <div className="create-buttons">
              {currentStep > 1 && (
                <button type="button" className="create-back-btn" onClick={handleBack}>
                  ← Back
                </button>
              )}
              
              {currentStep < 3 ? (
                <button type="button" className="create-next-btn" onClick={handleNext}>
                  Continue →
                </button>
              ) : (
                <button
                  type="submit"
                  className={`create-submit ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="create-spinner"></div>
                      <span>CREATING ACCOUNT...</span>
                    </>
                  ) : (
                    <>
                      <span>CREATE ACCOUNT</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>

            <p className="create-switch">
              Already have an account?{" "}
              <Link href="/login" className="create-switch-link">
                Sign In →
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountContainer;
