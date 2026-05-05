"use client";

import React from "react";
import "./style.css";

export const PolicyPage: React.FC<{ title: string; sections: { heading: string; body: React.ReactNode }[] }> = ({ title, sections }) => {
  return (
    <div className="policy-page">
      <div className="policy-inner">
        <h1 className="policy-title">{title}</h1>
        {sections.map((s, i) => (
          <section key={i} className="policy-section">
            <h2 className="policy-section__heading">{s.heading}</h2>
            <div className="policy-section__body">{s.body}</div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default PolicyPage;
