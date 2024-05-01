"use client";

import React from "react";

import { OrgProvider } from "@/context/org.context";

export default function OrganizationLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<OrgProvider>{children}</OrgProvider>
		</div>
	);
}
