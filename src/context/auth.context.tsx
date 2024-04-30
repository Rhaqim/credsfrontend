"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { BASEURL } from "@/config";
import { AuthEndPoints } from "@/services/api";
import { AuthRoutes } from "@/services/api/routes";
import User from "@/types/user.type";

type AuthContextType = {
	user: User | null;
	isLoggedIn: boolean;
	loading: boolean;
	login: (provider: "google" | "github") => void;
	logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
	isLoggedIn: false,
	user: null,
	loading: false,
	login: (provider: "google" | "github") => {},
	logout: async () => {},
});

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};

interface AuthProviderType {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderType) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(false);

	console.log("user", user);

	useEffect(() => {
		const fetchUser = async () => {
			setLoading(true);
			try {
				const { data } = await AuthEndPoints.me();
				const authenticatedUser = data as unknown as User;

				if (authenticatedUser) {
					setUser(authenticatedUser);
					setIsLoggedIn(true);
				}
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};
		fetchUser();
	}, []);

	const login = (provider: "google" | "github") => {
		let url = AuthRoutes.login(provider);

		const authURL = `${BASEURL}/${url}`;

		window.location.href = authURL;
	};

	const logout = async () => {
		await AuthEndPoints.logout();
		setUser(null);
		setIsLoggedIn(false);
	};

	const contextValue: AuthContextType = {
		user,
		isLoggedIn,
		loading,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};
