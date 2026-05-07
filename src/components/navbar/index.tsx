"use client";

import { useEffect, useState, useRef } from "react";
import { 
  User, 
  ShoppingBag, 
  LogOut, 
  Heart, 
  ChevronDown,
  MapPin,
  CalendarDays,
  Users,
  Compass,
  Menu,
  X
} from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

import "./style.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Navigation items for Safari booking
  const navItems = [
    { 
      label: "Plan Safari", 
      href: "/",
      icon: <MapPin size={18} />,
      description: "Customize your safari experience"
    },
    { 
      label: "Safari Packages", 
      href: "/safari-packages",
      icon: <Compass size={18} />,
      description: "Curated wildlife adventures"
    },
    { 
      label: "Shared Safari", 
      href: "/shared-safari",
      icon: <Users size={18} />,
      description: "Join group expeditions"
    },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    // Implement your logout logic here
    setProfileOpen(false);
    router.push("/login");
  };

  // Get user initials
  const initials = user
    ? user.displayName
      ? user.displayName
          .split(" ")
          .map((w: string) => w[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : user.email
        ? user.email[0].toUpperCase()
        : null
    : null;

  return (
    <nav className={`safari-navbar ${scrolled ? "safari-navbar-scrolled" : ""}`}>
      <div className="safari-navbar-container">
        {/* LOGO with Safari theme */}
        <Link href="/" className="safari-navbar-logo">
          <div className="safari-logo-content">
            <div className="safari-logo-icon">
              <Compass size={28} strokeWidth={1.5} />
            </div>
            <div className="safari-logo-text">
              <span className="safari-logo-main">Wild<span className="safari-logo-highlight">Safari</span></span>
              <span className="safari-logo-sub">African Expeditions</span>
            </div>
          </div>
        </Link>

        {/* NAV LINKS */}
        <ul className={`safari-nav-links ${mobileMenu ? "active" : ""}`}>
          {navItems.map((item) => (
            <li key={item.href} className="safari-nav-item">
              <Link
                href={item.href}
                className={`safari-nav-link ${pathname === item.href ? "active" : ""}`}
                onClick={() => setMobileMenu(false)}
              >
                <span className="safari-nav-icon">{item.icon}</span>
                <div className="safari-nav-content">
                  <span className="safari-nav-label">{item.label}</span>
                  <span className="safari-nav-description">{item.description}</span>
                </div>
              </Link>
            </li>
          ))}

          {/* Optional: Add a "Book Now" CTA in mobile menu */}
         
        </ul>

        {/* RIGHT ICONS */}
        <div className="safari-navbar-icons">
          {/* Booking CTA (Desktop) */}
          <button className="safari-book-btn-desktop">
            <CalendarDays size={18} />
            <span>Book Now</span>
          </button>

         

          {/* Profile dropdown */}
          <div className="safari-profile-wrap" ref={dropdownRef}>
            <button
              className={`safari-profile-btn ${profileOpen ? "safari-profile-btn--open" : ""}`}
              onClick={() => setProfileOpen((v) => !v)}
              aria-label="Profile menu"
              aria-expanded={profileOpen}
            >
              {initials ? (
                <span className="safari-avatar-initials">{initials}</span>
              ) : (
                <User size={20} />
              )}
              <ChevronDown
                size={14}
                className={`safari-chevron ${profileOpen ? "safari-chevron--up" : ""}`}
              />
            </button>

            {profileOpen && (
              <div className="safari-dropdown" role="menu">
                <div className="safari-dropdown__header">
                  <div className="safari-dropdown__brand">
                    <Compass size={20} />
                    <span>WildSafari</span>
                  </div>
                </div>

                {user && (
                  <div className="safari-dropdown__user">
                    <span className="safari-dropdown__name">
                      {user.displayName || "Explorer"}
                    </span>
                    <span className="safari-dropdown__email">{user.email}</span>
                  </div>
                )}

                <div className="safari-dropdown__divider" />

                <Link
                  href="/profile"
                  className="safari-dropdown__item"
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                >
                  <User size={14} />
                  <span>My Profile</span>
                </Link>

                <Link
                  href="/my-bookings"
                  className="safari-dropdown__item"
                  role="menuitem"
                  onClick={() => setProfileOpen(false)}
                >
                  <CalendarDays size={14} />
                  <span>My Bookings</span>
                </Link>

                <div className="safari-dropdown__divider" />

                <button
                  className="safari-dropdown__item safari-dropdown__item--danger"
                  role="menuitem"
                  onClick={handleLogout}
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>

                {!user && (
                  <>
                    <Link
                      href="/login"
                      className="safari-dropdown__item"
                      role="menuitem"
                      onClick={() => setProfileOpen(false)}
                    >
                      <User size={14} />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      href="/register"
                      className="safari-dropdown__item safari-dropdown__item--highlight"
                      role="menuitem"
                      onClick={() => setProfileOpen(false)}
                    >
                      <span>Create Account</span>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* HAMBURGER MENU */}
          <button
            className={`safari-hamburger ${mobileMenu ? "active" : ""}`}
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Menu"
          >
            {mobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenu && (
        <div className="safari-mobile-overlay" onClick={() => setMobileMenu(false)} />
      )}
    </nav>
  );
};

export default Navbar;