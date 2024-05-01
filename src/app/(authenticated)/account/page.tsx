"use client";

import React, { useState } from "react";

import SideNav from "@/components/Account/SideNav";
import { SideNavItem } from "@/types/account/items.type";
import Link from "next/link";

const Account = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("Dashboard");

	const toggleSideNav = () => {
		setIsOpen(!isOpen);
	};

	const items: SideNavItem[] = [
		{
			label: "Dashboard",
			onClick: () => setActiveSection("Dashboard"),
		},
		{
			label: "Organizations",
			onClick: () => setActiveSection("Organizations"),
		},
		{
			label: "Settings",
			onClick: () => setActiveSection("Settings"),
		},
		{
			label: "Billing",
			onClick: () => setActiveSection("Billing"),
		},
	];

	// Sample data for organizations
	const organizations = [
		{ name: "Organization 1", credentials: 10 },
		{ name: "Organization 2", credentials: 5 },
		{ name: "Organization 3", credentials: 8 },
		{ name: "Organization 4", credentials: 12 },
		{ name: "Organization 5", credentials: 7 },
		// Add more organizations as needed
	];

	return (
		<div className="flex flex-row">
			<SideNav
				isOpen={isOpen}
				toggleSideNav={toggleSideNav}
				items={items}
				activeSection={activeSection}
			/>
			<div className="flex flex-col w-full p-4 min-h-screen overflow-y-auto">
				<div>
					{activeSection === "Dashboard" && (
						<>
							<h1 className="text-2xl font-bold">Account</h1>
							<p className="text-sm text-gray-500">Welcome to your account</p>
							{/* Grid of organizations */}
							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
								{organizations.map((org, index) => (
									<Link
										href={`/organization/${index}`}
										key={index}
										className="bg-white p-4 rounded-lg shadow-md"
									>
										<h2 className="text-lg font-semibold mb-2 text-black">
											{org.name}
										</h2>
										<p className="text-sm text-gray-500">
											Credentials: {org.credentials}
										</p>
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
