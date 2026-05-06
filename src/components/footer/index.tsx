"use client";

import React from "react";
import Link from "next/link";
import "./style.css";

// ── Instagram Icon ─────────────────────────────────────────────────────────
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="2" />
    <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="white" />
  </svg>
);

// ── Scroll to top ──────────────────────────────────────────────────────────
const ScrollTopBtn = () => {
  const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <button className="scroll-top" onClick={handleClick} aria-label="Scroll to top">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19V5M5 12l7-7 7 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

// ── Footer Component ───────────────────────────────────────────────────────
const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-body">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="col-title">About Us</h3>
            <p className="col-text">
              We offer a seamless experience, connecting you with multiple safari tour
              operators and providing all the essential details you need to make informed
              decisions about your wildlife safari, all at no cost.
            </p>
            <p className="col-text">
              Our shared safari feature connects you with fellow safari enthusiasts,
              enabling you to form a group and embark on a shared safari adventure together.
            </p>
          </div>
          <div className="footer-col">
            <h3 className="col-title">Policy</h3>
            <ul className="link-list">
              <li><Link href="/privacy-policy" className="footer-link">Privacy Policy</Link></li>
              <li><Link href="/terms" className="footer-link">Terms &amp; Conditions</Link></li>
              <li><Link href="/refund-policy" className="footer-link">Refund Policy</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3 className="col-title">Useful Links</h3>
            <ul className="link-list">
              <li><Link href="/about" className="footer-link">About Us</Link></li>
              <li><Link href="/contact" className="footer-link">Contact us</Link></li>
              <li><Link href="/faqs" className="footer-link">FAQs</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h3 className="col-title">Contact Info</h3>
            <p className="contact-row">
              <strong>Address:</strong> New Delhi, India
            </p>
            <p className="contact-row">
              <strong>Email:</strong>{" "}
              <a href="mailto:support@walkintothewild.in" className="footer-link">
                support@walkintothewild.in
              </a>
            </p>
            <div className="social-row">
              <a
                href="https://instagram.com/walkintothewild.in"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <span className="social-handle">walkintothewild.in</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-bar">
        <div className="bottom-inner">
          <div className="brand-badge">
            <img src="/logo.png" alt="Walk into the Wild" style={{ height: 28, display: 'block' }} />
          </div>
          <p className="credit">
            DEVELOPED BY CORBIN TECHNOLOGIES PRIVATE LIMITED
          </p>
          <div className="copyright-row">
            <span className="copyright">
              COPYRIGHT © 2025 | ALL RIGHTS RESERVED
            </span>
            <ScrollTopBtn />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;