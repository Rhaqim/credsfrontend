import { SideNavItem } from "@/types/account/items.type";

export const items = (
	setActiveSection: (section: string) => void
): SideNavItem[] => {
	return [
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
};
