"use client";

import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { redirect } from "next/navigation";

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

const MAX_REVALIDATE_COUNTER = 5;

export const AuthProvider = ({ children }: AuthProviderType) => {
	const [user, setUser] = useState<User | null>(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [loading, setLoading] = useState(false);
	const [revalidateCounter, setRevalidateCounter] = useState(0);

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

		if (revalidateCounter < MAX_REVALIDATE_COUNTER) {
			fetchUser();
			setRevalidateCounter(revalidateCounter + 1);
		}
	}, [revalidateCounter]);

	const cachedUser = useMemo(() => user, [user]);

	const login = (provider: "google" | "github") => {
		let url = AuthRoutes.login(provider);

		const authURL = `${BASEURL}${url}`;

		window.location.href = authURL;
	};

	const logout = async () => {
		await AuthEndPoints.logout();
		setUser(null);
		setIsLoggedIn(false);
	};

	const contextValue: AuthContextType = {
		user: cachedUser,
		isLoggedIn,
		loading,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
};

export async function protectedPage() {
	const data = await AuthEndPoints.me();

	const storedUser = data as unknown as User;

	if (!storedUser) {
		redirect("/login");
	}
}
