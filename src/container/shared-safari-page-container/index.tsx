"use client";

import React from "react";
import "./style.css";

const SharedCard: React.FC<{ title: string; date: string; seats: number }> = ({ title, date, seats }) => (
	<article className="sh-card">
		<div className="sh-body">
			<h3 className="sh-title">{title}</h3>
			<p className="sh-meta">{date} · Seats available: {seats}</p>
		</div>
		<div className="sh-actions">
			<button className="sh-join">Join</button>
		</div>
	</article>
);

const SharedSafariContainer: React.FC = () => {
	return (
		<div className="sh-container">
			<header className="sh-hero">
				<div className="sh-inner">
					<h1 className="sh-title-main">Shared Safaris</h1>
					<p className="sh-lead">Join scheduled shared departures to save cost and meet fellow travellers.</p>
				</div>
			</header>

			<main className="sh-main">
				<div className="sh-list">
					<SharedCard title="Kanha Morning Safari" date="2026-06-18" seats={4} />
					<SharedCard title="Ranthambore Evening Safari" date="2026-06-21" seats={2} />
					<SharedCard title="Corbett Special" date="2026-06-25" seats={6} />
				</div>
			</main>
		</div>
	);
};

export default SharedSafariContainer;
