"use client";

import React from "react";

import { protectedPage } from "@/context/auth.context";

const AuthenticatedLayout = ({ children }: { children: React.ReactNode }) => {
	React.useEffect(() => {
		protectedPage();
	}, []);
	return <>{children}</>;
};

export default AuthenticatedLayout;
