export type SideNavItem = {
	onClick: () => void;
	label: string;
};

export type SideNavProps = {
    header?: SideNavItem;
    isOpen: boolean;
    toggleSideNav: () => void;
    items: SideNavItem[];
    activeSection: string;
};