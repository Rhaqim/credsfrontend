"use client";

import React, { useState } from "react";
import Link from "next/link";

import SideNav from "@/components/Account/SideNav";

import { items } from "./utils";

const Account = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("Dashboard");

	const toggleSideNav = () => {
		setIsOpen(!isOpen);
	};

	const IntroCards = [
		{
			title: "Organizations",
			description: "Manage your organizations",
			link: "/organization",
		},
		{
			title: "Billing",
			description: "Manage your billing settings",
			link: "/account/billing",
		},
		{
			title: "Analytics",
			description: "View your analytics",
			link: "/account/analytics",
		},
	];

	return (
		<div className="flex flex-row">
			<SideNav
				isOpen={isOpen}
				toggleSideNav={toggleSideNav}
				items={items(setActiveSection)}
				activeSection={activeSection}
			/>
			<div className="flex flex-col w-full p-4 min-h-screen overflow-y-auto">
				<div>
					{activeSection === "Dashboard" && (
						<>
							<h1 className="text-2xl font-bold">Account</h1>
							<p className="text-sm text-gray-500">Welcome to your account</p>
							{/* Grid of Sections */}
							<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
								{IntroCards.map((card, index) => (
									<Link
										href={card.link}
										key={index}
										className="bg-white p-4 rounded-lg shadow-md"
									>
										<h2 className="text-lg font-semibold mb-2 text-black">
											{card.title}
										</h2>
										<p className="text-sm text-gray-500">{card.description}</p>
									</Link>
								))}
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Account;
