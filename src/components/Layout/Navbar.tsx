"use client";

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
					<Link
						href={`/account`}
						className="m-2 border bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-md  hover:from-indigo-700 hover:to-indigo-900 hover:scale-105 transition duration-100 ease-in-out"
					>
						<p className="p-4">{user.display_name}</p>
					</Link>
					<button
						className="m-2 px-2 border border-black rounded-md hover:bg-gray-100 hover:scale-105 transition duration-200 ease-in-out"
						onClick={logout}
					>
						Logout
					</button>
				</div>
			) : (
				<Link
					className="m-2 px-2 border border-black rounded-md hover:bg-gray-100 hover:scale-105 transition duration-200 ease-in-out"
					href="/login"
				>
					<p className="p-4">Login</p>
				</Link>
			)}
		</div>
	);
};

export default Navbar;
