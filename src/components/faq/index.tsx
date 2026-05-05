"use client";

import React, { useState } from "react";
import "./style.css";

export type FAQItemType = { id: string | number; q: string; a: string };

const ToggleIcon: React.FC<{ open: boolean }> = ({ open }) => (
  <span className={`faq-toggle ${open ? "open" : ""}`} aria-hidden>
    {open ? "−" : "+"}
  </span>
);

export const FAQItem: React.FC<{ item: FAQItemType }> = ({ item }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button className="faq-question" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>{item.q}</span>
        <ToggleIcon open={open} />
      </button>
      <div className="faq-answer" hidden={!open}>
        <p>{item.a}</p>
      </div>
    </div>
  );
};

export const FAQList: React.FC<{ items: FAQItemType[] }> = ({ items }) => (
  <div className="faq-list">
    {items.map((it) => (
      <FAQItem key={it.id} item={it} />
    ))}
  </div>
);

export default FAQList;
