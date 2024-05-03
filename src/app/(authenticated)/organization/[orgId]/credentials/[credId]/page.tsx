"use client";

import React, { useEffect, useState } from "react";

import { useOrg } from "@/context/org.context";
import { envString } from "./util";
import axios from "axios";

const Credential = ({
	params,
}: {
	params: { orgId: number; credId: number };
}) => {
	const { getCredential, credential: cred, upload, uploading } = useOrg();

	const [file, setFile] = useState<File | null>(null);

	const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			const file = e.target.files[0];
			setFile(file);
		}
	};

	const api = axios.create({
		baseURL: "http://localhost:8080",
	});

	api.interceptors.request.use(
		config => {
			// include cookies
			config.withCredentials = true;

			return config;
		},
		error => {
			return Promise.reject(error);
		}
	);
	// const handleUpload = async () => {
	// 	const formData = new FormData();
	// 	if (file) {
	// 		formData.append("file", file);
	// 	}
	// 	try {
	// 		const response = await api.post(
	// 			"/api/organization/credentials/2/upload",
	// 			formData,
	// 			{
	// 				headers: {
	// 					"Content-Type": "multipart/form-data",
	// 				},
	// 			}
	// 		);
	// 		return response.data;
	// 	} catch (error) {
	// 		console.error("Error uploading file:", error);
	// 		throw error;
	// 	}
	// };
	const handleUpload = async () => {
		if (file) {
			upload(params.credId, file);
		}
	};

	useEffect(() => {
		getCredential(params.credId);
	}, [params.credId]);

	if (!cred) {
		return <p>Loading...</p>;
	}

	return (
		<div className="max-w-lg mx-auto p-4">
			<div className="mb-4">
				<h2 className="text-xl font-bold">{cred.credential?.name}</h2>
				<p>Environment: {envString(cred.credential.environment)}</p>
				<p>Current Version: {cred.credential.version}</p>
			</div>
			<div className="mb-4">
				{cred?.fields && (
					<div className="border-b border-gray-200 pb-4 mb-4">
						<h3 className="text-lg font-bold mb-2">Fields</h3>
						<table className="w-full">
							<tbody>
								{cred.fields.map((field, index) => (
									<tr key={index}>
										<td className="py-2">{field.key}</td>
										<td className="py-2">
											<button
												className="text-blue-500 hover:underline"
												onClick={() => alert(field.value)}
											>
												Reveal
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
			<div>
				{cred?.file && cred.file.ID !== 0 ? (
					<div>
						<h3 className="text-lg font-bold mb-2">File</h3>
						<p className="mb-1">Name: {cred.file.file_name}</p>
						<p className="mb-1">Size: {cred.file.file_size} KB</p>
						<p className="mb-1">Format: {cred.file.file_format}</p>
						<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
							Download
						</button>
					</div>
				) : (
					<div>
						{uploading ? (
							<p>Uploading...</p>
						) : (
							<>
								<h3 className="text-lg font-bold mb-2">Upload File</h3>
								<input
									type="file"
									onChange={handleUploadChange}
									className="border border-gray-400 rounded-md p-2 mb-2 w-full"
								/>
								<button
									onClick={handleUpload}
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
								>
									Upload
								</button>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Credential;
