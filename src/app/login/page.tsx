"use client";

import React from "react";
import { useAuth } from "@/context/auth.context";

const Login = () => {
	const { login } = useAuth();

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="p-4 flex items-center flex-col border border-white rounded-lg shadow-md shadow-white space-y-4">
				<h1 className="text-3xl font-bold mb-4">Login</h1>
				<div className="flex flex-col space-y-4">
					<button
						className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:scale-105 transition duration-200 ease-in-out"
						onClick={() => login("google")}
					>
						Login with Google
					</button>
					<button
						className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-100 hover:scale-105 transition duration-200 ease-in-out"
						onClick={() => login("github")}
					>
						Login with Github
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
