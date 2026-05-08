"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import "./style.css";

const LoginContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Form state
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!emailOrPhone || !password) {
      setError("Please enter email/phone and password");
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // For demo, redirect to home page
      const returnTo = searchParams?.get("returnTo") || "/";
      router.push(returnTo);
    }, 1500);
  };

  // Canvas animation effect for jungle particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // Create fireflies and floating particles
    const particles = Array.from({ length: 100 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.4 + 0.1,
      da: (Math.random() - 0.5) * 0.003,
      color: Math.random() > 0.6 ? "#ffc107" : "#7fd43a"
    }));

    // Add larger glowing particles
    const glowingParticles = Array.from({ length: 20 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 5 + 2,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      alpha: Math.random() * 0.3 + 0.1,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      
      // Draw glowing particles
      glowingParticles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 193, 7, ${p.alpha})`;
        ctx.fill();
        
        // Glow effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 193, 7, ${p.alpha * 0.3})`;
        ctx.fill();
        
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -50) p.x = W + 50;
        if (p.x > W + 50) p.x = -50;
        if (p.y < -50) p.y = H + 50;
        if (p.y > H + 50) p.y = -50;
      });
      
      // Draw small particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        const rgb = p.color === "#ffc107" ? "255,193,7" : "127,212,58";
        ctx.fillStyle = `rgba(${rgb}, ${p.alpha})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.da;
        if (p.alpha <= 0.1 || p.alpha >= 0.5) p.da *= -1;
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;
      });
      
      raf = requestAnimationFrame(draw);
    };
    draw();
    
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="login-page">
      <canvas className="login-canvas" ref={canvasRef} />
      
      {/* Jungle Pattern Overlay */}
      <div className="login-pattern-overlay"></div>
      
      {/* Ambient Jungle Rings */}
      <div className="login-bg-ring login-bg-ring--1"></div>
      <div className="login-bg-ring login-bg-ring--2"></div>
      <div className="login-bg-ring login-bg-ring--3"></div>
      
      {/* Leaf Decorations */}
      <div className="login-leaf login-leaf--1">🌿</div>
      <div className="login-leaf login-leaf--2">🍃</div>
      <div className="login-leaf login-leaf--3">🌱</div>
      <div className="login-leaf login-leaf--4">🌿</div>
      <div className="login-leaf login-leaf--5">🍂</div>

      <div className="login-center">
        <div className="login-card">
          {/* Logo Section */}
          <div className="login-logo">
            <div className="login-logo-icon">🦁</div>
            <div className="login-logo-text">
              <span className="login-logo-main">Wild<span className="login-logo-highlight">Safari</span></span>
              <span className="login-logo-sub">African Expeditions</span>
            </div>
          </div>
          
          <div className="login-divider">
            <span className="login-divider-line"></span>
            <span className="login-divider-icon">✦</span>
            <span className="login-divider-line"></span>
          </div>

          {/* Login Form */}
          <form className="login-form" onSubmit={handleLogin} noValidate>
            <div className="login-form-header">
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">
                Enter your credentials to continue your wild adventure
              </p>
            </div>

            <div className="login-fields">
              <div className={`login-field ${focused === "emailPhone" ? "focused" : ""} ${emailOrPhone ? "filled" : ""}`}>
                <label className="login-label">EMAIL OR PHONE NUMBER</label>
                <div className="login-input-wrap">
                  <span className="login-input-icon">📧</span>
                  <input
                    type="text"
                    className="login-input"
                    placeholder="you@example.com or +91 98765 43210"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    onFocus={() => setFocused("emailPhone")}
                    onBlur={() => setFocused(null)}
                    autoComplete="username"
                    disabled={loading}
                  />
                </div>
                <span className="login-field-line"></span>
              </div>

              <div className={`login-field ${focused === "password" ? "focused" : ""} ${password ? "filled" : ""}`}>
                <label className="login-label">PASSWORD</label>
                <div className="login-input-wrap">
                  <span className="login-input-icon">🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="login-input"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocused("password")}
                    onBlur={() => setFocused(null)}
                    autoComplete="current-password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                <span className="login-field-line"></span>
              </div>
            </div>

            <div className="login-options">
              <label className="login-checkbox">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="/forgot-password" className="login-forgot-link">
                Forgot Password?
              </a>
            </div>

            {error && (
              <div className="login-error">
                <span className="login-error-icon">⚠️</span>
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              className={`login-submit ${loading ? "loading" : ""} ${!emailOrPhone || !password ? "disabled" : ""}`}
              disabled={loading || !emailOrPhone || !password}
            >
              {loading ? (
                <>
                  <div className="login-spinner"></div>
                  <span>LOGGING IN...</span>
                </>
              ) : (
                <>
                  <span>LOGIN TO ACCOUNT</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </>
              )}
            </button>

            <p className="login-switch">
              Don't have an account?{" "}
              <Link href="/create-account" className="login-switch-link">
                Create Account →
              </Link>
            </p>
          </form>
          
          <div className="login-footer">
            <div className="login-social">
              <button className="login-social-btn" onClick={() => router.push("/")}>
                🌐 Continue as Guest
              </button>
            </div>
            <div className="login-demo-credentials">
              <p>Demo Credentials:</p>
              <code>demo@wildsafari.com / demo123</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;