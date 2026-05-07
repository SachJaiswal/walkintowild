"use client";

import React from "react";
import Link from "next/link";
import "./style.css";

// Package Card Component
const PackageCard: React.FC<{ 
  title: string; 
  park: string; 
  price: string;
  duration: string;
  highlights: string[];
  image?: string;
  rating?: number;
}> = ({ title, park, price, duration, highlights, image, rating = 4.5 }) => {
  return (
    <article className="sp-card">
      <div className="sp-media" style={{ backgroundImage: image ? `url(${image})` : undefined }}>
        <div className="sp-park-badge">{park}</div>
        <div className="sp-rating">
          <span className="sp-stars">★</span>
          <span>{rating}</span>
        </div>
      </div>
      <div className="sp-body">
        <h3 className="sp-title">{title}</h3>
        <p className="sp-duration">{duration}</p>
        <div className="sp-highlights">
          {highlights.map((highlight, idx) => (
            <span key={idx} className="sp-highlight-tag">{highlight}</span>
          ))}
        </div>
        <div className="sp-footer">
          <div className="sp-price-section">
            <span className="sp-price-label">Starting from</span>
            <p className="sp-price">{price}</p>
            <span className="sp-price-note">per person</span>
          </div>
          <button className="sp-cta">Book Now</button>
        </div>
      </div>
    </article>
  );
};

// Filter Bar Component
const FilterBar = () => {
  const filters = ["All Packages", "Popular", "Luxury", "Budget", "Family", "Group Safari"];
  const [activeFilter, setActiveFilter] = React.useState("All Packages");

  return (
    <div className="sp-filter-bar">
      <div className="sp-filter-scroll">
        {filters.map((filter) => (
          <button
            key={filter}
            className={`sp-filter-btn ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <div className="sp-sort">
        <select className="sp-sort-select">
          <option>Sort by: Recommended</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Duration: Short to Long</option>
          <option>Rating: High to Low</option>
        </select>
      </div>
    </div>
  );
};

// Safari Packages Container
const SafariPackageContainer: React.FC = () => {
  const packages = [
    {
      title: "Tadoba Explorer",
      park: "Tadoba Tiger Reserve",
      price: "₹ 20,110",
      duration: "3 Nights / 4 Days",
      highlights: ["6 Safaris", "Expert Guide", "Luxury Tent"],
      rating: 4.8,
      image: "/api/placeholder/400/300"
    },
    {
      title: "Bhitarkanika Boat Trip",
      park: "Bhitarkanika Sanctuary",
      price: "₹ 24,750",
      duration: "2 Nights / 3 Days",
      highlights: ["Boat Safari", "Mangroves", "Bird Watching"],
      rating: 4.6,
      image: "/api/placeholder/400/300"
    },
    {
      title: "Pench Family Package",
      park: "Pench Tiger Reserve",
      price: "₹ 18,900",
      duration: "4 Nights / 5 Days",
      highlights: ["Family Friendly", "Jungle Walk", "Bonfire"],
      rating: 4.7,
      image: "/api/placeholder/400/300"
    },
    {
      title: "Kanha Wildlife Expedition",
      park: "Kanha National Park",
      price: "₹ 35,500",
      duration: "5 Nights / 6 Days",
      highlights: ["Barasingha Safari", "Photography Tour", "Local Culture"],
      rating: 4.9,
      image: "/api/placeholder/400/300"
    },
    {
      title: "Ranthambore Heritage Safari",
      park: "Ranthambore Tiger Reserve",
      price: "₹ 28,900",
      duration: "3 Nights / 4 Days",
      highlights: ["Fort Visit", "Tiger Guarantee", "Premium Jeep"],
      rating: 4.8,
      image: "/api/placeholder/400/300"
    },
    {
      title: "Corbett Riverside Retreat",
      park: "Corbett Tiger Reserve",
      price: "₹ 42,000",
      duration: "4 Nights / 5 Days",
      highlights: ["River View", "Elephant Safari", "Bird Sanctuary"],
      rating: 4.9,
      image: "/api/placeholder/400/300"
    }
  ];

  return (
    <div className="sp-container">
      {/* Hero Section */}
      <div className="sp-hero-wrapper">
        <div className="sp-hero-overlay"></div>
        <div className="sp-hero-content">
          <div className="sp-hero-badge">✦ Premium Safari Experiences ✦</div>
          <h1 className="sp-title-main">Safari Packages</h1>
          <p className="sp-lead">
            Immerse yourself in the wild with our expertly curated safari packages. 
            From luxury tented camps to budget-friendly adventures.
          </p>
          <div className="sp-stats">
            <div className="sp-stat">
              <span className="sp-stat-number">50+</span>
              <span className="sp-stat-label">Destinations</span>
            </div>
            <div className="sp-stat">
              <span className="sp-stat-number">10k+</span>
              <span className="sp-stat-label">Happy Travelers</span>
            </div>
            <div className="sp-stat">
              <span className="sp-stat-number">98%</span>
              <span className="sp-stat-label">Satisfaction Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="sp-main">
        <FilterBar />
        
        <div className="sp-grid">
          {packages.map((pkg, idx) => (
            <PackageCard key={idx} {...pkg} />
          ))}
        </div>

        {/* Load More Section */}
        <div className="sp-load-more">
          <button className="sp-load-more-btn">
            Load More Packages
          </button>
        </div>
      </main>

      {/* Why Choose Us Section */}
      <section className="sp-why-us">
        <h2 className="sp-why-title">Why Choose Our Safari Packages?</h2>
        <div className="sp-why-grid">
          <div className="sp-why-card">
            <div className="sp-why-icon">🦁</div>
            <h3>Expert Guides</h3>
            <p>Certified naturalists with years of wildlife experience</p>
          </div>
          <div className="sp-why-card">
            <div className="sp-why-icon">🏕️</div>
            <h3>Premium Accommodation</h3>
            <p>Luxury camps and eco-friendly resorts</p>
          </div>
          <div className="sp-why-card">
            <div className="sp-why-icon">📸</div>
            <h3>Photography Tours</h3>
            <p>Specialized tours for wildlife photographers</p>
          </div>
          <div className="sp-why-card">
            <div className="sp-why-icon">🔄</div>
            <h3>Flexible Booking</h3>
            <p>Easy cancellation and date changes</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SafariPackageContainer;