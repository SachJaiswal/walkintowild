"use client";

import React, { useState } from "react";
import "./style.css";

// Shared Safari Card Component
const SharedCard: React.FC<{ 
  title: string; 
  park: string;
  date: string; 
  time: string;
  seats: number;
  price: string;
  guide: string;
  meetingPoint: string;
  image?: string;
  layout?: "grid" | "list";
}> = ({ title, park, date, time, seats, price, guide, meetingPoint, image, layout = "list" }) => {
  const [isJoining, setIsJoining] = useState(false);

  const handleJoin = () => {
    setIsJoining(true);
    setTimeout(() => {
      alert(`You've joined ${title}! Check your email for confirmation.`);
      setIsJoining(false);
    }, 1000);
  };

  const getSeatStatus = (seats: number) => {
    if (seats <= 2) return { text: "Limited Seats!", color: "#f44336" };
    if (seats <= 4) return { text: "Filling Fast", color: "#ff9800" };
    return { text: "Available", color: "#4caf50" };
  };

  const seatStatus = getSeatStatus(seats);

  if (layout === "grid") {
    return (
      <article className="sh-card-grid">
        <div className="sh-card-image-grid">
          <img src={image || "/api/placeholder/400/250"} alt={park} />
          <div className="sh-card-badge">{park}</div>
        </div>
        <div className="sh-card-content-grid">
          <h3 className="sh-title-grid">{title}</h3>
          <div className="sh-details-grid">
            <div className="sh-detail-item-grid">
              <span className="sh-detail-icon">📅</span>
              <span>{date}</span>
            </div>
            <div className="sh-detail-item-grid">
              <span className="sh-detail-icon">⏰</span>
              <span>{time}</span>
            </div>
            <div className="sh-detail-item-grid">
              <span className="sh-detail-icon">📍</span>
              <span>{meetingPoint}</span>
            </div>
            <div className="sh-detail-item-grid">
              <span className="sh-detail-icon">🦁</span>
              <span>{guide}</span>
            </div>
          </div>
          <div className="sh-footer-grid">
            <div className="sh-price-grid">
              <span className="sh-price-label">Per Person</span>
              <p className="sh-price-value">{price}</p>
            </div>
            <div className="sh-seats-grid">
              <div className="sh-seats-info">
                <span className="sh-seats-count">{seats}</span>
                <span className="sh-seats-label">Seats Left</span>
              </div>
              <span className="sh-seats-status" style={{ background: seatStatus.color }}>
                {seatStatus.text}
              </span>
            </div>
            <button 
              className={`sh-join-grid ${isJoining ? "joining" : ""}`} 
              onClick={handleJoin}
              disabled={isJoining || seats === 0}
            >
              {isJoining ? "Joining..." : seats === 0 ? "Full" : "Join"}
            </button>
          </div>
        </div>
      </article>
    );
  }

  // List layout (original)
  return (
    <article className="sh-card">
      <div className="sh-card-left">
        {image && (
          <div className="sh-card-image">
            <img src={image} alt={park} />
          </div>
        )}
        <div className="sh-card-content">
          <div className="sh-card-header">
            <h3 className="sh-title">{title}</h3>
            <span className="sh-park-badge">{park}</span>
          </div>
          <div className="sh-details">
            <div className="sh-detail-item">
              <span className="sh-detail-icon">📅</span>
              <span>{date}</span>
            </div>
            <div className="sh-detail-item">
              <span className="sh-detail-icon">⏰</span>
              <span>{time}</span>
            </div>
            <div className="sh-detail-item">
              <span className="sh-detail-icon">📍</span>
              <span>{meetingPoint}</span>
            </div>
            <div className="sh-detail-item">
              <span className="sh-detail-icon">🦁</span>
              <span>Guide: {guide}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="sh-card-right">
        <div className="sh-price-section">
          <span className="sh-price-label">Per Person</span>
          <p className="sh-price">{price}</p>
        </div>
        <div className="sh-seats">
          <span className="sh-seats-count">{seats}</span>
          <span className="sh-seats-label">Seats Left</span>
          <span className="sh-seats-status" style={{ background: seatStatus.color }}>
            {seatStatus.text}
          </span>
        </div>
        <button 
          className={`sh-join ${isJoining ? "joining" : ""}`} 
          onClick={handleJoin}
          disabled={isJoining || seats === 0}
        >
          {isJoining ? "Joining..." : seats === 0 ? "Fully Booked" : "Join Safari"}
        </button>
      </div>
    </article>
  );
};

