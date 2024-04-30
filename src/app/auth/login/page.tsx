"use client";

import React from "react";
import { AuthRoutes } from "@/services/api";

const Login = () => {
	const LoginWithGoogle = async () => {
		window.location.href = AuthRoutes.googleLogin;
	};

	return (
		<div>
			<button onClick={LoginWithGoogle}>Login with Google</button>
		</div>
	);
};

export default Login;
