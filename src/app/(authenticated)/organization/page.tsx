"use client";

import React from "react";
import Link from "next/link";

import { useOrg } from "@/context/org.context";

const Organizations = () => {
	const { organizations } = useOrg();

	return (
		<div className="flex flex-col w-full p-4 min-h-screen overflow-y-auto">
			<div className="py-4 flex justify-between">
				<div>
					<h1 className="text-2xl font-bold">Organizations</h1>
					<p className="text-sm text-gray-500">Manage your organizations</p>
				</div>
				<Link href="/organization/new">
					<p className="bg-blue-500 text-white p-2 rounded-lg">
						New Organization
					</p>
				</Link>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
				{organizations.length > 0 &&
					organizations.map((org, index) => (
						<Link
							href={`/organization/${org.ID}`}
							key={index}
							className="bg-white p-4 rounded-lg hover:scale-105 hover:shadow-md shadow-indigo-500 transition-all duration-150 ease-linear"
						>
							{" "}
							<div className="mb-2">
								<h2 className="text-lg font-semibold mb-2 text-black">
									{org.organization_name}
								</h2>
								<p className="text-sm text-gray-500">
									{org.description || "..."}
								</p>
							</div>
							<div className="flex justify-between">
								<p className="text-sm text-gray-500">
									Credentials: {org.credentials_count || 0}
								</p>
								<p className="text-sm text-gray-500">
									Members: {org.members_count || 0}
								</p>
							</div>
						</Link>
					))}
			</div>
		</div>
	);
};

export default Organizations;
