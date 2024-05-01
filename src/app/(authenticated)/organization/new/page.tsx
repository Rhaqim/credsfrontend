"use client";

import React, { useReducer } from "react";
import { initialState, reducer } from "./reducer";
import { OrganizationType } from "@/types/organization.type";

const CreateOrganization = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className="flex flex-col min-h-screen overflow-y-auto justify-center">
			<div className="w-1/2 mx-auto mt-8 p-6 border-collapse border-white shadow-md shadow-gray-500 rounded-md">
				<h1 className="text-2xl font-bold mb-4">Create Organization</h1>
				<form>
					<div className="mb-4">
						<label
							htmlFor="organization_name"
							className="block text-sm font-semibold mb-1"
						>
							Organization Name
						</label>
						<input
							id="organization_name"
							type="text"
							value={state.organization_name}
							onChange={e =>
								dispatch({
									type: "SET_ORGANIZATION_NAME",
									payload: e.target.value,
								})
							}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="description"
							className="block text-sm font-semibold mb-1"
						>
							Description
						</label>
						<textarea
							id="description"
							value={state.description}
							onChange={e =>
								dispatch({ type: "SET_DESCRIPTION", payload: e.target.value })
							}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
						/>
					</div>
					<div className="mb-4">
						<label
							htmlFor="organization_type"
							className="block text-sm font-semibold mb-1"
						>
							Organization Type
						</label>
						<select
							id="organization_type"
							value={state.organization_type}
							onChange={e =>
								dispatch({
									type: "SET_ORGANIZATION_TYPE",
									payload: e.target.value as OrganizationType,
								})
							}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
						>
							{Object.values(OrganizationType).map(type => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>
					</div>
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
					>
						Create Organization
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateOrganization;
