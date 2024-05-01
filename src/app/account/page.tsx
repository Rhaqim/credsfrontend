"use client";

import React, { useState } from "react";

import SideNav from "@/components/Account/SideNav";
import { SideNavItem } from "@/types/account/items.type";

const Account = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleSideNav = () => {
		setIsOpen(!isOpen);
	};

	const items: SideNavItem[] = [
		{
			onClick: () => console.log("Item 1"),
			label: "Item 1",
		},
	];

	return (
		<div className="flex flex-row">
			<SideNav isOpen={isOpen} toggleSideNav={toggleSideNav} items={items} />
			<div className="flex flex-col w-full p-4 min-h-screen overflow-y-auto">
				<h1>Account</h1>
			</div>
		</div>
	);
};

export default Account;