// View Controls Component
const ViewControls = ({ 
  layout, 
  setLayout, 
  cardSize, 
  setCardSize,
  sortBy,
  setSortBy 
}: { 
  layout: "grid" | "list";
  setLayout: (layout: "grid" | "list") => void;
  cardSize: "small" | "medium" | "large";
  setCardSize: (size: "small" | "medium" | "large") => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}) => {
  return (
    <div className="sh-view-controls">
      <div className="sh-control-group">
        <span className="sh-control-label">Layout:</span>
        <div className="sh-layout-buttons">
          <button 
            className={`sh-layout-btn ${layout === "grid" ? "active" : ""}`}
            onClick={() => setLayout("grid")}
            title="Grid View"
          >
            ⊞
          </button>
          <button 
            className={`sh-layout-btn ${layout === "list" ? "active" : ""}`}
            onClick={() => setLayout("list")}
            title="List View"
          >
            ☰
          </button>
        </div>
      </div>

      <div className="sh-control-group">
        <span className="sh-control-label">Card Size:</span>
        <div className="sh-size-buttons">
          <button 
            className={`sh-size-btn ${cardSize === "small" ? "active" : ""}`}
            onClick={() => setCardSize("small")}
            title="Small"
          >
            S
          </button>
          <button 
            className={`sh-size-btn ${cardSize === "medium" ? "active" : ""}`}
            onClick={() => setCardSize("medium")}
            title="Medium"
          >
            M
          </button>
          <button 
            className={`sh-size-btn ${cardSize === "large" ? "active" : ""}`}
            onClick={() => setCardSize("large")}
            title="Large"
          >
            L
          </button>
        </div>
      </div>

      <div className="sh-control-group">
        <span className="sh-control-label">Sort by:</span>
        <select className="sh-sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date-asc">Date (Earliest First)</option>
          <option value="date-desc">Date (Latest First)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="seats-asc">Seats (Least Available)</option>
          <option value="seats-desc">Seats (Most Available)</option>
        </select>
      </div>
    </div>
  );
};

