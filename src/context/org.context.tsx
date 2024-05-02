"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { OrgEndPoints, CredsEndPoints, TeamEndPoints } from "@/services/api";
import Organization from "@/types/organization.type";
import Credential, { CredentialReturn } from "@/types/credential.type";
import Member from "@/types/team.type";
import User from "@/types/user.type";

type OrgContextType = {
	organizations: Organization[];
	organization: Organization | null;
	credentials: Credential[];
	members: User[];
	loading: boolean;
	createOrganization: (data: Organization) => void;
	getOrganizations: () => void;
	getOrganization: (id: number) => void;
	setCredentials: (data: Credential[]) => void;
	setMembers: (data: User[]) => void;

	createCredential: (data: Credential) => Promise<Credential | undefined>;
	getCredentials: () => void;
	getCredential: (id: number) => void;
	setCredential: (data: CredentialReturn) => void;
	credential: CredentialReturn | null;

	createMember: (data: Member) => void;
	getMembers: () => void;
	getMember: (id: number) => void;
	setMember: (data: Member) => void;
	member: Member | null;

	uploading: boolean;
	setUploading: (data: boolean) => void;
	upload: (id: number, data: File) => Promise<void>;
};

export const OrgContext = createContext<OrgContextType>({
	organizations: [],
	organization: null,
	credentials: [],
	members: [],
	loading: false,
	createOrganization: (data: Organization) => {},
	getOrganizations: () => {},
	getOrganization: (id: number) => {},
	setCredentials: (data: Credential[]) => {},
	setMembers: (data: User[]) => {},

	createCredential: async (
		data: Credential
	): Promise<Credential | undefined> => {
		return;
	},
	getCredentials: () => {},
	getCredential: (id: number) => {},
	setCredential: (data: CredentialReturn) => {},
	credential: null,

	createMember: (data: Member) => {},
	getMembers: () => {},
	getMember: (id: number) => {},
	setMember: (data: Member) => {},
	member: null,

	uploading: false,
	setUploading: (data: boolean) => {},
	upload: async (id: number, data: File) => {},
});

export const useOrg = () => {
	const context = useContext(OrgContext);
	if (!context) {
		throw new Error("useOrg must be used within an OrgProvider");
	}

	return context;
};

interface OrgProviderType {
	children: React.ReactNode;
}

export const OrgProvider = ({ children }: OrgProviderType) => {
	const [organizations, setOrganizations] = useState<Organization[]>([]);
	const [organization, setOrganization] = useState<Organization | null>(null);

	const [credentials, setCredentials] = useState<Credential[]>([]);
	const [credential, setCredential] = useState<CredentialReturn | null>(null);

	const [member, setMember] = useState<Member | null>(null);
	const [members, setMembers] = useState<User[]>([]);

	const [uploading, setUploading] = useState(false);

	const [loading, setLoading] = useState(false);

	useEffect(() => {
		getOrganizations();
	}, []);

	const createOrganization = async (data: Organization) => {
		try {
			await OrgEndPoints.create(data);
			getOrganizations();
		} catch (error) {
			console.error(error);
		}
	};

	const getOrganizations = async () => {
		setLoading(true);
		try {
			const { data } = await OrgEndPoints.all();
			const { orgs } = data;
			setOrganizations(orgs as unknown as Organization[]);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const getOrganization = async (id: number) => {
		setLoading(true);
		try {
			const { data } = await OrgEndPoints.find(id);
			const { org } = data;
			setOrganization(org as unknown as Organization);
			setCredentials(org.credentials as unknown as Credential[]);
			setMembers(org.members_user as unknown as User[]);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const createCredential = async (
		data: Credential
	): Promise<Credential | undefined> => {
		try {
			const response = await CredsEndPoints.create(data);
			const { credential: cred } = response.data;
			if (cred) {
				return cred as unknown as Credential;
			}
		} catch (error) {
			console.error(error);
		}
	};

	const getCredentials = async () => {
		setLoading(true);
		try {
			const { data } = await CredsEndPoints.all();
			const { creds } = data;
			setCredentials(creds as unknown as Credential[]);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const getCredential = async (id: number) => {
		setLoading(true);
		try {
			const response = await CredsEndPoints.find(id);
			const { credential: cred } = response.data;
			setCredential(cred as unknown as CredentialReturn);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const createMember = async (data: Member) => {
		try {
			await TeamEndPoints.add(data);
		} catch (error) {
			console.error(error);
		}
	};

	const getMembers = async () => {
		setLoading(true);
		try {
			const { data } = await TeamEndPoints.all();
			const { members } = data;
			setMembers(members as unknown as User[]);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const getMember = async (id: number) => {
		setLoading(true);
		try {
			const { data } = await TeamEndPoints.find(id);
			const { member } = data;
			setMember(member as unknown as Member);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const upload = async (id: number, data: File) => {
		setUploading(true);
		try {
			await CredsEndPoints.upload(id, data);
		} catch (error) {
			console.error(error);
		} finally {
			setUploading(false);
		}
	};

	return (
		<OrgContext.Provider
			value={{
				organizations,
				organization,
				credentials,
				members,
				loading,
				createOrganization,
				getOrganizations,
				getOrganization,
				setCredentials,
				setMembers,

				createCredential,
				getCredentials,
				getCredential,
				setCredential,
				credential,

				createMember,
				getMembers,
				getMember,
				setMember,
				member,

				uploading,
				setUploading,
				upload,
			}}
		>
			{children}
		</OrgContext.Provider>
	);
};
