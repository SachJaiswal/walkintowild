"use client";

import React from "react";
import "./style.css";

export type CardProps = {
  id?: string | number;
  title: string;
  park?: string;
  nights?: string;
  highlight?: string;
  price?: string;
  tag?: string;
  image?: string;
  date?: string;
  seats?: number;
  avatars?: string[];
};

const Card: React.FC<CardProps> = ({ title, park, nights, highlight, price, tag, image, date, seats, avatars }) => {
  return (
    <article className="card">
      <div className="card-media" style={{ backgroundImage: image ? `url(${image})` : undefined }} aria-hidden>
        {tag ? <span className="card-tag">{tag}</span> : null}
        {date ? <span className="card-date">{date}</span> : null}
      </div>
      <div className="card-body">
        {park ? <div className="card-park">{park}</div> : null}
        <h3 className="card-title">{title}</h3>
        <p className="card-meta">{nights} {highlight ? `· ${highlight}` : ''}</p>
        {price ? (
          <div className="card-bottom">
            <div className="card-left-meta">
              <div className="card-price">{price}</div>
              <div className="deal-note">Include taxes and fees</div>
              <div className="card-seats">{seats ? `${seats} Seats` : null}</div>
              {avatars && avatars.length > 0 && (
                <div className="avatar-stack" aria-hidden>
                  {avatars.slice(0, 3).map((a, i) => (
                    <img key={i} src={a} alt="" className="avatar" style={{ left: `${i *  -8}px`, zIndex: 10 - i }} />
                  ))}
                  {avatars.length > 3 && <span className="avatar-more">+{avatars.length - 3}</span>}
                </div>
              )}
            </div>
            <button className="card-btn">View Details</button>
          </div>
        ) : null}
      </div>
    </article>
  );
};

export default Card;
