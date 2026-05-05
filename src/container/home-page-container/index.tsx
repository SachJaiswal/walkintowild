"use client";

import React from "react";
import "./style.css";

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-overlay">
        <div className="hero-content">
          <p className="hero-eyebrow">Find, plan and share Safaris</p>
          <h1 className="hero-title">
            Your Ultimate Portal to the <span className="hero-highlight">Wild</span>
          </h1>
          <p className="hero-subtitle">
            Discover safari packages, join shared safaris, and explore India’s best parks—built for wildlife enthusiasts.
          </p>

          <div className="hero-search" role="search" aria-label="Safari search">
            <div className="search-grid">
              <label className="search-field">
                <span className="search-label">Select Park</span>
                <select className="search-control" defaultValue="">
                  <option value="" disabled>All / Any</option>
                  <option value="corbett">Corbett Tiger Reserve</option>
                  <option value="ranthambore">Ranthambore Tiger Reserve</option>
                  <option value="kanha">Kanha Tiger Reserve</option>
                  <option value="tadoba">Tadoba-Andhari Tiger Reserve</option>
                </select>
              </label>

              <label className="search-field">
                <span className="search-label">Location</span>
                <input className="search-control" placeholder="All / Any" />
              </label>

              <div className="search-or" aria-hidden="true">OR</div>

              <label className="search-field">
                <span className="search-label">Animal</span>
                <input className="search-control" placeholder="Animal" />
              </label>

              <label className="search-field">
                <span className="search-label">Vehicle</span>
                <select className="search-control" defaultValue="">
                  <option value="" disabled>All / Any</option>
                  <option value="jeep">Jeep Safari</option>
                  <option value="canter">Canter</option>
                  <option value="boat">Boat Safari</option>
                </select>
              </label>

              <button className="search-btn" type="button">Search</button>
            </div>
          </div>

          <div className="hero-actions">
            <button className="btn-primary" type="button">Plan Safari</button>
            <button className="btn-secondary" type="button">Safari Packages</button>
            <button className="btn-tertiary" type="button">Shared Safari</button>
          </div>
        </div>
      </div>
    </section>
  );
};

type Deal = {
  id: number;
  title: string;
  park: string;
  nights: string;
  highlight: string;
  price: string;
  tag?: string;
};

