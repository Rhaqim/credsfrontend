"use client";

import React from "react";
import { useAuth } from "@/context/auth.context";

const Login = () => {
	const { login } = useAuth();

	return (
		<div>
			<button onClick={() => login("google")}>Login with Google</button>
		</div>
	);
};

export default Login;
