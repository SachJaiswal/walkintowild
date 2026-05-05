"use client";

import React from "react";
import "./style.css";

const MissionCard: React.FC<{ title: string; body: string }> = ({ title, body }) => (
	<div className="mission-card">
		<h3>{title}</h3>
		<p>{body}</p>
	</div>
);

const TeamMember: React.FC<{ name: string; role: string }> = ({ name, role }) => (
	<div className="team-member">
		<div className="avatar" aria-hidden>
			{name.split(" ")[0][0]}
		</div>
		<div>
			<strong className="tm-name">{name}</strong>
			<div className="tm-role">{role}</div>
		</div>
	</div>
);

const AboutPageContainer: React.FC = () => {
	return (
		<section className="about-container">
			<div className="about-hero">
				<div className="about-inner">
					<p className="eyebrow">About Walk Into The Wild</p>
					<h1 className="about-title">We connect people to unforgettable wildlife experiences</h1>
					<p className="about-lead">We partner with trusted safari operators to surface curated packages, enable shared safaris, and guide travellers with practical local knowledge — all to make wildlife exploration accessible and responsible.</p>
				</div>
			</div>

			<div className="about-content">
				<div className="missions">
					<MissionCard title="Curated Safaris" body="We hand-pick quality operators and experiences so you can travel with confidence." />
					<MissionCard title="Shared Adventures" body="Join fellow enthusiasts to reduce cost and increase the joy of exploring together." />
					<MissionCard title="Responsible Travel" body="We promote low-impact travel and support local conservation efforts and communities." />
				</div>

				<div className="about-divider" />

				<div className="team-section">
					<h2 className="section-title">Our Small Team</h2>
					<p className="section-sub">A passionate group of travellers, conservation lovers and product builders.</p>

					<div className="team-grid">
						<TeamMember name="Asha Mehta" role="Founder &amp; CEO" />
						<TeamMember name="Rahul Verma" role="Head of Partnerships" />
						<TeamMember name="Nina Kapoor" role="Product &amp; Design" />
					</div>
				</div>

				<div className="cta-row">
					<div>
						<h3>Want to collaborate?</h3>
						<p>Partner with us as an operator or contributor — help build better safaris.</p>
					</div>
					<div>
						<a className="cta-btn" href="mailto:partnerships@walkintothewild.in">Get in touch</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutPageContainer;
