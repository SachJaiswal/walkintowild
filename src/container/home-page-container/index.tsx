
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import * as THREE from "three";
import "./style.css";

// Three.js Background Component
const ThreeBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Setup Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1a0f);
    scene.fog = new THREE.FogExp2(0x0a1a0f, 0.008);

    // Setup Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 12);
    camera.lookAt(0, 0, 0);

    // Setup Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Create Particles (Fireflies/Stars)
    const particleCount = 1500;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesPositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlesPositions[i * 3] = (Math.random() - 0.5) * 200;
      particlesPositions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      particlesPositions[i * 3 + 2] = (Math.random() - 0.5) * 80 - 30;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlesPositions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffc107,
      size: 0.08,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create Floating Leaves/Petals
    const leafCount = 300;
    const leafGeometry = new THREE.BufferGeometry();
    const leafPositions = new Float32Array(leafCount * 3);

    for (let i = 0; i < leafCount; i++) {
      leafPositions[i * 3] = (Math.random() - 0.5) * 40;
      leafPositions[i * 3 + 1] = Math.random() * 15;
      leafPositions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 15;
    }

    leafGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(leafPositions, 3)
    );

    const leafMaterial = new THREE.PointsMaterial({
      color: 0x7fd43a,
      size: 0.05,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const leafMesh = new THREE.Points(leafGeometry, leafMaterial);
    scene.add(leafMesh);

    // Create Ambient Light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Create Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 2, 1);
    scene.add(directionalLight);

    // Create a subtle sphere glow
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xffc107,
      transparent: true,
      opacity: 0.03,
      wireframe: true,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, -1, -5);
    scene.add(sphere);

    // Animation variables
    let time = 0;

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.005;

      // Rotate particles
      particlesMesh.rotation.y = time * 0.1;
      particlesMesh.rotation.x = Math.sin(time * 0.2) * 0.1;

      // Float leaves
      leafMesh.rotation.y = time * 0.05;
      leafMesh.rotation.x = Math.sin(time * 0.15) * 0.05;

      // Pulsing sphere
      const scale = 1 + Math.sin(time * 0.5) * 0.05;
      sphere.scale.set(scale, scale, scale);

      // Camera slight movement
      camera.position.x = Math.sin(time * 0.1) * 0.2;
      camera.position.y = 2 + Math.sin(time * 0.2) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="three-background" />;
};

// Hero Section Component
const HeroSection = () => {
  const [searchParams, setSearchParams] = useState({
    park: "",
    location: "",
    animal: "",
    vehicle: "",
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSearch = () => {
    console.log("Searching with params:", searchParams);
  };

  return (
    <section className="hero-section">
      <ThreeBackground />
      <div className="hero-overlay">
        <div className={`hero-content ${isVisible ? "visible" : ""}`}>
          <p className="hero-eyebrow">✦ Find, plan and share Safaris ✦</p>
          <h1 className="hero-title">
            Your Ultimate Portal to the <span className="hero-highlight">Wild</span>
          </h1>
          <p className="hero-subtitle">
            Discover safari packages, join shared safaris, and explore India's best parks—built for wildlife enthusiasts.
          </p>

          <div className="hero-search" role="search" aria-label="Safari search">
            <div className="search-grid">
              <div className="search-field">
                <label className="search-label">SELECT PARK</label>
                <select
                  className="search-control"
                  value={searchParams.park}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, park: e.target.value })
                  }
                >
                  <option value="">All / Any</option>
                  <option value="corbett">Corbett Tiger Reserve</option>
                  <option value="ranthambore">Ranthambore Tiger Reserve</option>
                  <option value="kanha">Kanha Tiger Reserve</option>
                  <option value="tadoba">Tadoba-Andhari Tiger Reserve</option>
                </select>
              </div>

              <div className="search-field">
                <label className="search-label">LOCATION</label>
                <input
                  type="text"
                  className="search-control"
                  placeholder="All / Any"
                  value={searchParams.location}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, location: e.target.value })
                  }
                />
              </div>

              <div className="search-or" aria-hidden="true">
                OR
              </div>

              <div className="search-field">
                <label className="search-label">ANIMAL</label>
                <input
                  type="text"
                  className="search-control"
                  placeholder="Animal"
                  value={searchParams.animal}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, animal: e.target.value })
                  }
                />
              </div>

              <div className="search-field">
                <label className="search-label">VEHICLE</label>
                <select
                  className="search-control"
                  value={searchParams.vehicle}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, vehicle: e.target.value })
                  }
                >
                  <option value="">All / Any</option>
                  <option value="jeep">Jeep Safari</option>
                  <option value="canter">Canter</option>
                  <option value="boat">Boat Safari</option>
                </select>
              </div>

              <button className="search-btn" type="button" onClick={handleSearch}>
                SEARCH
              </button>
            </div>
          </div>

          <div className="hero-actions">
            <Link href="/custom-tours" className="btn-primary">
              PLAN SAFARI
            </Link>
            <Link href="/safari-packages" className="btn-secondary">
              SAFARI PACKAGES
            </Link>
            <Link href="/shared-safari" className="btn-tertiary">
              SHARED SAFARI
            </Link>
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

