"use client";

import React, { useEffect, useState } from "react";

import { useOrg } from "@/context/org.context";
import { Field } from "@/types/credential.type";
import { CredsEndPoints } from "@/services/api";

import { envString } from "./util";

const Credential = ({
	params,
}: {
	params: { orgId: number; credId: number };
}) => {
	const { getCredential, credential: cred, upload, uploading } = useOrg();

	const [file, setFile] = useState<File | null>(null);

	const [fields, setFields] = useState<Field[]>([{ key: "", value: "" }]);

	const handleChange = (
		index: number,
		e: React.ChangeEvent<HTMLInputElement>,
		fieldKey: keyof Field
	) => {
		const newFields = [...fields];
		newFields[index][fieldKey] = e.target.value;
		setFields(newFields);
	};

	const handleAddField = () => {
		setFields([...fields, { key: "", value: "" }]);
	};

	const handleRemoveField = (index: number) => {
		const newFields = [...fields];
		newFields.splice(index, 1);
		setFields(newFields);
	};

	const handleSubmit = async () => {
		const data = fields.filter(field => field.key && field.value);
		if (data.length) {
			await CredsEndPoints.addFields(params.credId, data);
		}
	};

	const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			const file = e.target.files[0];
			setFile(file);
		}
	};

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
		<div className="md:w-full mx-auto p-4">
			<div className="mb-4">
				<h2 className="text-xl font-bold">{cred.credential?.name}</h2>
				<p>Environment: {envString(cred.credential.environment)}</p>
				<p>Current Version: {cred.credential.version}</p>
			</div>
			<div className="flex flex-col md:flex-row justify-between">
				<div className="mb-4">
					<div className="max-w-md mx-auto mt-8">
						{fields.map((field, index) => (
							<div key={index} className="mb-4 flex items-center">
								<input
									type="text"
									className="border border-gray-300 text-black rounded mr-2 px-4 py-2 flex-grow"
									placeholder="Key"
									value={field.key}
									onChange={e => handleChange(index, e, "key")}
								/>
								<input
									type="text"
									className="border border-gray-300 text-black rounded mr-2 px-4 py-2 flex-grow"
									placeholder="Value"
									value={field.value}
									onChange={e => handleChange(index, e, "value")}
								/>
								<button
									className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
									onClick={() => handleRemoveField(index)}
								>
									Remove
								</button>
							</div>
						))}
						<div className="flex justify-between">
							{fields[0]?.key && fields[0]?.value && (
								<button
									className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
									onClick={handleSubmit}
								>
									Save
								</button>
							)}
							<button
								className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
								onClick={handleAddField}
							>
								Add More
							</button>
						</div>
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
		</div>
	);
};

export default Credential;
