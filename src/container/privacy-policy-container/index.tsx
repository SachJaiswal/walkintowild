"use client";

import React from "react";
import "./style.css";

interface Section {
  heading: string;
  body: React.ReactNode;
}

interface PolicyPageProps {
  title: string;
  sections: Section[];
  lastUpdated?: string;
}

const PolicyPage: React.FC<PolicyPageProps> = ({ title, sections, lastUpdated }) => {
  return (
    <div className="policy-page-wrapper">
      {/* Hero Section */}
      <div className="policy-hero">
        <div className="policy-hero-content">
          <div className="policy-hero-badge">✦ Legal Information ✦</div>
          <h1 className="policy-hero-title">{title}</h1>
          {lastUpdated && (
            <p className="policy-hero-updated">Last Updated: {lastUpdated}</p>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="policy-content">
        <div className="policy-content-inner">
          {sections.map((section, index) => (
            <div key={index} className="policy-section">
              <h2 className="policy-section__heading">{section.heading}</h2>
              <div className="policy-section__body">{section.body}</div>
            </div>
          ))}
          
          {/* Effective Date Note */}
          <div className="policy-footer-note">
            <p>
              If you have any questions about this policy, please contact us at{' '}
              <a href="mailto:support@walkintothewild.in">support@walkintothewild.in</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const sections = [
  {
    heading: "Introduction",
    body: (
      <p>
        Walk Into The Wild values your privacy. This policy explains what we collect,
        how we use data and your choices regarding that data. We are committed to 
        protecting your personal information and being transparent about how we handle it.
      </p>
    ),
  },
  {
    heading: "Information We Collect",
    body: (
      <>
        <p>
          We collect basic contact and booking information necessary to arrange safaris and
          communicate with you. This may include:
        </p>
        <ul>
          <li>Name, email address, phone number</li>
          <li>Booking preferences and safari requirements</li>
          <li>Identification details required for park permits</li>
          <li>Emergency contact information</li>
        </ul>
        <p>
          Payment details are processed by our payment partners and are not stored on our servers.
        </p>
      </>
    ),
  },
  {
    heading: "How We Use Your Information",
    body: (
      <>
        <p>We use your information to:</p>
        <ul>
          <li>Process and confirm your safari bookings</li>
          <li>Communicate important updates about your trips</li>
          <li>Improve our services and personalize your experience</li>
          <li>Send you relevant offers and safari inspiration (with your consent)</li>
          <li>Comply with legal requirements and park regulations</li>
        </ul>
      </>
    ),
  },
  {
    heading: "Cookies and Tracking",
    body: (
      <p>
        We use cookies to improve site functionality, analyze traffic, and enhance your browsing experience. 
        Cookies help us remember your preferences and show you relevant safari recommendations. 
        You may control cookies through your browser settings, though some features may be limited.
      </p>
    ),
  },
  {
    heading: "Data Sharing and Security",
    body: (
      <p>
        We do not sell your personal information. We may share data with trusted partners 
        (safari operators, lodges, park authorities) solely to fulfill your bookings. 
        All data is encrypted and stored securely. We implement industry-standard security 
        measures to protect your information from unauthorized access.
      </p>
    ),
  },
  {
    heading: "Your Rights",
    body: (
      <p>
        You have the right to access your data, request corrections, or ask for deletion. 
        You may also withdraw consent for marketing communications at any time. 
        To exercise these rights, contact us at{' '}
        <a href="mailto:support@walkintothewild.in">support@walkintothewild.in</a>.
        We will respond to your request within 30 days.
      </p>
    ),
  },
  {
    heading: "Data Retention",
    body: (
      <p>
        We retain your personal information only for as long as necessary to fulfill the 
        purposes outlined in this policy, or as required by law. Booking records are typically 
        kept for 7 years for legal and accounting purposes.
      </p>
    ),
  },
];

const PrivacyPolicyContainer: React.FC = () => {
  return (
    <PolicyPage 
      title="Privacy Policy" 
      sections={sections}
      lastUpdated="January 15, 2024"
    />
  );
};

export default PrivacyPolicyContainer;