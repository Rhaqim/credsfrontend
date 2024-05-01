export type SideNavItem = {
	onClick: () => void;
	label: string;
};

export type SideNavProps = {
    isOpen: boolean;
    toggleSideNav: () => void;
    items: SideNavItem[];
    activeSection: string;
};