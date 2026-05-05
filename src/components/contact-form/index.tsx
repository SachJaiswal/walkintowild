"use client";

import React, { useState } from "react";

// Icons (send + check)
const IconSend = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface FieldProps {
  label: string;
  type?: string;
  isTextarea?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormField: React.FC<FieldProps> = ({ label, type = "text", isTextarea = false, value, onChange }) => {
  return (
    <div className="cu-field visible">
      <label className="cu-field__label">{label}</label>
      {isTextarea ? (
        <textarea className="cu-field__input cu-field__textarea" placeholder={label} value={value} onChange={onChange} />
      ) : (
        <input className="cu-field__input" type={type} placeholder={label} value={value} onChange={onChange} />
      )}
    </div>
  );
};

interface Props {
  onSubmit?: (data: { name: string; email: string; phone: string; subject: string; message: string }) => void;
}

const ContactForm: React.FC<Props> = ({ onSubmit }) => {
  const [fields, setFields] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!fields.name.trim() || !fields.email.trim()) return;
    setSubmitted(true);
    onSubmit?.(fields);
  };

  if (submitted) {
    return (
      <div className="cu-success">
        <div className="cu-success__icon"><IconCheck /></div>
        <h3 className="cu-success__title">Message Received</h3>
        <p className="cu-success__text">Thank you, {fields.name.split(" ")[0]}. We will be in touch within 24 hours.</p>
      </div>
    );
  }

  return (
    <form className="cu-form" onSubmit={handleSubmit}>
      <div className="cu-form__row">
        <FormField label="Full Name" value={fields.name} onChange={update("name")} />
        <FormField label="Email Address" type="email" value={fields.email} onChange={update("email")} />
      </div>
      <div className="cu-form__row">
        <FormField label="Phone (Optional)" type="tel" value={fields.phone} onChange={update("phone")} />
        <FormField label="Subject" value={fields.subject} onChange={update("subject")} />
      </div>
      <FormField label="Your Message" isTextarea value={fields.message} onChange={update("message")} />

      <div className="cu-form__footer visible">
        <button type="submit" className="cu-form__submit">
          <span> SEND </span>
          <IconSend />
        </button>
        <p className="cu-form__disclaimer">Your enquiry is handled with the utmost discretion and care</p>
      </div>
    </form>
  );
};

export default ContactForm;
