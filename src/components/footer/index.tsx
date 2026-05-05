"use client";

import React from "react";
import Link from "next/link";
import "./style.css";

// ── Inline SVG silhouette strip (animals + grass) ──────────────────────────
// const SavannahDivider = () => (
//   <div className="savannah-wrap" aria-hidden="true">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 1440 110"
//       preserveAspectRatio="none"
//       className="savannah-svg"
//     >
//       <path
//         d="M0,80 Q10,60 20,80 Q30,55 40,80 Q50,60 60,80 Q70,55 80,80
//            Q90,60 100,80 Q110,55 120,80 Q130,60 140,80 Q150,55 160,80
//            Q170,60 180,80 Q190,55 200,80 Q210,60 220,80 Q230,55 240,80
//            Q250,60 260,80 Q270,55 280,80 Q290,60 300,80 Q310,55 320,80
//            Q330,60 340,80 Q350,55 360,80 Q370,60 380,80 Q390,55 400,80
//            Q410,60 420,80 Q430,55 440,80 Q450,60 460,80 Q470,55 480,80
//            Q490,60 500,80 Q510,55 520,80 Q530,60 540,80 Q550,55 560,80
//            Q570,60 580,80 Q590,55 600,80 Q610,60 620,80 Q630,55 640,80
//            Q650,60 660,80 Q670,55 680,80 Q690,60 700,80 Q710,55 720,80
//            Q730,60 740,80 Q750,55 760,80 Q770,60 780,80 Q790,55 800,80
//            Q810,60 820,80 Q830,55 840,80 Q850,60 860,80 Q870,55 880,80
//            Q890,60 900,80 Q910,55 920,80 Q930,60 940,80 Q950,55 960,80
//            Q970,60 980,80 Q990,55 1000,80 Q1010,60 1020,80 Q1030,55 1040,80
//            Q1050,60 1060,80 Q1070,55 1080,80 Q1090,60 1100,80 Q1110,55 1120,80
//            Q1130,60 1140,80 Q1150,55 1160,80 Q1170,60 1180,80 Q1190,55 1200,80
//            Q1210,60 1220,80 Q1230,55 1240,80 Q1250,60 1260,80 Q1270,55 1280,80
//            Q1290,60 1300,80 Q1310,55 1320,80 Q1330,60 1340,80 Q1350,55 1360,80
//            Q1370,60 1380,80 Q1390,55 1400,80 Q1410,60 1420,80 Q1430,55 1440,80
//            L1440,110 L0,110 Z"
//         fill="#0b4d2c"
//       />
//       <g transform="translate(80, 12)">
//         <ellipse cx="30" cy="48" rx="28" ry="20" fill="#0b4d2c" />
//         <ellipse cx="54" cy="36" rx="16" ry="14" fill="#0b4d2c" />
//         <ellipse cx="62" cy="33" rx="9" ry="11" fill="#0b4d2c" />
//         <path d="M66 44 Q74 52 70 62 Q68 68 64 66" stroke="#0b4d2c" strokeWidth="5" fill="none" strokeLinecap="round" />
//         <path d="M64 46 Q72 48 70 54" stroke="#0b4d2c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
//         <rect x="10" y="62" width="8" height="18" rx="3" fill="#0b4d2c" />
//         <rect x="22" y="62" width="8" height="18" rx="3" fill="#0b4d2c" />
//         <rect x="34" y="62" width="8" height="18" rx="3" fill="#0b4d2c" />
//         <rect x="46" y="62" width="8" height="18" rx="3" fill="#0b4d2c" />
//         <path d="M4 44 Q-2 50 2 56" stroke="#0b4d2c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
//       </g>
//       <g transform="translate(390, 18)">
//         <ellipse cx="24" cy="48" rx="22" ry="16" fill="#0b4d2c" />
//         <circle cx="44" cy="34" r="16" fill="#0b4d2c" />
//         <circle cx="44" cy="34" r="11" fill="#0b4d2c" />
//         <rect x="6" y="58" width="7" height="16" rx="3" fill="#0b4d2c" />
//         <rect x="16" y="60" width="7" height="16" rx="3" fill="#0b4d2c" />
//         <rect x="28" y="60" width="7" height="16" rx="3" fill="#0b4d2c" />
//         <rect x="38" y="58" width="7" height="16" rx="3" fill="#0b4d2c" />
//         <path d="M2 46 Q-8 40 -6 30 Q-4 25 -2 28" stroke="#0b4d2c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
//         <circle cx="-2" cy="27" r="4" fill="#0b4d2c" />
//       </g>
//       <g transform="translate(680, 8)">
//         <ellipse cx="18" cy="54" rx="14" ry="10" fill="#0b4d2c" />
//         <rect x="25" y="34" width="7" height="22" rx="3" fill="#0b4d2c" />
//         <ellipse cx="30" cy="28" rx="8" ry="7" fill="#0b4d2c" />
//         <path d="M28 22 Q24 10 20 6 M28 22 Q24 12 28 4 M28 22 Q32 10 36 6 M28 22 Q32 12 30 4" stroke="#0b4d2c" strokeWidth="2" fill="none" strokeLinecap="round" />
//         <rect x="8" y="60" width="5" height="20" rx="2" fill="#0b4d2c" />
//         <rect x="15" y="62" width="5" height="20" rx="2" fill="#0b4d2c" />
//         <rect x="22" y="62" width="5" height="20" rx="2" fill="#0b4d2c" />
//         <rect x="29" y="60" width="5" height="20" rx="2" fill="#0b4d2c" />
//       </g>
//       <g transform="translate(1020, 18)">
//         <ellipse cx="28" cy="46" rx="30" ry="20" fill="#0b4d2c" />
//         <ellipse cx="54" cy="40" rx="16" ry="13" fill="#0b4d2c" />
//         <polygon points="64,28 68,18 72,28" fill="#0b4d2c" />
//         <ellipse cx="50" cy="28" rx="5" ry="6" fill="#0b4d2c" />
//         <rect x="6" y="60" width="9" height="18" rx="3" fill="#0b4d2c" />
//         <rect x="18" y="62" width="9" height="18" rx="3" fill="#0b4d2c" />
//         <rect x="32" y="62" width="9" height="18" rx="3" fill="#0b4d2c" />
//         <rect x="44" y="60" width="9" height="18" rx="3" fill="#0b4d2c" />
//         <path d="M0 42 Q-6 36 -4 28" stroke="#0b4d2c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
//       </g>
//       <g transform="translate(1310, 22)">
//         <ellipse cx="22" cy="46" rx="24" ry="13" fill="#0b4d2c" />
//         <ellipse cx="44" cy="36" rx="11" ry="10" fill="#0b4d2c" />
//         <polygon points="46,27 50,20 54,27" fill="#0b4d2c" />
//         <rect x="6" y="54" width="6" height="18" rx="2" fill="#0b4d2c" />
//         <rect x="15" y="56" width="6" height="18" rx="2" fill="#0b4d2c" />
//         <rect x="26" y="56" width="6" height="18" rx="2" fill="#0b4d2c" />
//         <rect x="36" y="54" width="6" height="18" rx="2" fill="#0b4d2c" />
//         <path d="M0 42 Q-10 34 -8 22 Q-6 16 -4 18" stroke="#0b4d2c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
//       </g>
//     </svg>
//   </div>
// );

// ── Instagram Icon ─────────────────────────────────────────────────────────
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="white" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="1.8" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="white" />
  </svg>
);

// ── Scroll to top ──────────────────────────────────────────────────────────
const ScrollTopBtn = () => {
  const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <button className="scroll-top" onClick={handleClick} aria-label="Scroll to top">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 19V5M5 12l7-7 7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
            <span className="brand-text">Walk into the Wild</span>
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