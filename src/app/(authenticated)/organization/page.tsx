"use client";

import React, { useState } from "react";

import Link from "next/link";

const Organizations = () => {
	const [organizations, setOrganizations] = useState([
		{ name: "Organization 1", credentials: 10 },
		{ name: "Organization 2", credentials: 5 },
		{ name: "Organization 3", credentials: 8 },
		{ name: "Organization 4", credentials: 12 },
		{ name: "Organization 5", credentials: 7 },
	]);
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
				{organizations.map((org, index) => (
					<Link
						href={`/organization/${index}`}
						key={index}
						className="bg-white p-4 rounded-lg shadow-md"
					>
						<h2 className="text-lg font-semibold mb-2 text-black">
							{org.name}
						</h2>
						<p className="text-sm text-gray-500">
							Credentials: {org.credentials}
						</p>
					</Link>
				))}
			</div>
		</div>
	);
};

export default Organizations;
