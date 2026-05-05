"use client";

import React, { useEffect, useRef, useState } from "react";
import "./style.css";

// ─────────────────────────────────────────────────────────────────────
// Intersection observer hook
// ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─────────────────────────────────────────────────────────────────────
// SVG Icons
// ─────────────────────────────────────────────────────────────────────
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

const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const IconTwitter = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
  </svg>
);

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────
// Form Field component — boxed inputs
// ─────────────────────────────────────────────────────────────────────
interface FieldProps {
  label: string;
  type?: string;
  isTextarea?: boolean;
  delay?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const FormField: React.FC<FieldProps> = ({
  label, type = "text", isTextarea = false, delay = 0, value, onChange,
}) => {
  const { ref, visible } = useInView(0.05);
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={`cu-field${visible ? " visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <label className="cu-field__label">{label}</label>
      {isTextarea ? (
        <textarea
          className="cu-field__input cu-field__textarea"
          placeholder={label}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className="cu-field__input"
          type={type}
          placeholder={label}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// Info row
// ─────────────────────────────────────────────────────────────────────
interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  delay?: number;
}
const InfoRow: React.FC<InfoRowProps> = ({ icon, label, value, sub, delay = 0 }) => {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref as React.Ref<HTMLDivElement>}
      className={`cu-info__row${visible ? " visible" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="cu-info__icon-box">{icon}</div>
      <div>
        <p className="cu-info__label">{label}</p>
        <p className="cu-info__value">{value}</p>
        <p className="cu-info__sub">{sub}</p>
      </div>
    </div>
  );
};


// ─────────────────────────────────────────────────────────────────────
// Contact form + info panel
// ─────────────────────────────────────────────────────────────────────
const ContactBody: React.FC = () => {
  const [fields, setFields] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!fields.name.trim() || !fields.email.trim()) return;
    setSubmitted(true);
  };

  const { ref: tagRef,       visible: tagVis       } = useInView();
  const { ref: headRef,      visible: headVis      } = useInView();
  const { ref: formEyeRef,   visible: formEyeVis   } = useInView();
  const { ref: formTitleRef, visible: formTitleVis } = useInView();
  const { ref: btnRef,       visible: btnVis       } = useInView(0.05);
  const { ref: socialRef,    visible: socialVis    } = useInView();
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rightPanelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add("brackets-on"); obs.disconnect(); }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="cu-body">
      <div className="cu-body__inner">

        {/* ── LEFT — info ── */}
        <div className="cu-left">
          <p
            ref={tagRef as React.Ref<HTMLParagraphElement>}
            className={`cu-left__tag${tagVis ? " visible" : ""}`}
          >
            Get In Touch
          </p>

          <h2
            ref={headRef as React.Ref<HTMLHeadingElement>}
            className={`cu-left__heading${headVis ? " visible" : ""}`}
          >
            Where wildlife
            <em>meets wonder.</em>
          </h2>
          <div className="cu-info__list">
            <InfoRow icon={<IconPin />}   label="Head Office"    value="New Delhi, India"  sub="Central India Operations"      delay={0}   />
            <InfoRow icon={<IconPhone />} label="Phone"   value="+91 11 0000 0000"           sub="Mon–Sat, 9AM – 6PM IST"   delay={80}  />
            <InfoRow icon={<IconMail />}  label="Email" value="support@walkintothewild.in"           sub="Response within 24 hours"  delay={160} />
          </div>

          <div
            ref={socialRef as React.Ref<HTMLDivElement>}
            className={`cu-social${socialVis ? " visible" : ""}`}
          >
            <p className="cu-social__label">Follow the Essence</p>
            <div className="cu-social__icons">
              <a href="#" className="cu-social__icon" aria-label="Instagram"><IconInstagram /></a>
              <a href="#" className="cu-social__icon" aria-label="Twitter"><IconTwitter /></a>
              <a href="#" className="cu-social__icon" aria-label="Facebook"><IconFacebook /></a>
            </div>
          </div>
        </div>

        {/* ── RIGHT — form ── */}
        <div className="cu-right" ref={rightPanelRef}>
          <div className="cu-right__inner">

            <p
              ref={formEyeRef as React.Ref<HTMLParagraphElement>}
              className={`cu-form__eyebrow${formEyeVis ? " visible" : ""}`}
            >
              Contact Us
            </p>

            <h2
              ref={formTitleRef as React.Ref<HTMLHeadingElement>}
              className={`cu-form__title${formTitleVis ? " visible" : ""}`}
            >
              Send a Message
            </h2>

            {!submitted ? (
              <>
                <div className="cu-form">
                  <div className="cu-form__row">
                    <FormField label="Full Name"          value={fields.name}    onChange={update("name")}    delay={0}   />
                    <FormField label="Email Address" type="email" value={fields.email}   onChange={update("email")}   delay={60}  />
                  </div>
                  <div className="cu-form__row">
                    <FormField label="Phone (Optional)" type="tel"  value={fields.phone}   onChange={update("phone")}   delay={120} />
                    <FormField label="Subject"                       value={fields.subject} onChange={update("subject")} delay={180} />
                  </div>
                  <FormField label="Your Message" isTextarea value={fields.message} onChange={update("message")} delay={240} />
                </div>

                <div
                  ref={btnRef as React.Ref<HTMLDivElement>}
                  className={`cu-form__footer${btnVis ? " visible" : ""}`}
                >
                  <button className="cu-form__submit" onClick={handleSubmit}>
                    <span> SEND </span>
                    <IconSend />
                  </button>
                  <p className="cu-form__disclaimer">
                    Your enquiry is handled with the utmost discretion and care
                  </p>
                </div>
              </>
            ) : (
              <div className="cu-success">
                <div className="cu-success__icon"><IconCheck /></div>
                <h3 className="cu-success__title">Message Received</h3>
                <p className="cu-success__text">
                  Thank you, {fields.name.split(" ")[0]}. We will be in touch within 24 hours.
                </p>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────
// Root export
// ─────────────────────────────────────────────────────────────────────
const ContactUsContainer: React.FC = () => (
  <div className="contact-us-container" id="contact">
    <ContactBody />
  </div>
);

export default ContactUsContainer;