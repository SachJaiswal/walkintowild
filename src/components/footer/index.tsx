"use client";
import Link from "next/link";
import { 
  Compass, 
  MapPin, 
  Phone, 
  Mail,
  Send,
  ChevronRight,
  Clock,
  Shield,
  Award,
  Leaf
} from "lucide-react";
import "./style.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: "Plan Safari", href: "/" },
    { label: "Safari Packages", href: "/safari-packages" },
    { label: "Shared Safari", href: "/shared-safari" },
    { label: "Custom Tours", href: "/custom-tours" },
  ];

  const companyLinks = [
    { label: "About Us", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Refund Policy", href: "/refund-policy" },
  ];

  const safariDestinations = [
    { name: "Masai Mara", country: "Kenya" },
    { name: "Serengeti", country: "Tanzania" },
    { name: "Kruger Park", country: "South Africa" },
    { name: "Chobe", country: "Botswana" },
  ];

  return (
    <footer className="safari-footer">
      {/* Background Elements */}
      <div className="safari-footer-bg">
        <div className="safari-footer-pattern" aria-hidden="true" />
        <div className="safari-footer-orb safari-footer-orb-1" aria-hidden="true" />
        <div className="safari-footer-orb safari-footer-orb-2" aria-hidden="true" />
      </div>

      {/* Main Footer Content */}
      <div className="safari-footer-container">
        {/* Top Section with Logo and Tagline */}
        <div className="safari-footer-top">
          <div className="safari-footer-brand">
            <div className="safari-footer-logo">
              <Compass size={32} strokeWidth={1.5} className="safari-footer-logo-icon" />
              <div className="safari-footer-logo-text">
                <span className="safari-footer-logo-main">Wild<span className="safari-footer-logo-highlight">Safari</span></span>
                <span className="safari-footer-logo-sub">African Expeditions</span>
              </div>
            </div>
            <p className="safari-footer-tagline">
              Experience the untamed beauty of Africa with expert-guided safari adventures.
              Create memories that last a lifetime.
            </p>
            <div className="safari-footer-badges">
              <div className="safari-footer-badge">
                <Award size={16} />
                <span>10+ Years Experience</span>
              </div>
              <div className="safari-footer-badge">
                <Leaf size={16} />
                <span>Eco-Friendly Tours</span>
              </div>
              <div className="safari-footer-badge">
                <Shield size={16} />
                <span>Safety Certified</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="safari-footer-section">
            <h3 className="safari-footer-title">
              <span className="safari-footer-title-icon">✦</span>
              Quick Links
            </h3>
            <ul className="safari-footer-links">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="safari-footer-link">
                    <ChevronRight size={14} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Safari Destinations */}
          <div className="safari-footer-section">
            <h3 className="safari-footer-title">
              <span className="safari-footer-title-icon">🌍</span>
              Top Destinations
            </h3>
            <ul className="safari-footer-destinations">
              {safariDestinations.map((destination) => (
                <li key={destination.name}>
                  <div className="safari-footer-destination">
                    <MapPin size={14} className="safari-footer-destination-icon" />
                    <div>
                      <span className="safari-footer-destination-name">{destination.name}</span>
                      <span className="safari-footer-destination-country">{destination.country}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Info */}
          <div className="safari-footer-section">
            <h3 className="safari-footer-title">
              <span className="safari-footer-title-icon">🏕️</span>
              Company
            </h3>
            <ul className="safari-footer-links">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="safari-footer-link">
                    <ChevronRight size={14} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Middle Section with Contact and Newsletter */}
        <div className="safari-footer-middle">
          {/* Contact Info */}
          <div className="safari-footer-contact">
            <h3 className="safari-footer-title">
              <span className="safari-footer-title-icon">📞</span>
              Get in Touch
            </h3>
            <div className="safari-footer-contact-info">
              <div className="safari-footer-contact-item">
                <Phone size={16} />
                <span>+254 700 123 456</span>
              </div>
              <div className="safari-footer-contact-item">
                <Mail size={16} />
                <span>bookings@wildsafari.com</span>
              </div>
              <div className="safari-footer-contact-item">
                <Clock size={16} />
                <div>
                  <span>Mon-Fri: 8:00 AM - 8:00 PM</span>
                  <span>Sat-Sun: 9:00 AM - 6:00 PM (EAT)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="safari-footer-newsletter">
            <h3 className="safari-footer-title">
              <span className="safari-footer-title-icon">✉️</span>
              Safari Newsletter
            </h3>
            <p className="safari-footer-newsletter-desc">
              Subscribe to receive exclusive offers, wildlife updates, and safari tips.
            </p>
            <form className="safari-footer-newsletter-form">
              <div className="safari-footer-input-group">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="safari-footer-input"
                  required
                />
                <button type="submit" className="safari-footer-submit">
                  <Send size={18} />
                  <span>Subscribe</span>
                </button>
              </div>
            </form>
            <p className="safari-footer-newsletter-note">
              No spam. Unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="safari-footer-bottom">
          <div className="safari-footer-bottom-content">
            <span className="safari-footer-copyright">
              © {currentYear} WildSafari African Expeditions. All rights reserved.
            </span>
            <div className="safari-footer-payment">
              <span className="safari-footer-payment-text">Secure Payments</span>
              <div className="safari-footer-payment-icons">
                <span>VISA</span>
                <span>Mastercard</span>
                <span>PayPal</span>
                <span>M-Pesa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;