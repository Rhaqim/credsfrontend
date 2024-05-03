"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { OrgProvider } from "@/context/org.context";
import SideNav from "@/components/Layout/SideNav";
import { useOrg } from "@/context/org.context";
import { orgItems } from "./utils";

export default function OrganizationLayout({
	children, params
}: {
	children: React.ReactNode;
	params: { orgId: Number };
}) {
	const router = useRouter();
	const { orgId } = params;

	const {organization, getOrganization} = useOrg();

	const [isOpen, setIsOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("Dashboard");

	const toggleSideNav = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		getOrganization(orgId as number);
	}, [orgId]);

	return (
		<OrgProvider>
			<div className="flex flex-row">
				<SideNav
					header={
						{
							onClick: () => {
								router.push(`/organization/${orgId}`)
							},
							label: organization ? organization.organization_name : "Organization"
						}
					}
					isOpen={isOpen}
					toggleSideNav={toggleSideNav}
					items={orgItems(setActiveSection)}
					activeSection={activeSection}
				/>
				<div className="flex flex-col w-full p-4 min-h-screen overflow-y-auto">
					{children}
				</div>
			</div>
		</OrgProvider>
	);
}