const SectionHeader = ({
  title,
  subtitle,
  rightAction,
}: {
  title: string;
  subtitle?: string;
  rightAction?: React.ReactNode;
}) => {
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

  return (
    <div ref={sectionRef} className={`section-head ${isVisible ? "visible" : ""}`}>
      <div>
        <h2 className="section-title">{title}</h2>
        {subtitle ? <p className="section-subtitle">{subtitle}</p> : null}
      </div>
      {rightAction ? <div className="section-action">{rightAction}</div> : null}
    </div>
  );
};

// Discover + deals section
// const DiscoverSection = () => {
//   const deals: Deal[] = [
//     {
//       id: 1,
//       title: "Wildlife Marathon - Kanha",
//       park: "Kanha Tiger Reserve",
//       nights: "4 Nights, 5 Days",
//       highlight: "6 Private Safari",
//       price: "₹ 1,03,640 /Person",
//       tag: "Popular",
//     },
//     {
//       id: 2,
//       title: "Dhikala Dry Season",
//       park: "Corbett Tiger Reserve",
//       nights: "4 Nights, 5 Days",
//       highlight: "Seat 1",
//       price: "From ₹ 28,500 /Person",
//       tag: "May 22",
//     },
//     {
//       id: 3,
//       title: "Sunset Safari",
//       park: "Bandhavgarh Tiger Reserve",
//       nights: "3 Nights, 3 Days",
//       highlight: "Seats 5",
//       price: "From ₹ 42,900 /Person",
//       tag: "Jun 22",
//     },
//   ];

//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section ref={sectionRef} className={`discover-section ${isVisible ? "visible" : ""}`}>
//       <div className="container">
//         <SectionHeader
//           title="Discover and Join Shared Safaris"
//           subtitle="Find the best options and connect with fellow wildlife lovers."
//           rightAction={
//             <Link href="/shared-safari" className="link-btn">
//               View All →
//             </Link>
//           }
//         />