// Create Shared Safari Modal (same as before)
const CreateSharedModal = ({ isOpen, onClose, onCreate }: { 
  isOpen: boolean; 
  onClose: () => void; 
  onCreate: (data: any) => void;
}) => {
  const [formData, setFormData] = useState({
    title: "",
    park: "",
    date: "",
    time: "",
    seats: 4,
    price: "",
    guide: "",
    meetingPoint: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    setFormData({
      title: "",
      park: "",
      date: "",
      time: "",
      seats: 4,
      price: "",
      guide: "",
      meetingPoint: ""
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="sh-modal-overlay" onClick={onClose}>
      <div className="sh-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sh-modal-header">
          <h3>Create Shared Safari</h3>
          <button onClick={onClose} className="sh-modal-close">✕</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="sh-modal-body">
            <div className="sh-form-group">
              <label>Safari Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="e.g., Morning Tiger Safari"
              />
            </div>
            <div className="sh-form-group">
              <label>Park / Reserve</label>
              <select
                value={formData.park}
                onChange={(e) => setFormData({ ...formData, park: e.target.value })}
                required
              >
                <option value="">Select Park</option>
                <option value="Corbett Tiger Reserve">Corbett Tiger Reserve</option>
                <option value="Ranthambore Tiger Reserve">Ranthambore Tiger Reserve</option>
                <option value="Kanha Tiger Reserve">Kanha Tiger Reserve</option>
                <option value="Pench Tiger Reserve">Pench Tiger Reserve</option>
                <option value="Tadoba Tiger Reserve">Tadoba Tiger Reserve</option>
                <option value="Bandhavgarh Tiger Reserve">Bandhavgarh Tiger Reserve</option>
              </select>
            </div>
            <div className="sh-form-row">
              <div className="sh-form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>
              <div className="sh-form-group">
                <label>Time</label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="sh-form-row">
              <div className="sh-form-group">
                <label>Seats Available</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={formData.seats}
                  onChange={(e) => setFormData({ ...formData, seats: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="sh-form-group">
                <label>Price (₹)</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                  placeholder="e.g., ₹ 5,500"
                />
              </div>
            </div>
            <div className="sh-form-group">
              <label>Guide / Naturalist</label>
              <input
                type="text"
                value={formData.guide}
                onChange={(e) => setFormData({ ...formData, guide: e.target.value })}
                required
                placeholder="Guide name"
              />
            </div>
            <div className="sh-form-group">
              <label>Meeting Point</label>
              <input
                type="text"
                value={formData.meetingPoint}
                onChange={(e) => setFormData({ ...formData, meetingPoint: e.target.value })}
                required
                placeholder="Hotel lobby / Resort / Safari gate"
              />
            </div>
          </div>
          <div className="sh-modal-footer">
            <button type="button" onClick={onClose} className="sh-btn-secondary">Cancel</button>
            <button type="submit" className="sh-btn-primary">Create Safari</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Filter Section
const FilterSection = ({ onFilterChange }: { onFilterChange: (filter: string) => void }) => {
  const parks = ["All Parks", "Corbett", "Ranthambore", "Kanha", "Pench", "Tadoba", "Bandhavgarh"];
  const [activePark, setActivePark] = useState("All Parks");

  const handleParkClick = (park: string) => {
    setActivePark(park);
    onFilterChange(park);
  };

  return (
    <div className="sh-filter-bar">
      <div className="sh-filter-scroll">
        {parks.map((park) => (
          <button
            key={park}
            className={`sh-filter-btn ${activePark === park ? "active" : ""}`}
            onClick={() => handleParkClick(park)}
          >
            {park}
          </button>
        ))}
      </div>
    </div>
  );
};

// Main Shared Safari Container
const SharedSafariContainer: React.FC = () => {
  const [layout, setLayout] = useState<"grid" | "list">("list");
  const [cardSize, setCardSize] = useState<"small" | "medium" | "large">("medium");
  const [sortBy, setSortBy] = useState("date-asc");
  
  const [sharedSafaris, setSharedSafaris] = useState([
    {
      title: "Kanha Morning Safari",
      park: "Kanha Tiger Reserve",
      date: "2026-06-18",
      time: "06:00 AM",
      seats: 4,
      price: "₹ 4,500",
      guide: "Ramesh Singh",
      meetingPoint: "Kanha Resort Lobby",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Ranthambore Evening Safari",
      park: "Ranthambore Tiger Reserve",
      date: "2026-06-21",
      time: "03:30 PM",
      seats: 2,
      price: "₹ 5,200",
      guide: "Vikram Rathore",
      meetingPoint: "Ranthambore Gate",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Corbett Special Safari",
      park: "Corbett Tiger Reserve",
      date: "2026-06-25",
      time: "05:45 AM",
      seats: 6,
      price: "₹ 3,800",
      guide: "Rajendra Bhandari",
      meetingPoint: "Corbett Riverside Hotel",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Pench Backwater Safari",
      park: "Pench Tiger Reserve",
      date: "2026-06-28",
      time: "07:00 AM",
      seats: 3,
      price: "₹ 4,200",
      guide: "Sanjay Telang",
      meetingPoint: "Pench Safari Gate",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Tadoba Lake Safari",
      park: "Tadoba Tiger Reserve",
      date: "2026-07-02",
      time: "06:30 AM",
      seats: 1,
      price: "₹ 4,800",
      guide: "Mohan Khobragade",
      meetingPoint: "Tadoba Resort",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Bandhavgarh Fort Safari",
      park: "Bandhavgarh Tiger Reserve",
      date: "2026-07-05",
      time: "05:30 AM",
      seats: 5,
      price: "₹ 4,900",
      guide: "Dinesh Sharma",
      meetingPoint: "Bandhavgarh Entrance",
      image: "/api/placeholder/400/250"
    }
  ]);

  const [filteredSafaris, setFilteredSafaris] = useState(sharedSafaris);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterChange = (park: string) => {
    if (park === "All Parks") {
      setFilteredSafaris(sharedSafaris);
    } else {
      setFilteredSafaris(sharedSafaris.filter(s => s.park.includes(park)));
    }
  };

  const handleCreateSafari = (newSafari: any) => {
    const updatedSafaris = [...sharedSafaris, { ...newSafari, image: "/api/placeholder/400/250" }];
    setSharedSafaris(updatedSafaris);
    setFilteredSafaris(updatedSafaris);
  };

  // Sort function
  const getSortedSafaris = () => {
    const sorted = [...filteredSafaris];
    switch(sortBy) {
      case "date-asc":
        return sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case "date-desc":
        return sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case "price-asc":
        return sorted.sort((a, b) => parseInt(a.price.replace(/[^0-9]/g, '')) - parseInt(b.price.replace(/[^0-9]/g, '')));
      case "price-desc":
        return sorted.sort((a, b) => parseInt(b.price.replace(/[^0-9]/g, '')) - parseInt(a.price.replace(/[^0-9]/g, '')));
      case "seats-asc":
        return sorted.sort((a, b) => a.seats - b.seats);
      case "seats-desc":
        return sorted.sort((a, b) => b.seats - a.seats);
      default:
        return sorted;
    }
  };

  const sortedSafaris = getSortedSafaris();

  // Get card size class
  const getCardSizeClass = () => {
    switch(cardSize) {
      case "small": return "sh-card-size-small";
      case "large": return "sh-card-size-large";
      default: return "sh-card-size-medium";
    }
  };

  return (
    <div className="sh-container">
      {/* Hero Section */}
      <div className="sh-hero-wrapper">
        <div className="sh-hero-overlay"></div>
        <div className="sh-hero-content">
          <div className="sh-hero-badge">✦ Group Safari Experiences ✦</div>
          <h1 className="sh-title-main">Shared Safaris</h1>
          <p className="sh-lead">
            Join scheduled shared departures to save costs and meet fellow wildlife enthusiasts.
            Perfect for solo travelers and small groups!
          </p>
          <div className="sh-hero-actions">
            <button className="sh-hero-btn primary" onClick={() => setIsModalOpen(true)}>
              + Create Shared Safari
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="sh-stats">
        <div className="sh-stat-item">
          <span className="sh-stat-number">150+</span>
          <span className="sh-stat-label">Upcoming Safaris</span>
        </div>
        <div className="sh-stat-item">
          <span className="sh-stat-number">2,500+</span>
          <span className="sh-stat-label">Travelers Joined</span>
        </div>
        <div className="sh-stat-item">
          <span className="sh-stat-number">₹ 2,500</span>
          <span className="sh-stat-label">Avg Savings</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="sh-main">
        <div className="sh-controls-bar">
          <FilterSection onFilterChange={handleFilterChange} />
          <ViewControls 
            layout={layout}
            setLayout={setLayout}
            cardSize={cardSize}
            setCardSize={setCardSize}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        <div className={`sh-list ${layout} ${getCardSizeClass()}`}>
          {sortedSafaris.length > 0 ? (
            sortedSafaris.map((safari, idx) => (
              <SharedCard key={idx} {...safari} layout={layout} />
            ))
          ) : (
            <div className="sh-empty">
              <div className="sh-empty-icon">🦁</div>
              <h3>No shared safaris found</h3>
              <p>Try adjusting your filters or create a new shared safari</p>
              <button className="sh-empty-btn" onClick={() => setIsModalOpen(true)}>
                Create Shared Safari
              </button>
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="sh-tips">
          <h3>💡 Tips for Shared Safaris</h3>
          <div className="sh-tips-grid">
            <div className="sh-tip">
              <span className="sh-tip-icon">👥</span>
              <p>Join groups of 4-6 people for best social experience</p>
            </div>
            <div className="sh-tip">
              <span className="sh-tip-icon">💰</span>
              <p>Save up to 40% compared to private safaris</p>
            </div>
            <div className="sh-tip">
              <span className="sh-tip-icon">📸</span>
              <p>Meet photography enthusiasts and learn together</p>
            </div>
            <div className="sh-tip">
              <span className="sh-tip-icon">🕐</span>
              <p>Book early to secure your spot, especially in peak season</p>
            </div>
          </div>
        </div>
      </main>

      {/* Create Modal */}
      <CreateSharedModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateSafari}
      />
    </div>
  );
};

export default SharedSafariContainer;