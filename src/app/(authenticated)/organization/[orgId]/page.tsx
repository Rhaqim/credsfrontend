"use client";

import React, { useEffect } from "react";
import Link from "next/link";

import { useOrg } from "@/context/org.context";

const Organization = ({ params }: { params: { orgId: number } }) => {
	const { organization, credentials, members, getOrganization } = useOrg();

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
						<Link
							href={`/organization/${params.orgId}/credentials/new`}
							className="bg-blue-500 text-white p-2 rounded-lg"
						>
							New Credential
						</Link>
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
								<Link
									href={`/organization/${params.orgId}/team/${member.ID}`}
								>
									<p>{member.display_name}</p>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Organization;
