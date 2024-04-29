"use client";

import React from "react";
import { AuthRoutes } from "@/serices/api";
import axios from "axios";

const Login = () => {
	const LoginWithGoogle = () => {
		fetch(AuthRoutes.googleLogin, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				// window.location.href = data;
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<div>
			<button onClick={LoginWithGoogle}>Login with Google</button>
		</div>
	);
};

export default Login;
