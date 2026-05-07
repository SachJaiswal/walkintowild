// Terms & Conditions Page
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

const termsSections = [
  {
    heading: "Acceptance of Terms",
    body: (
      <p>
        By accessing and using Walk Into The Wild's services, you agree to be bound by these 
        Terms & Conditions. If you do not agree, please do not use our services.
      </p>
    ),
  },
  {
    heading: "Booking and Payment",
    body: (
      <>
        <p>
          A deposit is required to confirm any safari booking. Full payment must be completed 
          at least 30 days before departure. We accept payments via credit card, bank transfer, 
          and UPI.
        </p>
        <ul>
          <li>50% deposit required at time of booking</li>
          <li>Remaining balance due 30 days before safari</li>
          <li>Bookings within 30 days require full payment</li>
        </ul>
      </>
    ),
  },
  // Add more sections as needed
];

const TermsContainer: React.FC = () => {
  return <PolicyPage title="Terms & Conditions" sections={termsSections} lastUpdated="January 15, 2024" />;
};

export default TermsContainer;