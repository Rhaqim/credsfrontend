import SideNav from "@/components/Account/SideNav";
import React from "react";

export default function AccountLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-row">
			<SideNav />
			<div className="flex flex-col w-full p-4 min-h-screen overflow-y-auto">
				{children}
			</div>
		</div>
	);
}
