export type SideNavItem = {
	onClick: () => void;
	label: string;
};

export type SideNavLink = {
    href: string;
    label: string;
};

export type SideNavProps = {
    header?: SideNavItem;
    isOpen: boolean;
    toggleSideNav: () => void;
    items?: SideNavItem[];
    links?: SideNavLink[];
    activeSection: string;
};