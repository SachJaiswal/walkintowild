"use client";

import React, { useState } from "react";
import Link from "next/link";
import "./style.css";

// Types
interface TourPackage {
  id: number;
  title: string;
  duration: string;
  price: string;
  description: string;
  highlights: string[];
  bestTime: string;
  groupSize: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  icon: string;
  popular?: boolean;
}

interface Step {
  id: number;
  title: string;
  description: string;
  icon: string;
}

// Tour Card Component
const TourCard: React.FC<{ tour: TourPackage }> = ({ tour }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case "Easy": return "#1c8027";
      case "Moderate": return "#ffc107";
      case "Challenging": return "#ff6b4d";
      default: return "#666";
    }
  };

  return (
    <div className="custom-tour-card">
      {tour.popular && <div className="custom-tour-popular">✦ Most Popular ✦</div>}
      <div className="custom-tour-card-icon">{tour.icon}</div>
      <h3 className="custom-tour-card-title">{tour.title}</h3>
      <p className="custom-tour-card-duration">{tour.duration}</p>
      <p className="custom-tour-card-description">{tour.description}</p>
      <div className="custom-tour-card-highlights">
        {tour.highlights.slice(0, 3).map((highlight, idx) => (
          <span key={idx} className="custom-tour-highlight-tag">{highlight}</span>
        ))}
      </div>
      <div className="custom-tour-card-details">
        <div className="custom-tour-detail">
          <span className="custom-tour-detail-label">Best Time:</span>
          <span>{tour.bestTime}</span>
        </div>
        <div className="custom-tour-detail">
          <span className="custom-tour-detail-label">Group Size:</span>
          <span>{tour.groupSize}</span>
        </div>
        <div className="custom-tour-detail">
          <span className="custom-tour-detail-label">Difficulty:</span>
          <span style={{ color: getDifficultyColor(tour.difficulty) }}>{tour.difficulty}</span>
        </div>
      </div>
      <div className="custom-tour-card-footer">
        <div className="custom-tour-price">{tour.price}</div>
        <button className="custom-tour-btn">Customize Tour</button>
      </div>
    </div>
  );
};

// Step Component
const StepCard: React.FC<{ step: Step; index: number }> = ({ step, index }) => {
  return (
    <div className="custom-step-card">
      <div className="custom-step-number">{index + 1}</div>
      <div className="custom-step-icon">{step.icon}</div>
      <h3 className="custom-step-title">{step.title}</h3>
      <p className="custom-step-description">{step.description}</p>
    </div>
  );
};

