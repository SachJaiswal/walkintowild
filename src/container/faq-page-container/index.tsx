"use client";

import React from "react";
import "./style.css";
import FAQList, { FAQItemType } from "../../components/faq";

const items: FAQItemType[] = [
	{ id: 1, q: "How do shared safaris work?", a: "Shared safaris allow multiple travellers to join a single vehicle to reduce cost and increase social experience. We list available shared departures and the minimum group size." },
	{ id: 2, q: "Can I customize a package?", a: "Yes — many operators allow custom itineraries. Contact us with your preferences and we'll connect you to the operator." },
	{ id: 3, q: "What should I pack for a safari?", a: "Lightweight neutral clothing, sun protection, sturdy shoes, binoculars and a good camera. We provide a full packing checklist per park in the package details." },
];

const FAQContainer: React.FC = () => {
	return (
		<div className="faq-container">
			<div className="faq-hero">
				<div className="faq-inner">
					<p className="eyebrow">Questions & Answers</p>
					<h1 className="faq-title">Frequently Asked Questions</h1>
					<p className="faq-lead">Common queries about planning, booking and joining safaris.</p>
				</div>
			</div>

			<main className="faq-main">
				<FAQList items={items} />
			</main>
		</div>
	);
};

export default FAQContainer;
