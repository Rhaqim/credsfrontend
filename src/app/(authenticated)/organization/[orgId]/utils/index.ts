import { SideNavItem } from "@/types/account/items.type";

export const orgItems = (
	setActiveSection: (section: string) => void
): SideNavItem[] => {
	return [
		{
			label: "Dashboard",
			onClick: () => setActiveSection("Dashboard"),
		},
		{
			label: "Members",
			onClick: () => setActiveSection("Members"),
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
}