// Main Container
const CustomToursContainer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["All Tours", "Wildlife", "Photography", "Luxury", "Budget", "Family"];

  const tours: TourPackage[] = [
    {
      id: 1,
      title: "Classic Wildlife Safari",
      duration: "5 Days / 4 Nights",
      price: "₹ 35,000",
      description: "Experience the best of Indian wildlife with expert guides and comfortable accommodations.",
      highlights: ["Tiger Spotting", "Bird Watching", "Jungle Walk"],
      bestTime: "Oct - Mar",
      groupSize: "4-6 People",
      difficulty: "Easy",
      icon: "🦁",
      popular: true
    },
    {
      id: 2,
      title: "Wildlife Photography Tour",
      duration: "7 Days / 6 Nights",
      price: "₹ 55,000",
      description: "Professional photography workshop with expert wildlife photographers.",
      highlights: ["Photo Tips", "Hide Access", "Golden Hour Shoots"],
      bestTime: "Nov - Feb",
      groupSize: "4-8 People",
      difficulty: "Moderate",
      icon: "📸"
    },
    {
      id: 3,
      title: "Luxury Safari Experience",
      duration: "6 Days / 5 Nights",
      price: "₹ 85,000",
      description: "Premium safari experience with luxury lodges and private vehicles.",
      highlights: ["Private Jeep", "Fine Dining", "Spa Access"],
      bestTime: "Oct - Apr",
      groupSize: "2-4 People",
      difficulty: "Easy",
      icon: "🏕️",
      popular: true
    },
    {
      id: 4,
      title: "Budget Explorer Safari",
      duration: "4 Days / 3 Nights",
      price: "₹ 18,000",
      description: "Affordable safari adventure perfect for backpackers and solo travelers.",
      highlights: ["Shared Safari", "Dorm Stay", "Local Guide"],
      bestTime: "Year Round",
      groupSize: "6-10 People",
      difficulty: "Easy",
      icon: "🎒"
    },
    {
      id: 5,
      title: "Trek & Safari Combo",
      duration: "8 Days / 7 Nights",
      price: "₹ 45,000",
      description: "Combine jungle trekking with wildlife safaris for an adventurous experience.",
      highlights: ["Mountain Trek", "Camping", "River Crossing"],
      bestTime: "Sep - Dec",
      groupSize: "4-6 People",
      difficulty: "Challenging",
      icon: "⛰️"
    },
    {
      id: 6,
      title: "Family Safari Package",
      duration: "5 Days / 4 Nights",
      price: "₹ 42,000",
      description: "Kid-friendly safari with educational activities and comfortable stays.",
      highlights: ["Nature Walk", "Animal Tracking", "Bonfire"],
      bestTime: "Oct - Mar",
      groupSize: "4-8 People",
      difficulty: "Easy",
      icon: "👨‍👩‍👧‍👦"
    }
  ];

  const steps: Step[] = [
    {
      id: 1,
      title: "Tell Us Your Dream",
      description: "Share your preferences - parks, duration, budget, and special interests.",
      icon: "💭"
    },
    {
      id: 2,
      title: "Custom Itinerary",
      description: "We'll craft a personalized safari plan tailored just for you.",
      icon: "📝"
    },
    {
      id: 3,
      title: "Review & Refine",
      description: "Review the plan and suggest any changes until you're satisfied.",
      icon: "🔄"
    },
    {
      id: 4,
      title: "Book Your Adventure",
      description: "Confirm your booking and get ready for an unforgettable experience.",
      icon: "✅"
    }
  ];

  const filteredTours = selectedCategory === "All Tours" 
    ? tours 
    : tours.filter(tour => tour.title.includes(selectedCategory) || tour.description.includes(selectedCategory));

  return (
    <div className="custom-tours-page">
      {/* Hero Section */}
      <div className="custom-hero">
        <div className="custom-hero-content">
          <div className="custom-hero-badge">✦ Build Your Dream Safari ✦</div>
          <h1 className="custom-hero-title">
            Create Your <span className="custom-hero-highlight">Custom Safari</span>
          </h1>
          <p className="custom-hero-lead">
            Design the perfect wildlife adventure tailored to your preferences. 
            Choose your parks, duration, accommodations, and activities.
          </p>
          <div className="custom-hero-actions">
            <button className="custom-hero-btn primary">Start Customizing</button>
            <button className="custom-hero-btn secondary">View Templates</button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="custom-stats">
        <div className="custom-stat-item">
          <span className="custom-stat-number">500+</span>
          <span className="custom-stat-label">Custom Tours Created</span>
        </div>
        <div className="custom-stat-item">
          <span className="custom-stat-number">98%</span>
          <span className="custom-stat-label">Satisfaction Rate</span>
        </div>
        <div className="custom-stat-item">
          <span className="custom-stat-number">24/7</span>
          <span className="custom-stat-label">Expert Support</span>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="custom-how-it-works">
        <div className="custom-section-header">
          <h2>How It Works</h2>
          <p>Four simple steps to your dream safari</p>
        </div>
        <div className="custom-steps-grid">
          {steps.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>

      {/* Popular Templates Section */}
      <div className="custom-templates">
        <div className="custom-section-header">
          <h2>Popular Safari Templates</h2>
          <p>Start with these curated experiences or build from scratch</p>
        </div>

        {/* Category Filter */}
        <div className="custom-category-filter">
          {categories.map((category) => (
            <button
              key={category}
              className={`custom-category-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tours Grid */}
        <div className="custom-tours-grid">
          {filteredTours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="custom-why-us">
        <div className="custom-section-header">
          <h2>Why Choose Custom Safari?</h2>
          <p>Benefits of designing your own wildlife adventure</p>
        </div>
        <div className="custom-features-grid">
          <div className="custom-feature-card">
            <div className="custom-feature-icon">🎯</div>
            <h3>Personalized Experience</h3>
            <p>Tailored to your interests, pace, and preferences</p>
          </div>
          <div className="custom-feature-card">
            <div className="custom-feature-icon">💰</div>
            <h3>Flexible Budget</h3>
            <p>Choose accommodations and activities that fit your budget</p>
          </div>
          <div className="custom-feature-card">
            <div className="custom-feature-icon">🗓️</div>
            <h3>Your Schedule</h3>
            <p>Pick the dates that work best for you</p>
          </div>
          <div className="custom-feature-card">
            <div className="custom-feature-icon">🦁</div>
            <h3>Expert Guidance</h3>
            <p>Work with our wildlife experts to create the perfect itinerary</p>
          </div>
          <div className="custom-feature-card">
            <div className="custom-feature-icon">🏨</div>
            <h3>Choice of Stays</h3>
            <p>From luxury resorts to eco-friendly camps</p>
          </div>
          <div className="custom-feature-card">
            <div className="custom-feature-icon">🔄</div>
            <h3>Easy Modifications</h3>
            <p>Make changes anytime before final confirmation</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="custom-cta">
        <div className="custom-cta-content">
          <h3>Ready to Design Your Dream Safari?</h3>
          <p>Let our experts create a personalized itinerary just for you</p>
          <div className="custom-cta-buttons">
            <Link href="/contact-us" className="custom-cta-btn primary">
              Start Customizing →
            </Link>
            <Link href="/safari-packages" className="custom-cta-btn secondary">
              Browse Packages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomToursContainer;