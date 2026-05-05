"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./style.css";

// SVG Icons
const LogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="2" y="30" fontFamily="'Georgia', serif" fontSize="34" fontWeight="900" fill="#7FD43A" fontStyle="italic">W</text>
  </svg>
);

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheetahIcon = () => (
  <svg width="32" height="32" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="18" cy="11" rx="11" ry="5" fill="#2c2c2c" />
    <ellipse cx="29" cy="9" rx="5" ry="4.5" fill="#2c2c2c" />
    <polygon points="31,5 33,1 35,5" fill="#2c2c2c" />
    <ellipse cx="33" cy="10.5" rx="2.5" ry="2" fill="#2c2c2c" />
    <path d="M7 11 Q3 8 1 5 Q0 3 2 4 Q4 8 7 11" fill="#2c2c2c" stroke="#2c2c2c" strokeWidth="0.5" />
    <line x1="13" y1="15" x2="12" y2="19" stroke="#2c2c2c" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="17" y1="16" x2="16" y2="20" stroke="#2c2c2c" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="22" y1="16" x2="23" y2="20" stroke="#2c2c2c" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="26" y1="15" x2="27" y2="19" stroke="#2c2c2c" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="32" cy="8.5" r="1" fill="white" />
  </svg>
);

const PackagesIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="7" width="18" height="14" rx="1.5" stroke="#2c2c2c" strokeWidth="1.8" />
    <path d="M3 11h18" stroke="#2c2c2c" strokeWidth="1.8" />
    <path d="M8 7V5a2 2 0 014 0v2" stroke="#2c2c2c" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M16 7V5a2 2 0 00-4 0v2" stroke="#2c2c2c" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const JeepIcon = () => (
  <svg width="32" height="32" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="8" width="26" height="10" rx="2" stroke="#2c2c2c" strokeWidth="1.8" />
    <path d="M5 8 L7 2 L21 2 L23 8" stroke="#2c2c2c" strokeWidth="1.8" strokeLinejoin="round" />
    <rect x="8" y="3" width="5" height="4" rx="0.5" stroke="#2c2c2c" strokeWidth="1.2" />
    <rect x="15" y="3" width="5" height="4" rx="0.5" stroke="#2c2c2c" strokeWidth="1.2" />
    <circle cx="7" cy="18" r="3.5" stroke="#2c2c2c" strokeWidth="1.8" />
    <circle cx="21" cy="18" r="3.5" stroke="#2c2c2c" strokeWidth="1.8" />
    <circle cx="7" cy="18" r="1.2" fill="#2c2c2c" />
    <circle cx="21" cy="18" r="1.2" fill="#2c2c2c" />
  </svg>
);

const UserIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="4" stroke="#2c2c2c" strokeWidth="1.8" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#2c2c2c" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const navItems = [
  { label: "PLAN SAFARI", href: "/", icon: <CheetahIcon /> },
  { label: "SAFARI PACKAGES", href: "/safari-packages", icon: <PackagesIcon /> },
  { label: "SHARED SAFARI", href: "/shared-safari", icon: <JeepIcon /> },
];

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <div className="navbar-wrapper">
      <div className="navbar-container">
        <nav className="navbar">
          {/* Brand */}
          <Link href="/" className="brand" aria-label="Home">
            <span className="brand-mark" aria-hidden="true">
              <LogoIcon />
            </span>
            <span className="brand-text">
              <span className="brand-name">Walk Into The Wild</span>
              <span className="brand-tag">Find · Plan · Share Safaris</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="nav-list">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href} className="nav-item">
                  <Link
                    href={item.href}
                    className={`nav-link ${isActive ? "active" : ""}`}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right: User + Hamburger */}
          <div className="nav-right">
            <div className="profile">
              <button
                className="profile-btn"
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((v) => !v)}
                type="button"
              >
                <span className="profile-avatar" aria-hidden="true">
                  <UserIcon />
                </span>
                <span className="profile-label">Login</span>
                <span className="profile-chevron" aria-hidden="true">
                  <ChevronDownIcon />
                </span>
              </button>

              {profileOpen && (
                <div className="profile-menu" role="menu" aria-label="Profile">
                  <Link className="profile-item" href="/profile" role="menuitem" onClick={() => setProfileOpen(false)}>
                    Profile
                  </Link>
                  <Link className="profile-item" href="/account-settings" role="menuitem" onClick={() => setProfileOpen(false)}>
                    Account Settings
                  </Link>
                  <Link className="profile-item" href="/wishlist" role="menuitem" onClick={() => setProfileOpen(false)}>
                    Wishlist
                  </Link>
                </div>
              )}
            </div>

            <button
              className="hamburger"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`bar ${menuOpen ? "bar1-open" : ""}`} />
              <span className={`bar ${menuOpen ? "bar2-open" : ""}`} />
              <span className={`bar ${menuOpen ? "bar3-open" : ""}`} />
            </button>
          </div>

          {/* Mobile Dropdown */}
          {menuOpen && (
            <ul className="mobile-menu">
              <li className="mobile-item mobile-profile">
                <Link href="/login" className="mobile-link" onClick={() => setMenuOpen(false)}>
                  <span className="nav-icon"><UserIcon /></span>
                  <span>Login</span>
                </Link>
              </li>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href} className="mobile-item">
                    <Link
                      href={item.href}
                      className={`mobile-link ${isActive ? "mobile-active" : ""}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;