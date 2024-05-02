"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { OrgEndPoints, CredsEndPoints, TeamEndPoints } from "@/services/api";
import Organization from "@/types/organization.type";
import Credential from "@/types/credential.type";
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

	createCredential: (data: Credential) => void;
	getCredentials: () => void;
	getCredential: (id: number) => void;
	setCredential: (data: Credential) => void;

	createMember: (data: Member) => void;
	getMembers: () => void;
	getMember: (id: number) => void;
	setMember: (data: Member) => void;
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

	createCredential: (data: Credential) => {},
	getCredentials: () => {},
	getCredential: (id: number) => {},
	setCredential: (data: Credential) => {},

	createMember: (data: Member) => {},
	getMembers: () => {},
	getMember: (id: number) => {},
	setMember: (data: Member) => {},
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
	const [credential, setCredential] = useState<Credential | null>(null);
	const [member, setMember] = useState<Member | null>(null);
	const [members, setMembers] = useState<User[]>([]);
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

	const createCredential = async (data: Credential) => {
		try {
			await CredsEndPoints.create(data);
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
			const { data } = await CredsEndPoints.find(id);
			const { cred } = data;
			setCredential(cred as unknown as Credential);
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

				createMember,
				getMembers,
				getMember,
				setMember,
			}}
		>
			{children}
		</OrgContext.Provider>
	);
};
