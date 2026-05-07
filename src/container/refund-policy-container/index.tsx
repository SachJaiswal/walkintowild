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

// PolicyPage Component
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
          
          {/* Footer Note */}
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

// Sections data for Refund Policy
const sections = [
  {
    heading: "Overview",
    body: (
      <>
        <p>
          At Walk Into The Wild, we understand that plans can change. Our refund and cancellation 
          policy is designed to be fair while respecting the commitments we make to our safari 
          operators and partners. The specific terms may vary depending on the operator and the 
          timing of your cancellation.
        </p>
        <p>
          Please read this policy carefully before booking. We recommend purchasing travel 
          insurance to protect against unforeseen circumstances.
        </p>
      </>
    ),
  },
  {
    heading: "Cancellation by You (Customer)",
    body: (
      <>
        <p>Cancellation charges apply based on how far in advance you cancel:</p>
        <div className="policy-table-wrapper">
          <table className="policy-table">
            <thead>
              <tr>
                <th>Cancellation Notice</th>
                <th>Refund Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>60+ days before safari</td>
                <td>90% refund (10% processing fee)</td>
              </tr>
              <tr>
                <td>45-59 days before safari</td>
                <td>75% refund</td>
              </tr>
              <tr>
                <td>30-44 days before safari</td>
                <td>50% refund</td>
              </tr>
              <tr>
                <td>15-29 days before safari</td>
                <td>25% refund</td>
              </tr>
              <tr>
                <td>Less than 15 days before safari</td>
                <td>No refund</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Note:</strong> Peak season bookings (December-February, April-May) may have 
          stricter cancellation policies. Please check your specific package terms.
        </p>
      </>
    ),
  },
  {
    heading: "Cancellation by Operator",
    body: (
      <>
        <p>
          If a safari operator cancels a confirmed booking due to operational reasons, you will be offered:
        </p>
        <ul>
          <li><strong>Full refund</strong> of all payments made</li>
          <li><strong>Alternative dates</strong> at no additional cost</li>
          <li><strong>Credit note</strong> valid for 12 months for future safaris</li>
        </ul>
        <p>
          We will notify you immediately if a cancellation occurs and help you find the best alternative.
        </p>
      </>
    ),
  },
  {
    heading: "No-Show Policy",
    body: (
      <>
        <p>
          If you fail to arrive at the designated meeting point at the scheduled time:
        </p>
        <ul>
          <li>No refund will be provided</li>
          <li>Rescheduling is not permitted</li>
          <li>The safari will depart as scheduled without you</li>
        </ul>
        <p>
          Please ensure you arrive at least 15 minutes before the scheduled departure time.
        </p>
      </>
    ),
  },
  {
    heading: "Partial Cancellations",
    body: (
      <p>
        If you need to reduce the number of participants in your group, the cancellation policy 
        applies to the cancelled participant(s). Changes to group size must be communicated at 
        least 30 days before departure to avoid penalties.
      </p>
    ),
  },
  {
    heading: "Force Majeure",
    body: (
      <>
        <p>
          In cases of force majeure (natural disasters, pandemics, government travel restrictions, 
          political instability, or park closures), the following applies:
        </p>
        <ul>
          <li>Full credit valid for 24 months toward future safaris</li>
          <li>Partial refunds may be available depending on operator policies</li>
          <li>We strongly recommend comprehensive travel insurance</li>
        </ul>
        <p>
          Walk Into The Wild is not responsible for additional costs incurred (flights, hotels, 
          visas, etc.) due to force majeure events.
        </p>
      </>
    ),
  },
  {
    heading: "How to Request a Cancellation",
    body: (
      <>
        <p>To cancel your booking, please contact us at:</p>
        <p>
          <strong>Email:</strong> <a href="mailto:cancellations@walkintothewild.in">cancellations@walkintothewild.in</a><br />
          <strong>Phone:</strong> +91 11 0000 0000
        </p>
        <p>
          Please include your booking reference number and reason for cancellation. 
          Refunds will be processed within 14 business days of approval.
        </p>
      </>
    ),
  },
];

const RefundPolicyContainer: React.FC = () => {
  return (
    <PolicyPage 
      title="Cancellation & Refund Policy" 
      sections={sections}
      lastUpdated="January 15, 2024"
    />
  );
};

export default RefundPolicyContainer;