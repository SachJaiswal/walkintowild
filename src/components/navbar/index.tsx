// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import "./style.css";

// const navItems = [
//   { label: "Plan Safari", href: "/" },
//   { label: "Safari Packages", href: "/safari-packages" },
//   { label: "Shared Safari", href: "/shared-safari" },
// ];

// const Navbar: React.FC = () => {
//   const pathname = usePathname();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <>
//       <header className="navbar">
//         <div className="navbar-inner">
//           {/* Logo */}
//           <Link href="/" className="navbar-logo">
//             <img src="/logo.png" alt="Walk Into The Wild" />
//             <div className="navbar-logo-text">
//               <span className="logo-name">Walk Into The Wild</span>
//               <span className="logo-sub">Find · Plan · Share Safaris</span>
//             </div>
//           </Link>

//           {/* Center Nav */}
//           <nav className="navbar-links">
//             {navItems.map((item) => (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className={`navbar-link ${pathname === item.href ? "active" : ""}`}
//               >
//                 {item.label}
//               </Link>
//             ))}
//           </nav>

//           {/* Right */}
//           <div className="navbar-actions">
//             <Link href="/login" className="login-btn">
//               Login
//             </Link>
//             <button
//               className={`burger ${menuOpen ? "open" : ""}`}
//               onClick={() => setMenuOpen(!menuOpen)}
//               aria-label="Toggle menu"
//             >
//               <span />
//               <span />
//               <span />
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu */}
//       <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
//         {navItems.map((item) => (
//           <Link
//             key={item.href}
//             href={item.href}
//             className={`mobile-nav-link ${pathname === item.href ? "active" : ""}`}
//             onClick={() => setMenuOpen(false)}
//           >
//             {item.label}
//           </Link>
//         ))}
//         <Link href="/login" className="mobile-login-btn" onClick={() => setMenuOpen(false)}>
//           Login
//         </Link>
//       </div>

//       {menuOpen && (
//         <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />
//       )}
//     </>
//   );
// };

// export default Navbar;

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./style.css";

const navItems = [
  { label: "Plan Safari",      href: "/" },
  { label: "Safari Packages",  href: "/safari-packages" },
  { label: "Shared Safari",    href: "/shared-safari" },
];

const Navbar: React.FC = () => {
  const pathname  = usePathname();
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [scrolled,  setScrolled]  = useState(false);

  /* Scroll detection — frosted glass effect after 20px */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-inner">

          {/* Logo */}
          <Link href="/" className="navbar-logo" onClick={() => setMenuOpen(false)}>
            <img src="/logo.png" alt="Walk Into The Wild" />
            <div className="navbar-logo-text">
              <span className="logo-name">Walk Into The Wild</span>
              <span className="logo-sub">Find · Plan · Share Safaris</span>
            </div>
          </Link>

          {/* Center Nav (desktop) */}
          <nav className="navbar-links" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`navbar-link ${pathname === item.href ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="navbar-actions">
            <Link href="/login" className="login-btn">Login</Link>

            <button
              className={`burger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile dropdown */}
      <nav
        className={`mobile-nav ${menuOpen ? "open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`mobile-nav-link ${pathname === item.href ? "active" : ""}`}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/login"
          className="mobile-login-btn"
          onClick={() => setMenuOpen(false)}
        >
          Login
        </Link>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;