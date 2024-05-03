import Link from "next/link";
import { SideNavLink } from "@/types/account/items.type";

export const orgItems = (
	{ orgId }: { orgId: number},
): SideNavLink[] => {
	return [
		{
			href: `/organization/${orgId}/credentials`,
			label: "Credential",
		},
		{
			href: `/organization/${orgId}/team`,
			label: "Teams",
		},
	];
}