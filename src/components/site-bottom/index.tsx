"use client";

import React from "react";
import "./style.css";

const SiteBottom: React.FC = () => {
  return (
    <div className="site-bottom-wrap" aria-hidden="true">
      <div className="site-bottom-inner">
        <picture>
          <source srcSet="/image.webp" type="image/webp" />
          <img src="/site-bottom.png" alt="Decorative wildlife footer" className="site-bottom-img" />
        </picture>
      </div>
    </div>
  );
};

export default SiteBottom;
