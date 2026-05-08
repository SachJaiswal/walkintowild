"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./style.css";

// Icons
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconLocation = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconTicket = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M15 5v2" />
    <path d="M15 11v2" />
    <path d="M15 17v2" />
    <path d="M5 5h14a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7a2 2 0 0 1 2-2z" />
  </svg>
);

const IconDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconCancel = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

interface Booking {
  id: string;
  title: string;
  park: string;
  date: string;
  time: string;
  guests: number;
  price: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  image: string;
  bookingId: string;
}

const MyBookingsContainer = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "cancelled">("upcoming");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const bookings: Booking[] = [
    {
      id: "1",
      title: "Tadoba Explorer Safari",
      park: "Tadoba Tiger Reserve",
      date: "2026-06-18",
      time: "06:00 AM",
      guests: 4,
      price: "₹ 20,110",
      status: "confirmed",
      image: "/image.jpg",
      bookingId: "WITW-TAD-001",
    },
    {
      id: "2",
      title: "Kanha Morning Safari",
      park: "Kanha Tiger Reserve",
      date: "2026-06-25",
      time: "05:30 AM",
      guests: 2,
      price: "₹ 18,500",
      status: "confirmed",
      image: "/image.jpg",
      bookingId: "WITW-KAN-002",
    },
    {
      id: "3",
      title: "Ranthambore Evening Safari",
      park: "Ranthambore Tiger Reserve",
      date: "2026-05-15",
      time: "03:30 PM",
      guests: 3,
      price: "₹ 22,800",
      status: "completed",
      image: "/image.jpg",
      bookingId: "WITW-RAN-003",
    },
    {
      id: "4",
      title: "Corbett Riverside Safari",
      park: "Corbett Tiger Reserve",
      date: "2026-04-10",
      time: "06:30 AM",
      guests: 2,
      price: "₹ 28,500",
      status: "completed",
      image: "/image.jpg",
      bookingId: "WITW-COR-004",
    },
    {
      id: "5",
      title: "Pench Jeep Safari",
      park: "Pench Tiger Reserve",
      date: "2026-03-05",
      time: "06:00 AM",
      guests: 4,
      price: "₹ 16,900",
      status: "cancelled",
      image: "/image.jpg",
      bookingId: "WITW-PEN-005",
    },
  ];

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === "upcoming") return booking.status === "confirmed";
    if (activeTab === "past") return booking.status === "completed";
    return booking.status === "cancelled";
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case "confirmed": return "#1c8027";
      case "pending": return "#ff9800";
      case "completed": return "#4a5568";
      case "cancelled": return "#f44336";
      default: return "#666";
    }
  };

  const getStatusBgColor = (status: string) => {
    switch(status) {
      case "confirmed": return "rgba(28, 128, 39, 0.1)";
      case "pending": return "rgba(255, 152, 0, 0.1)";
      case "completed": return "rgba(0, 0, 0, 0.05)";
      case "cancelled": return "rgba(244, 67, 54, 0.1)";
      default: return "rgba(0,0,0,0.05)";
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      console.log("Cancelling booking:", bookingId);
    }
  };

  const handleDownloadTicket = (bookingId: string) => {
    console.log("Downloading ticket for:", bookingId);
  };

  return (
    <div className="bookings-page">
      {/* Hero Section */}
      <div className="bookings-hero">
        <div className="bookings-hero-content">
          <div className="bookings-hero-badge">✦ My Safari Bookings ✦</div>
          <h1 className="bookings-hero-title">Your Safari Adventures</h1>
          <p className="bookings-hero-lead">
            Manage and track all your safari bookings in one place
          </p>
        </div>
      </div>

      <div className="bookings-container">
        {/* Tabs */}
        <div className="bookings-tabs">
          <button
            className={`bookings-tab ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Safaris
          </button>
          <button
            className={`bookings-tab ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
          >
            Past Safaris
          </button>
          <button
            className={`bookings-tab ${activeTab === "cancelled" ? "active" : ""}`}
            onClick={() => setActiveTab("cancelled")}
          >
            Cancelled
          </button>
        </div>

        {/* Bookings List */}
        <div className="bookings-list" ref={sectionRef}>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
              <div
                key={booking.id}
                className="booking-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="booking-card-image">
                  <img src={booking.image} alt={booking.title} />
                  <div
                    className="booking-status"
                    style={{
                      background: getStatusBgColor(booking.status),
                      color: getStatusColor(booking.status),
                    }}
                  >
                    {booking.status.toUpperCase()}
                  </div>
                </div>
                <div className="booking-card-content">
                  <div className="booking-card-header">
                    <div>
                      <h3 className="booking-title">{booking.title}</h3>
                      <p className="booking-park">{booking.park}</p>
                    </div>
                    <div className="booking-price">{booking.price}</div>
                  </div>

                  <div className="booking-details">
                    <div className="booking-detail">
                      <IconCalendar />
                      <span>{new Date(booking.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}</span>
                    </div>
                    <div className="booking-detail">
                      <IconClock />
                      <span>{booking.time}</span>
                    </div>
                    <div className="booking-detail">
                      <IconLocation />
                      <span>{booking.park}</span>
                    </div>
                    <div className="booking-detail">
                      <IconUsers />
                      <span>{booking.guests} Guests</span>
                    </div>
                  </div>

                  <div className="booking-meta">
                    <div className="booking-id">
                      <IconTicket />
                      <span>Booking ID: {booking.bookingId}</span>
                    </div>
                  </div>

                  <div className="booking-actions">
                    {booking.status === "confirmed" && (
                      <>
                        <button
                          className="booking-btn secondary"
                          onClick={() => handleDownloadTicket(booking.id)}
                        >
                          <IconDownload />
                          Download Ticket
                        </button>
                        <button
                          className="booking-btn danger"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          <IconCancel />
                          Cancel Booking
                        </button>
                      </>
                    )}
                    {booking.status === "completed" && (
                      <button
                        className="booking-btn primary"
                        onClick={() => window.location.href = `/safari-packages?review=${booking.id}`}
                      >
                        Write a Review
                      </button>
                    )}
                    {booking.status === "cancelled" && (
                      <button
                        className="booking-btn secondary"
                        onClick={() => window.location.href = "/safari-packages"}
                      >
                        Book Again
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bookings-empty">
              <div className="bookings-empty-icon">🦁</div>
              <h3>No {activeTab} bookings found</h3>
              <p>Start planning your next safari adventure!</p>
              <Link href="/safari-packages" className="bookings-empty-btn">
                Browse Safaris →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyBookingsContainer;