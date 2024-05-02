"use client";

import React, { useReducer } from "react";

import { initialState, reducer } from "./reducer";

import { useOrg } from "@/context/org.context";
import { Enviornment } from "@/types/credential.type";

const NewCredential = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const { createCredential } = useOrg();

	const handleSubmit = () => {
		createCredential(state);
	};
	return (
		<div className="flex flex-col min-h-screen overflow-y-auto justify-center">
			<div className="w-1/2 mx-auto mt-8 p-6 border-collapse border-white shadow-md shadow-gray-500 rounded-md">
				<h1 className="text-2xl font-bold mb-4">Create Credential</h1>
				<div className="mb-4">
					<label
						htmlFor="credential_name"
						className="block text-sm font-semibold mb-1"
					>
						Credential Name
					</label>
					<input
						id="credential_name"
						type="text"
						value={state.name}
						onChange={e =>
							dispatch({
								type: "SET_CREDENTIAL_NAME",
								payload: e.target.value,
							})
						}
						required
						className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="environment"
						className="block text-sm font-semibold mb-1"
					>
						Environment
					</label>
					<select
						id="environment"
						value={state.environment}
						onChange={e =>
							dispatch({
								type: "SET_ENVIRONMENT",
								payload: e.target.value as Enviornment,
							})
						}
						required
						className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
					>
						{Object.keys(Enviornment).map((env, i) => (
							<option key={i} value={env}>
								{env}
							</option>
						))}
					</select>
				</div>

				<button
					onClick={handleSubmit}
					className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
				>
					Create Credential
				</button>
			</div>
		</div>
	);
};

export default NewCredential;
