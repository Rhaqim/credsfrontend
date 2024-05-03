import Link from "next/link";
import { SideNavLink } from "@/types/account/items.type";

export const orgItems = (
	{ orgId }: { orgId: Number},
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