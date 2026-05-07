"use client";

import React from "react";
import Link from "next/link";
import "./style.css";

const MissionCard: React.FC<{ title: string; body: string; icon: string }> = ({ title, body, icon }) => (
  <div className="about-mission-card">
    <div className="about-mission-icon">{icon}</div>
    <h3>{title}</h3>
    <p>{body}</p>
  </div>
);

const TeamMember: React.FC<{ name: string; role: string; bio: string; image?: string }> = ({ name, role, bio }) => (
  <div className="about-team-member">
    <div className="about-team-avatar">
      {name.split(" ")[0][0]}{name.split(" ")[1]?.[0] || ""}
    </div>
    <div className="about-team-info">
      <strong className="about-team-name">{name}</strong>
      <div className="about-team-role">{role}</div>
      <p className="about-team-bio">{bio}</p>
    </div>
  </div>
);

const AboutPageContainer: React.FC = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="about-hero-content">
          <div className="about-hero-badge">✦ About Walk Into The Wild ✦</div>
          <h1 className="about-title">We connect people to unforgettable wildlife experiences</h1>
          <p className="about-lead">
            We partner with trusted safari operators to surface curated packages, enable shared safaris, 
            and guide travellers with practical local knowledge — all to make wildlife exploration accessible and responsible.
          </p>
          <div className="about-hero-stats">
            <div className="about-stat">
              <span className="about-stat-number">10+</span>
              <span className="about-stat-label">Years Experience</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">50+</span>
              <span className="about-stat-label">Partner Parks</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">10k+</span>
              <span className="about-stat-label">Happy Travelers</span>
            </div>
            <div className="about-stat">
              <span className="about-stat-number">98%</span>
              <span className="about-stat-label">Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="about-missions">
        <div className="about-section-header">
          <h2>Our Mission</h2>
          <p>Making wildlife adventures accessible, responsible, and unforgettable</p>
        </div>
        <div className="about-missions-grid">
          <MissionCard 
            title="Curated Safaris" 
            body="We hand-pick quality operators and experiences so you can travel with confidence."
            icon="🦁"
          />
          <MissionCard 
            title="Shared Adventures" 
            body="Join fellow enthusiasts to reduce cost and increase the joy of exploring together."
            icon="👥"
          />
          <MissionCard 
            title="Responsible Travel" 
            body="We promote low-impact travel and support local conservation efforts and communities."
            icon="🌿"
          />
        </div>
      </div>

      {/* Story Section */}
      <div className="about-story">
        <div className="about-story-content">
          <h2>Our Story</h2>
          <p>Founded in 2014, Walk Into The Wild began with a simple idea: wildlife exploration should be accessible to everyone who dreams of experiencing the untamed beauty of India's jungles.</p>
          <p>What started as a small blog sharing safari tips has grown into a trusted platform connecting thousands of travelers with authentic wildlife experiences. We've personally visited over 30 national parks, built relationships with local guides, and curated only the best operators who share our passion for conservation.</p>
          <p>Today, we're proud to be India's leading safari discovery platform, helping travelers plan their perfect wildlife adventure while supporting local communities and conservation efforts.</p>
        </div>
        <div className="about-story-image">
          <div className="about-story-placeholder">🦏</div>
        </div>
      </div>

      {/* Values Section */}
      <div className="about-values">
        <div className="about-section-header">
          <h2>Our Values</h2>
          <p>The principles that guide everything we do</p>
        </div>
        <div className="about-values-grid">
          <div className="about-value-card">
            <div className="about-value-icon">🔒</div>
            <h3>Trust & Transparency</h3>
            <p>No hidden fees, honest reviews, and verified operators you can rely on.</p>
          </div>
          <div className="about-value-card">
            <div className="about-value-icon">🤝</div>
            <h3>Community First</h3>
            <p>Building a community of wildlife enthusiasts who share knowledge and experiences.</p>
          </div>
          <div className="about-value-card">
            <div className="about-value-icon">🌍</div>
            <h3>Sustainable Tourism</h3>
            <p>Promoting practices that protect wildlife and support local communities.</p>
          </div>
          <div className="about-value-card">
            <div className="about-value-icon">⭐</div>
            <h3>Quality Assurance</h3>
            <p>Every operator is vetted to ensure you get the best possible experience.</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="about-team">
        <div className="about-section-header">
          <h2>Meet Our Team</h2>
          <p>Passionate wildlife lovers dedicated to your safari experience</p>
        </div>
        <div className="about-team-grid">
          <TeamMember 
            name="Asha Mehta" 
            role="Founder & CEO" 
            bio="Wildlife photographer turned entrepreneur. Has visited 45+ national parks across India."
          />
          <TeamMember 
            name="Rahul Verma" 
            role="Head of Partnerships" 
            bio="Former naturalist with 12 years of experience in leading safaris."
          />
          <TeamMember 
            name="Nina Kapoor" 
            role="Product & Design" 
            bio="Designs experiences that make safari planning effortless and enjoyable."
          />
          <TeamMember 
            name="Vikram Singh" 
            role="Customer Experience" 
            bio="Ensures every traveler gets personalized support throughout their journey."
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="about-cta">
        <div className="about-cta-content">
          <h3>Want to collaborate?</h3>
          <p>Partner with us as an operator or contributor — help build better safaris.</p>
          <Link href="/contact-us" className="about-cta-btn">
            Get in touch →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPageContainer;