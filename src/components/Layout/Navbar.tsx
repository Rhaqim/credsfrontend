'use client';

import React from "react";
import Link from "next/link";

import { useAuth } from "@/context/auth.context";

const Navbar = () => {
	const { user, logout, isLoggedIn } = useAuth();

	return (
		<div
			className="flex justify-between items-center h-16 bg-white text-black relative shadow-sm font-mono"
			role="navigation"
		>
			<Link href="/">
				<p className="pl-8">Home</p>
			</Link>
			{isLoggedIn && user ? (
				<div className="flex pr-8">
					<p className="p-4">{user.Email}</p>
					<button onClick={logout} className="p-4">
						Logout
					</button>
				</div>
			) : (
				<Link href="/login">
					<p className="p-4">Login</p>
				</Link>
			)}
		</div>
	);
};

export default Navbar;
