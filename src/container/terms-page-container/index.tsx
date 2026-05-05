"use client";

import React from "react";
import "./style.css";
import PolicyPage from "../../components/policy";

const sections = [
	{
		heading: "Acceptance of Terms",
		body: (
			<p>
				By using Walk Into The Wild you agree to these Terms and Conditions. Please read them carefully.
			</p>
		),
	},
	{
		heading: "Bookings and Payments",
		body: (
			<p>
				Bookings are subject to operator availability and the payment terms described in each package. Prices may change until booking is confirmed.
			</p>
		),
	},
	{
		heading: "Liability",
		body: (
			<p>
				Walk Into The Wild acts as an intermediary between travellers and operators. Operators are independently responsible for operational matters and safety.
			</p>
		),
	},
];

const TermsContainer: React.FC = () => {
	return <PolicyPage title="Terms & Conditions" sections={sections} />;
};

export default TermsContainer;
