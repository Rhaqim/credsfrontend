"use client";

import React from "react";

import { OrgProvider } from "@/context/org.context";

export default function OrganizationLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<OrgProvider>
			<div className="flex flex-col w-full p-4 min-h-screen overflow-y-auto">
				{children}
			</div>
		</OrgProvider>
	);
}