//         <div className="discover-layout">
//           <div className="discover-left">
//             <img src="/image.webp" alt="Safari" />
//           </div>
//           <div className="discover-right">
//             <div className="deal-grid">
//               {deals.map((d, idx) => (
//                 <Card
//                   key={d.id}
//                   title={d.title}
//                   park={d.park}
//                   nights={d.nights}
//                   highlight={d.highlight}
//                   price={d.price}
//                   tag={d.tag}
//                   date={d.tag}
//                   seats={idx === 0 ? 6 : idx === 1 ? 1 : 5}
//                   avatars={["/logo.png", "/image.webp", "/logo.png", "/image.webp"]}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// Discover + deals section
const DiscoverSection = () => {
  const deals: Deal[] = [
    {
      id: 1,
      title: "Wildlife Marathon - Kanha",
      park: "Kanha Tiger Reserve",
      nights: "4 Nights, 5 Days",
      highlight: "6 Private Safari",
      price: "₹ 1,03,640",
      tag: "Popular",
    },
    {
      id: 2,
      title: "Dhikala Dry Season",
      park: "Corbett Tiger Reserve",
      nights: "4 Nights, 5 Days",
      highlight: "Seat 1",
      price: "₹ 28,500",
      tag: "May 22",
    },
    {
      id: 3,
      title: "Sunset Safari",
      park: "Bandhavgarh Tiger Reserve",
      nights: "3 Nights, 3 Days",
      highlight: "Seats 5",
      price: "₹ 42,900",
      tag: "Jun 22",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} className={`discover-section ${isVisible ? "visible" : ""}`}>
      <div className="container">
        <SectionHeader
          title="Discover and Join Shared Safaris"
          subtitle="Find the best options and connect with fellow wildlife lovers."
          rightAction={
            <Link href="/shared-safari" className="link-btn">
              View All →
            </Link>
          }
        />

        <div className="discover-layout">
          <div className="discover-left">
            <div className="discover-image-wrapper">
              <img src="/image.jpg" alt="Safari Adventure" />
              <div className="discover-image-overlay">
                <div className="discover-image-content">
                  <h3>Join Shared Safaris</h3>
                  <p>Connect with fellow wildlife enthusiasts</p>
                  <Link href="/shared-safari" className="discover-image-btn">
                    Explore Now →
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="discover-right">
            <div className="deal-grid">
              {deals.map((d, idx) => (
                <div key={d.id} className="deal-card-wrapper">
                  <div className="deal-card-badge">{d.tag}</div>
                  <div className="deal-card-content">
                    <div className="deal-card-header">
                      <h3 className="deal-card-title">{d.title}</h3>
                      <p className="deal-card-park">{d.park}</p>
                    </div>
                    <div className="deal-card-details">
                      <div className="deal-detail">
                        <span className="deal-detail-icon">📅</span>
                        <span className="deal-detail-text">{d.nights}</span>
                      </div>
                      <div className="deal-detail">
                        <span className="deal-detail-icon">🚙</span>
                        <span className="deal-detail-text">{d.highlight}</span>
                      </div>
                    </div>
                    <div className="deal-card-footer">
                      <div className="deal-price-info">
                        <span className="deal-price-label">Starting from</span>
                        <p className="deal-price">{d.price}</p>
                        <span className="deal-price-note">per person</span>
                      </div>
                      <div className="deal-seats-info">
                        <div className="deal-seats">
                          <span className="deal-seats-count">
                            {idx === 0 ? 6 : idx === 1 ? 1 : 5}
                          </span>
                          <span className="deal-seats-label">Seats left</span>
                        </div>
                        <div className="deal-avatars">
                          {idx === 0 && (
                            <>
                              <img src="/logo.png" alt="User" className="deal-avatar" />
                              <img src="/image.webp" alt="User" className="deal-avatar" />
                              <img src="/logo.png" alt="User" className="deal-avatar" />
                              <span className="deal-avatar-more">+3</span>
                            </>
                          )}
                          {idx === 1 && (
                            <div className="deal-urgent">⚠️ Only 1 seat left!</div>
                          )}
                          {idx === 2 && (
                            <>
                              <img src="/logo.png" alt="User" className="deal-avatar" />
                              <img src="/image.webp" alt="User" className="deal-avatar" />
                              <span className="deal-avatar-more">+4</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <Link href="/shared-safari" className="deal-card-btn">
                      Join Safari →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// const TopParksSection = () => {
//   const parks = [
//     {
//       title: "Corbett Tiger Reserve",
//       desc: "India's oldest national park, known for rich biodiversity and iconic riverine landscapes. Home to over 600 species of birds and the majestic Bengal tiger.",
//       icon: "🏞️",
//       location: "Uttarakhand",
//       bestTime: "Nov - Jun",
//       image: "/image.jpg"
//     },
//     {
//       title: "Ranthambore Tiger Reserve",
//       desc: "A pinnacle of Indian wildlife with dramatic landscapes and memorable tiger sightings. Famous for its ancient ruins and royal Bengal tigers.",
//       icon: "🐅",
//       location: "Rajasthan",
//       bestTime: "Oct - Jun",
//       image: "/image.jpg"
//     },
//     {
//       title: "Pench Tiger Reserve",
//       desc: "Teak forests and the Pench river—famous for diverse wildlife and jungle-book vibes. The inspiration behind Rudyard Kipling's 'The Jungle Book'.",
//       icon: "🌲",
//       location: "Madhya Pradesh",
//       bestTime: "Oct - Jun",
//       image: "/image.jpg"
//     },
//     {
//       title: "Jhalana Leopard Reserve",
//       desc: "An urban sanctuary model with frequent leopard sightings and quick city access. One of the best places in India for leopard photography.",
//       icon: "🐆",
//       location: "Rajasthan",
//       bestTime: "Oct - Mar",
//       image: "/image.jpg"
//     },
//     {
//       title: "Tadoba-Andhari Tiger Reserve",
//       desc: "Maharashtra's oldest and largest national park, spanning 1,727 square kilometers. Known for its high Bengal tiger density and diverse wildlife including leopards, sloth bears, and deer species. The reserve's landscape features dense forests, bamboo thickets, and scenic lakes.",
//       icon: "🐯",
//       location: "Maharashtra",
//       bestTime: "Oct - Jun",
//       image: "/image.jpg"
//     },
//     {
//       title: "Kanha Tiger Reserve",
//       desc: "One of India's finest tiger reserves with vast meadows and sal forests. Known for the endangered Barasingha (swamp deer).",
//       icon: "🦌",
//       location: "Madhya Pradesh",
//       bestTime: "Oct - Jun",
//       image: "/image.jpg"
//     },
//   ];

//   const [isVisible, setIsVisible] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   // Mouse drag scroll functionality
//   const handleMouseDown = (e: React.MouseEvent) => {
//     if (!scrollRef.current) return;
//     setIsDragging(true);
//     setStartX(e.pageX - scrollRef.current.offsetLeft);
//     setScrollLeft(scrollRef.current.scrollLeft);
//     scrollRef.current.style.cursor = 'grabbing';
//   };

//   const handleMouseMove = (e: React.MouseEvent) => {
//     if (!isDragging || !scrollRef.current) return;
//     e.preventDefault();
//     const x = e.pageX - scrollRef.current.offsetLeft;
//     const walk = (x - startX) * 1.5;
//     scrollRef.current.scrollLeft = scrollLeft - walk;
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//     if (scrollRef.current) {
//       scrollRef.current.style.cursor = 'grab';
//     }
//   };

//   const handleMouseLeave = () => {
//     setIsDragging(false);
//     if (scrollRef.current) {
//       scrollRef.current.style.cursor = 'grab';
//     }
//   };

//   // Infinite scroll effect - duplicate cards for seamless scrolling
//   const duplicatedParks = [...parks, ...parks, ...parks];

//   return (
//     <section ref={sectionRef} className={`top-parks-section ${isVisible ? "visible" : ""}`}>
//       <div className="container">
//         <SectionHeader
//           title="The Best of Wildlife"
//           subtitle="Top Safari Parks"
//           rightAction={
//             <Link href="/safari-packages" className="link-btn">
//               View All →
//             </Link>
//           }
//         />
        
//         <div 
//           className="parks-horizontal-scroll"
//           ref={scrollRef}
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseLeave}
//           style={{ cursor: 'grab' }}
//         >
//           <div className="parks-scroll-container">
//             {duplicatedParks.map((p, index) => (
//               <div
//                 key={`${p.title}-${index}`}
//                 className="park-horizontal-card"
//                 onClick={() => window.location.href = `/safari-packages?park=${encodeURIComponent(p.title)}`}
//               >
//                 <div className="park-horizontal-image">
//                   <img src={p.image} alt={p.title} />
//                   <div className="park-horizontal-badge">{p.icon}</div>
//                 </div>
//                 <div className="park-horizontal-content">
//                   <h3 className="park-horizontal-title">{p.title}</h3>
//                   <div className="park-horizontal-meta">
//                     <span className="park-horizontal-location">📍 {p.location}</span>
//                     <span className="park-horizontal-time">📅 {p.bestTime}</span>
//                   </div>
//                   <div className="park-horizontal-hover-info">
//                     <p className="park-horizontal-desc">{p.desc}</p>
//                     <button className="park-horizontal-btn">
//                       Explore Park →
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
        
//         {/* Scroll Indicators */}
//         <div className="parks-scroll-indicators">
//           <div className="scroll-indicator-dot active"></div>
//           <div className="scroll-indicator-dot"></div>
//           <div className="scroll-indicator-dot"></div>
//           <div className="scroll-indicator-dot"></div>
//           <div className="scroll-indicator-dot"></div>
//           <div className="scroll-indicator-dot"></div>
//         </div>
//       </div>
//     </section>
//   );
// };
// Rare Safaris Section
// const RareSafarisSection = () => {
//   const animals = [
//     { name: "Snow Leopard", note: "Elusive big cat of the Himalayas", icon: "🐆" },
//     {
//       name: "Himalayan Brown Bear",
//       note: "A powerful mammal of rugged cold terrain",
//       icon: "🐻",
//     },
//     {
//       name: "Gee's Golden Langur",
//       note: "Rare primate with striking golden fur",
//       icon: "🐒",
//     },
//     {
//       name: "Lion-tailed Macaque",
//       note: "Endangered primate of the Western Ghats",
//       icon: "🐒",
//     },
//     {
//       name: "Malabar Giant Squirrel",
//       note: "Colorful arboreal seed disperser",
//       icon: "🐿️",
//     },
//     { name: "Red Panda", note: "Bamboo lover from the eastern Himalayas", icon: "🐼" },
//   ];

//   const [isVisible, setIsVisible] = useState(false);
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <section ref={sectionRef} className={`rare-section ${isVisible ? "visible" : ""}`}>
//       <div className="container">
//         <SectionHeader
//           title="Rare and Exotic"
//           subtitle="Animal Safaris"
//           rightAction={
//             <Link href="/safari-packages" className="link-btn">
//               View All →
//             </Link>
//           }
//         />
//         <div className="animal-grid">
//           {animals.map((a, index) => (
//             <article
//               key={a.name}
//               className="animal-card"
//               style={{ animationDelay: `${index * 0.1}s` }}
//             >
//               <div className="animal-badge">{a.icon}</div>
//               <h3 className="animal-title">{a.name}</h3>
//               <p className="animal-note">{a.note}</p>
//               <Link href="/custom-tours" className="ghost-btn">
//                 Know More →
//               </Link>
//             </article>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

type WildlifePark = {
  id: number;
  title: string;
  desc: string;
  location: string;
  bestTime: string;
  image: string;
  animal: string;
};

const TopParkCard = ({
  park,
  onClick,
}: {
  park: WildlifePark;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  const href = `/safari-packages?animal=${encodeURIComponent(park.animal)}`;

  return (
    <Link href={href} className="wildlife-strip-card" draggable={false} onClick={onClick}>
      <img
        src={park.image}
        alt={park.animal}
        className="wildlife-strip-image"
        draggable={false}
        onError={(event) => {
          event.currentTarget.src = "/image.jpg";
        }}
      />
      <div className="wildlife-strip-shade" />
      <div className="wildlife-strip-title">
        <span>{park.location}</span>
        <h3>{park.title}</h3>
      </div>
      <div className="wildlife-strip-info">
        <span className="wildlife-strip-kicker">{park.bestTime}</span>
        <h4>{park.animal}</h4>
        <p>{park.desc}</p>
        <span className="wildlife-strip-cta">Explore Safari</span>
      </div>
    </Link>
  );
};

const TopParksSection = () => {
  const parks: WildlifePark[] = [
    {
      id: 1,
      title: "Gir Lion Safari",
      desc: "Track the last wild Asiatic lions through dry teak forest, open scrub, and golden grassland with expert naturalists.",
      location: "Gujarat",
      bestTime: "Dec - Apr",
      image: "/lion.jpg",
      animal: "Lion",
    },
    {
      id: 2,
      title: "Ranthambore Tiger Reserve",
      desc: "Dramatic ruins, lakes, and rocky forest make this one of India's most memorable places for bold tiger sightings.",
      location: "Rajasthan",
      bestTime: "Oct - Jun",
      image: "/image.jpg",
      animal: "Tiger",
    },
    {
      id: 3,
      title: "Jhalana Leopard Reserve",
      desc: "A compact wild landscape near Jaipur, famous for reliable leopard movement and excellent photography chances.",
      location: "Rajasthan",
      bestTime: "Oct - Mar",
      image: "/leopard.jpg",
      animal: "Leopard",
    },
    {
      id: 4,
      title: "Corbett Elephant Trails",
      desc: "Riverine forest, tall grass, and mountain foothills create a powerful setting for elephant herds and birdlife.",
      location: "Uttarakhand",
      bestTime: "Nov - Jun",
      image: "/elephant.jpg",
      animal: "Elephant",
    },
    {
      id: 5,
      title: "Kanha Deer Meadows",
      desc: "Wide meadows and sal forest are home to barasingha, spotted deer, and classic central Indian safari scenery.",
      location: "Madhya Pradesh",
      bestTime: "Oct - Jun",
      image: "/dear.jpg",
      animal: "Deer",
    },
    {
      id: 6,
      title: "Kabini Black Leopard Trail",
      desc: "A rare melanistic leopard experience in deep forest, where patience and the right guide make every drive electric.",
      location: "Karnataka",
      bestTime: "Nov - May",
      image: "/blackleopard.jpg",
      animal: "Black Leopard",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const dragMovedRef = useRef(false);
  const suppressClickRef = useRef(false);

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

  const loopSets = 7;
  const middleSet = Math.floor(loopSets / 2);
  const infiniteParks = Array.from({ length: loopSets }, () => parks).flat();

  const getCardStep = () => {
    const scrollElement = scrollRef.current;
    const firstCard = scrollElement?.querySelector<HTMLElement>(".wildlife-strip-card");

    if (!scrollElement || !firstCard) return 320;

    const styles = window.getComputedStyle(scrollElement);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");

    return firstCard.getBoundingClientRect().width + gap;
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const cardStep = getCardStep();
    const normalizedIndex = Math.round(scrollRef.current.scrollLeft / cardStep);
    const wrappedIndex = ((normalizedIndex % parks.length) + parks.length) % parks.length;

    setActiveIndex(wrappedIndex);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    dragMovedRef.current = false;
    suppressClickRef.current = false;
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 6) {
      dragMovedRef.current = true;
      suppressClickRef.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    scrollElement.addEventListener('scroll', handleScroll);
    
    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
    };
  }, [parks.length]);

  return (
    <section ref={sectionRef} className={`top-parks-section ${isVisible ? "visible" : ""}`}>
      <div className="top-parks-head">
        <SectionHeader
          title="The Best of Wildlife"
          subtitle="Hover each card to meet the animal behind the safari."
          rightAction={
            <Link href="/safari-packages" className="link-btn">
              View All
            </Link>
          }
        />
      </div>

      <div 
        className={`parks-horizontal-scroll ${isDragging ? "dragging" : ""}`}
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {infiniteParks.map((park, index) => (
          <TopParkCard
            key={`${park.id}-${index}`}
            park={park}
            onClick={(event) => {
              if (suppressClickRef.current || dragMovedRef.current) {
                event.preventDefault();
              }
            }}
          />
        ))}
      </div>
      
      <div className="parks-scroll-indicators">
        {parks.map((park, idx) => (
          <button 
            key={park.id}
            type="button"
            aria-label={`Show ${park.animal}`}
            className={`scroll-indicator-dot ${activeIndex === idx ? 'active' : ''}`}
            onClick={() => {
              if (!scrollRef.current) return;
              scrollRef.current.scrollTo({
                left: getCardStep() * (parks.length * middleSet + idx),
                behavior: "smooth",
              });
            }}
          />
        ))}
      </div>
    </section>
  );
};
const RareSafarisSection = () => {
  const animals = [
    { 
      name: "Snow Leopard", 
      note: "Elusive big cat of the Himalayas. Found at high altitudes between 3,000-4,500 meters. Known as the 'ghost of the mountains' due to its rare sightings.", 
      location: "Himalayas",
      rarity: "Critically Endangered",
      image: "/leopard.jpg"
    },
    { 
      name: "Himalayan Brown Bear", 
      note: "A powerful mammal of rugged cold terrain. One of the largest land mammals in the Himalayas, also known as the 'Dzu-Teh'.", 
      location: "Himalayas",
      rarity: "Vulnerable",
      image: "/bear.jpg"
    },
    { 
      name: "Gee's Golden Langur", 
      note: "Rare primate with striking golden fur. Found only in Bhutan and Assam. Considered sacred in many regions.", 
      location: "Assam",
      rarity: "Endangered",
      image: "/elephant.jpg"
    },
    { 
      name: "Lion-tailed Macaque", 
      note: "Endangered primate of the Western Ghats. Known for its silver-white mane and distinctive tail tuft.",
      location: "Western Ghats",
      rarity: "Endangered",
      image: "/lion.jpg"
    },
    { 
      name: "Malabar Giant Squirrel", 
      note: "Colorful arboreal seed disperser. Features vibrant purple, orange, and brown fur. Known for its impressive leaping ability.", 
      location: "Western Ghats",
      rarity: "Least Concern",
      image: "/image.jpg"
    },
    { 
      name: "Red Panda", 
      note: "Bamboo lover from the eastern Himalayas. Known for its cute appearance and red fur. Spends most of its time in trees.", 
      location: "Eastern Himalayas",
      rarity: "Endangered",
      image: "/redpanda.jpg"
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const getRarityColor = (rarity: string) => {
    switch(rarity) {
      case "Critically Endangered": return "#ff4444";
      case "Endangered": return "#ff8800";
      case "Vulnerable": return "#ffcc00";
      default: return "#1c8027";
    }
  };

  return (
    <section ref={sectionRef} className={`rare-section ${isVisible ? "visible" : ""}`}>
      <div className="container">
        <SectionHeader
          title="Rare and Exotic"
          subtitle="Animal Safaris"
          rightAction={
            <Link href="/safari-packages" className="link-btn">
              View All →
            </Link>
          }
        />
        
        <div className="animals-vertical-grid">
          {animals.map((animal, index) => (
            <div
              key={animal.name}
              className="animal-vertical-card"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => window.location.href = `/safari-packages?animal=${encodeURIComponent(animal.name)}`}
            >
              <div className="animal-vertical-image">
                <img src={animal.image} alt={animal.name} />
                <div 
                  className="animal-rarity-vertical"
                  style={{ backgroundColor: getRarityColor(animal.rarity) }}
                >
                  {animal.rarity}
                </div>
              </div>
              <div className="animal-vertical-content">
                <h3 className="animal-vertical-title">{animal.name}</h3>
                <div className="animal-vertical-location">
                  <span className="location-icon">📍</span>
                  {animal.location}
                </div>
                <div className="animal-vertical-desc">
                  <p>{animal.note}</p>
                </div>
                <div className="animal-vertical-footer">
                  <button className="animal-vertical-btn">
                    Know More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
// CTA Section
const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section ref={sectionRef} className={`cta-section ${isVisible ? "visible" : ""}`}>
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">Plan your next safari, smarter.</h2>
          <p className="cta-text">
            Start with packages, or join a shared safari to cut costs and meet fellow enthusiasts.
          </p>
          <div className="cta-actions">
            <Link href="/custom-tours" className="cta-btn primary">
              Plan Safari
            </Link>
            <Link href="/contact-us" className="cta-btn secondary">
              Contact Us
            </Link>
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
