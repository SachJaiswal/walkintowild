"use client";

import React from "react";
import "./style.css";

const PackageCard: React.FC<{ title: string; park: string; price: string }> = ({ title, park, price }) => (
	<article className="sp-card">
		<div className="sp-media" aria-hidden>
			<div className="sp-park">{park}</div>
		</div>
		<div className="sp-body">
			<h3 className="sp-title">{title}</h3>
			<p className="sp-price">{price}</p>
			<button className="sp-cta">Book Now</button>
		</div>
	</article>
);

const SafariPackageContainer: React.FC = () => {
	return (
		<div className="sp-container">
			<header className="sp-hero">
				<div className="sp-inner">
					<h1 className="sp-title-main">Safari Packages</h1>
					<p className="sp-lead">Browse curated packages from trusted operators across India.</p>
				</div>
			</header>

			<main className="sp-main">
				<div className="sp-grid">
					<PackageCard title="Tadoba Explorer" park="Tadoba" price="₹ 20,110" />
					<PackageCard title="Bhitarkanika Boat Trip" park="Bhitarkanika" price="₹ 24,750" />
					<PackageCard title="Pench Family Package" park="Pench" price="₹ 18,900" />
				</div>
			</main>
		</div>
	);
};

export default SafariPackageContainer;
