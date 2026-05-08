"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./style.css";

// Icons
const IconUser = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const IconMap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconEdit = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 3l4 4L7 21H3v-4L17 3z" />
  </svg>
);

const IconSave = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconHistory = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconHeart = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const ProfileContainer = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Asha Mehta",
    email: "asha.mehta@walkintothewild.in",
    phone: "+91 98765 43210",
    location: "New Delhi, India",
    bio: "Wildlife photographer and conservation enthusiast with over 10 years of experience exploring India's national parks.",
  });

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save to backend
    console.log("Saved:", formData);
  };

  const stats = [
    { label: "Safaris Completed", value: "12", icon: "🦁" },
    { label: "Countries Visited", value: "3", icon: "🌍" },
    { label: "Photos Taken", value: "2,847", icon: "📸" },
    { label: "Wildlife Spotted", value: "45+", icon: "🐘" },
  ];

  const recentActivities = [
    { id: 1, action: "Booked Tadoba Explorer Safari", date: "2026-06-18", status: "Confirmed" },
    { id: 2, action: "Joined Shared Safari - Kanha", date: "2026-06-15", status: "Pending" },
    { id: 3, action: "Updated Profile Information", date: "2026-06-10", status: "Completed" },
    { id: 4, action: "Booked Ranthambore Evening Safari", date: "2026-06-05", status: "Confirmed" },
  ];

  return (
    <div className="profile-page">
      {/* Hero Section */}
      <div className="profile-hero">
        <div className="profile-hero-content">
          <div className="profile-hero-badge">✦ My Profile ✦</div>
          <h1 className="profile-hero-title">Welcome Back, {formData.fullName.split(" ")[0]}</h1>
          <p className="profile-hero-lead">
            Manage your account, view bookings, and update your preferences
          </p>
        </div>
      </div>

      <div className="profile-container">
        <div className="profile-layout">
          {/* Left Sidebar */}
          <div className="profile-sidebar">
            <div className="profile-avatar">
              <div className="profile-avatar-initials">
                {formData.fullName.split(" ")[0][0]}{formData.fullName.split(" ")[1]?.[0] || ""}
              </div>
            </div>
            <h2 className="profile-name">{formData.fullName}</h2>
            <p className="profile-email">{formData.email}</p>
            
            <div className="profile-stats">
              {stats.map((stat, index) => (
                <div key={index} className="profile-stat">
                  <span className="profile-stat-icon">{stat.icon}</span>
                  <div>
                    <div className="profile-stat-value">{stat.value}</div>
                    <div className="profile-stat-label">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="profile-nav">
              <Link href="/profile" className="profile-nav-item active">
                <IconUser />
                <span>Profile Information</span>
              </Link>
              <Link href="/my-bookings" className="profile-nav-item">
                <IconCalendar />
                <span>My Bookings</span>
              </Link>
              <Link href="/wishlist" className="profile-nav-item">
                <IconHeart />
                <span>Wishlist</span>
              </Link>
            </div>
          </div>

          {/* Right Content */}
          <div className="profile-content">
            <div className="profile-content-header">
              <h3>Profile Information</h3>
              {!isEditing ? (
                <button className="profile-edit-btn" onClick={() => setIsEditing(true)}>
                  <IconEdit />
                  Edit Profile
                </button>
              ) : (
                <div className="profile-edit-actions">
                  <button className="profile-save-btn" onClick={handleSave}>
                    <IconSave />
                    Save Changes
                  </button>
                  <button className="profile-cancel-btn" onClick={() => setIsEditing(false)}>
                    <IconClose />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="profile-form">
              <div className="profile-form-group">
                <label>Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                ) : (
                  <div className="profile-value">{formData.fullName}</div>
                )}
              </div>

              <div className="profile-form-group">
                <label>Email Address</label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                ) : (
                  <div className="profile-value">{formData.email}</div>
                )}
              </div>

              <div className="profile-form-group">
                <label>Phone Number</label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                ) : (
                  <div className="profile-value">{formData.phone}</div>
                )}
              </div>

              <div className="profile-form-group">
                <label>Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="profile-input"
                  />
                ) : (
                  <div className="profile-value">{formData.location}</div>
                )}
              </div>

              <div className="profile-form-group">
                <label>Bio</label>
                {isEditing ? (
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="profile-textarea"
                    rows={4}
                  />
                ) : (
                  <div className="profile-value">{formData.bio}</div>
                )}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="profile-recent">
              <h3>Recent Activity</h3>
              <div className="profile-activity-list">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="profile-activity-item">
                    <div className="profile-activity-icon">
                      <IconHistory />
                    </div>
                    <div className="profile-activity-info">
                      <div className="profile-activity-action">{activity.action}</div>
                      <div className="profile-activity-date">{activity.date}</div>
                    </div>
                    <div className={`profile-activity-status ${activity.status.toLowerCase()}`}>
                      {activity.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;