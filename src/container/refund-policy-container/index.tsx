"use client";

import React from "react";
import "./style.css";
import PolicyPage from "../../components/policy";

const sections = [
	{
		heading: "Overview",
		body: (
			<p>
				Our refund policy depends on the operator and the timing of your cancellation. We summarise typical rules here.
			</p>
		),
	},
	{
		heading: "Cancellations by You",
		body: (
			<p>
				If you cancel more than 30 days before departure most operators offer a partial refund. Within 30 days refunds are restricted—check the package terms.
			</p>
		),
	},
	{
		heading: "Cancellations by Operator",
		body: (
			<p>
				If an operator cancels, you will be offered an alternative date or a full refund depending on the situation.
			</p>
		),
	},
	{
		heading: "Force Majeure",
		body: (
			<p>
				Natural disasters, travel restrictions, or government advisories may affect refunds; operators' force majeure clauses apply.
			</p>
		),
	},
];

const RefundPolicyContainer: React.FC = () => {
	return <PolicyPage title="Refund Policy" sections={sections} />;
};

export default RefundPolicyContainer;
