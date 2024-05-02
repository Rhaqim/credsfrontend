"use client";

import React, { useEffect, useReducer } from "react";
import Link from "next/link";

import Modal from "@/components/Modal";
import { useOrg } from "@/context/org.context";
import { Environment } from "@/types/credential.type";

import { initialState, reducer } from "./reducer";

const Organization = ({ params }: { params: { orgId: number } }) => {
	const {
		organization,
		credentials,
		members,
		getOrganization,
		createCredential,
	} = useOrg();

	const [state, dispatch] = useReducer(reducer, initialState);
	const [showCredCreateModal, setShowCredCreateModal] = React.useState(false);

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

	const handleSubmit = async () => {
		// const newState = { ...state, organization_id: Number(params.orgId) };
		// const response = await createCredential(newState);
		setShowCredCreateModal(false);
	};

	useEffect(() => {
		getOrganization(params.orgId);
	}, [params.orgId]);

	return (
		<div className="max-w-3xl mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-4">
				{organization?.organization_name}
			</h1>
			<p className="text-lg text-gray-700 mb-8">{organization?.description}</p>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					{/* Create new */}
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-bold mb-4">Credentials</h2>
						<button
							onClick={() => setShowCredCreateModal(true)}
							className="bg-blue-500 text-white p-2 rounded-lg"
						>
							New Credential
						</button>
					</div>
					<ul className="list-disc pl-4">
						{credentials.map((credential, index) => (
							<li key={index} className="text-lg text-gray-700">
								<Link
									href={`/organization/${params.orgId}/credentials/${credential.ID}`}
								>
									{credential.name}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-bold mb-4">Members</h2>
						<Link
							href={`/organization/${params.orgId}/team/invite`}
							className="bg-blue-500 text-white p-2 rounded-lg"
						>
							Invite Member
						</Link>
					</div>
					<ul className="list-disc pl-4">
						{members.map((member, index) => (
							<li key={index} className="text-lg text-gray-700">
								<Link href={`/organization/${params.orgId}/team/${member.ID}`}>
									<p>{member.display_name}</p>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
			{showCredCreateModal && (
				<Modal onClose={() => setShowCredCreateModal(false)}>
					<div className="flex flex-col">
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
				</Modal>
			)}
		</div>
	);
};

export default Organization;