const SectionHeader = ({ title, subtitle, rightAction }: { title: string; subtitle?: string; rightAction?: React.ReactNode }) => (
  <div className="section-head">
    <div>
      <h2 className="section-title">{title}</h2>
      {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
    </div>
    {rightAction ? <div className="section-action">{rightAction}</div> : null}
  </div>
);

// Discover + deals (structure-first)
const DiscoverSection = () => {
  const deals: Deal[] = [
    {
      id: 1,
      title: "Wildlife pitstop. - Kanha",
      park: "Kanha Tiger Reserve",
      nights: "1 Nights, 2 Days",
      highlight: "1 Private Safari",
      price: "₹ 20,110 /Person",
    },
    {
      id: 2,
      title: "Creeks & Crocodiles - Bhitarkanika",
      park: "Bhitarkanika National Park",
      nights: "2 Nights, 3 Days",
      highlight: "Boat Safari",
      price: "₹ 24,750 /Person",
      tag: "Best Deal",
    },
    {
      id: 3,
      title: "Mangrove Majesty - Bhitarkanika",
      park: "Bhitarkanika National Park",
      nights: "3 Nights, 4 Days",
      highlight: "Boat Safari",
      price: "₹ 38,750 /Person",
      tag: "Best Deal",
    },
  ];

  return (
    <section className="discover-section">
      <div className="container">
        <SectionHeader
          title="Discover and Join Shared Safaris"
          subtitle="Find the best options and connect with fellow wildlife lovers."
          rightAction={<button className="link-btn" type="button">View All</button>}
        />

        <div className="deal-grid">
          {deals.map((d) => (
            <article key={d.id} className="deal-card">
              <div className="deal-media" aria-hidden="true">
                {d.tag ? <span className="deal-tag">{d.tag}</span> : null}
              </div>
              <div className="deal-body">
                <h3 className="deal-title">{d.title}</h3>
                <p className="deal-park">{d.park}</p>

                <div className="deal-meta">
                  <div className="meta-chip">
                    <span className="meta-k">Package Highlight</span>
                    <span className="meta-v">{d.nights}</span>
                  </div>
                  <div className="meta-chip">
                    <span className="meta-k">Package Highlight</span>
                    <span className="meta-v">{d.highlight}</span>
                  </div>
                </div>

                <div className="deal-bottom">
                  <div>
                    <p className="deal-price">{d.price}</p>
                    <p className="deal-note">Include taxes and fees</p>
                  </div>
                  <button className="card-btn" type="button">View Details</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const TopParksSection = () => {
  const parks = [
    {
      title: "Corbett Tiger Reserve",
      desc:
        "India’s oldest national park, known for rich biodiversity and iconic riverine landscapes.",
    },
    {
      title: "Ranthambore Tiger Reserve",
      desc:
        "A pinnacle of Indian wildlife with dramatic landscapes and memorable tiger sightings.",
    },
    {
      title: "Pench Tiger Reserve - Madhya Pradesh",
      desc:
        "Teak forests and the Pench river—famous for diverse wildlife and jungle-book vibes.",
    },
    {
      title: "Jhalana Leopard Reserve",
      desc:
        "An urban sanctuary model with frequent leopard sightings and quick city access.",
    },
    {
      title: "Tadoba-Andhari Tiger Reserve",
      desc:
        "High tiger density, bamboo thickets, and lakes—one of India’s top safari hotspots.",
    },
    { title: "Kanha Tiger Reserve", desc: "One of India’s finest tiger reserves with vast meadows and sal forests." },
  ];
  return (
    <section className="top-parks-section">
      <div className="container">
        <SectionHeader title="The Best of Wildlife" subtitle="Top Safari Parks" rightAction={<button className="link-btn" type="button">View All</button>} />
        <div className="parks-grid">
          {parks.map((p) => (
            <article key={p.title} className="park-card">
              <div className="park-icon" aria-hidden="true">🏞️</div>
              <h3 className="park-title">{p.title}</h3>
              <p className="park-desc">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const RareSafarisSection = () => {
  const animals = [
    { name: "Snow Leopard", note: "Elusive big cat of the Himalayas" },
    { name: "Himalayan Brown Bear", note: "A powerful mammal of rugged cold terrain" },
    { name: "Gee’s Golden Langur", note: "Rare primate with striking golden fur" },
    { name: "Lion-tailed Macaque", note: "Endangered primate of the Western Ghats" },
    { name: "Malabar Giant Squirrel", note: "Colorful arboreal seed disperser" },
    { name: "Red Panda", note: "Bamboo lover from the eastern Himalayas" },
  ];
  return (
    <section className="rare-section">
      <div className="container">
        <SectionHeader title="Rare and Exotic" subtitle="Animal Safaris" rightAction={<button className="link-btn" type="button">View All</button>} />
        <div className="animal-grid">
          {animals.map((a) => (
            <article className="animal-card" key={a.name}>
              <div className="animal-badge" aria-hidden="true">🐾</div>
              <h3 className="animal-title">{a.name}</h3>
              <p className="animal-note">{a.note}</p>
              <button className="ghost-btn" type="button">Know More</button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Plan your next safari, smarter.</h2>
          <p className="cta-text">
            Start with packages, or join a shared safari to cut costs and meet fellow enthusiasts.
          </p>
          <div className="cta-actions">
            <button className="cta-btn" type="button">Plan Safari</button>
            <button className="cta-btn secondary" type="button">Contact Us</button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Container Component
const HomePageContainer = () => {
  return (
    <div className="home-container">
      <main className="main-content">
        <HeroSection />
        <DiscoverSection />
        <TopParksSection />
        <RareSafarisSection />
        <CTASection />
      </main>
    </div>
  );
};

export default HomePageContainer;