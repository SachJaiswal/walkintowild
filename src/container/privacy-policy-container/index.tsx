"use client";

import React from "react";
import "./style.css";
import PolicyPage from "../../components/policy";

const sections = [
	{
		heading: "Introduction",
		body: (
			<p>
				Walk Into The Wild values your privacy. This policy explains what we collect,
				how we use data and your choices regarding that data.
			</p>
		),
	},
	{
		heading: "Data We Collect",
		body: (
			<p>
				We collect basic contact and booking information necessary to arrange safaris and
				communicate with you. Payment details are processed by our payment partners and are not stored on our servers.
			</p>
		),
	},
	{
		heading: "Cookies and Tracking",
		body: (
			<p>
				We use cookies to improve site functionality and analyze traffic. You may control cookies through your browser settings.
			</p>
		),
	},
	{
		heading: "Your Rights",
		body: (
			<p>
				You may request access to your data, rectification, or deletion by contacting support@walkintothewild.in.
			</p>
		),
	},
];

const PrivacyPolicyContainer: React.FC = () => {
	return <PolicyPage title="Privacy Policy" sections={sections} />;
};

export default PrivacyPolicyContainer;
