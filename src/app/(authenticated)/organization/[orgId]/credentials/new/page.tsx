"use client";

import React, { useReducer } from "react";

import { initialState, reducer } from "./reducer";

import { useOrg } from "@/context/org.context";
import { Environment } from "@/types/credential.type";

const NewCredential = ({ params }: { params: { orgId: Number } }) => {
	const { createCredential } = useOrg();

	const [state, dispatch] = useReducer(reducer, initialState);

	enum EnvironmentName {
		DEVELOPMENT = "DEVELOPMENT",
		STAGING = "STAGING",
		PREPRODUCTION = "PREPRODUCTION",
		PRODUCTION = "PRODUCTION",
	}

	const [environment, setEnvironment] = React.useState<EnvironmentName>(
		EnvironmentName.DEVELOPMENT
	);

	const handleEnvironmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setEnvironment(e.target.value as EnvironmentName);

		// map the environment name to the enum value in Environment

		const env = () => {
			switch (e.target.value) {
				case EnvironmentName.DEVELOPMENT:
					return Environment.DEVELOPMENT;
				case EnvironmentName.STAGING:
					return Environment.STAGING;
				case EnvironmentName.PREPRODUCTION:
					return Environment.PREPRODUCTION;
				case EnvironmentName.PRODUCTION:
					return Environment.PRODUCTION;
				default:
					return Environment.DEVELOPMENT;
			}
		};

		dispatch({
			type: "SET_ENVIRONMENT",
			payload: env(),
		});
	};

	const handleSubmit = () => {
		const newState = { ...state, organization_id: Number(params.orgId) };
		createCredential(newState);
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
						value={environment}
						onChange={handleEnvironmentChange}
						required
						className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
					>
						{Object.keys(EnvironmentName).map((env, i) => (
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
