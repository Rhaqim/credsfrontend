"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { OrgEndPoints, CredsEndPoints, TeamEndPoints } from "@/services/api";
import Organization from "@/types/organization.type";
import Credential, { CredentialReturn } from "@/types/credential.type";
import OrganizationTeam, { OrganizationMember } from "@/types/team.type";
import User from "@/types/user.type";

type OrgContextType = {
	organizations: Organization[];
	organization: Organization | null;
	credentials: Credential[];
	teams: OrganizationTeam[];
	members: User[];
	loading: boolean;
	createOrganization: (data: Organization) => void;
	getOrganizations: () => void;
	getOrganization: (id: number) => void;
	setCredentials: (data: Credential[]) => void;
	setTeams: (data: OrganizationTeam[]) => void;
	setMembers: (data: User[]) => void;

	createCredential: (data: Credential) => Promise<Credential | undefined>;
	getCredentials: () => void;
	getCredential: (id: number) => void;
	setCredential: (data: CredentialReturn) => void;
	credential: CredentialReturn | null;

	createTeam: (data: OrganizationTeam) => Promise<OrganizationTeam | undefined>;
	getTeams: () => void;
	getTeam: (id: number) => void;
	setTeam: (data: OrganizationTeam) => void;
	team: OrganizationTeam | null;

	createMember: (data: OrganizationMember) => void;
	getMembers: () => void;
	getMember: (id: number) => void;
	setMember: (data: OrganizationMember) => void;
	member: OrganizationMember | null;

	uploading: boolean;
	setUploading: (data: boolean) => void;
	upload: (id: number, data: File) => Promise<void>;
};

export const OrgContext = createContext<OrgContextType>({
	organizations: [],
	organization: null,
	credentials: [],
	teams: [],
	members: [],
	loading: false,
	createOrganization: (data: Organization) => {},
	getOrganizations: () => {},
	getOrganization: (id: number) => {},
	setCredentials: (data: Credential[]) => {},
	setTeams: (data: OrganizationTeam[]) => {},
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

	createTeam: async (
		data: OrganizationTeam
	): Promise<OrganizationTeam | undefined> => {
		return;
	},
	getTeams: () => {},
	getTeam: (id: number) => {},
	setTeam: (data: OrganizationTeam) => {},
	team: null,

	createMember: (data: OrganizationMember) => {},
	getMembers: () => {},
	getMember: (id: number) => {},
	setMember: (data: OrganizationMember) => {},
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

	const [teams, setTeams] = useState<OrganizationTeam[]>([]);
	const [team, setTeam] = useState<OrganizationTeam | null>(null);

	const [members, setMembers] = useState<User[]>([]);
	const [member, setMember] = useState<OrganizationMember | null>(null);

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
			setTeams(org.teams as unknown as OrganizationTeam[]);
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

	const createTeam = async (data: OrganizationTeam): Promise<OrganizationTeam | undefined> => {
		try {
			const response = await TeamEndPoints.add(data);
			const { team } = response.data;
			if (team) {
				return team as unknown as OrganizationTeam;
			}
		} catch (error) {
			console.error(error);
		}
	}

	const getTeams = async () => {
		setLoading(true);
		try {
			const { data } = await TeamEndPoints.all();
			const { teams } = data;
			setTeams(teams as unknown as OrganizationTeam[]);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const getTeam = async (id: number) => {
		setLoading(true);
		try {
			const { data } = await TeamEndPoints.find(id);
			const { team } = data;
			setTeam(team as unknown as OrganizationTeam);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const createMember = async (data: OrganizationMember) => {
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
			setMember(member as unknown as OrganizationMember);
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
				teams,
				members,
				loading,
				createOrganization,
				getOrganizations,
				getOrganization,
				setCredentials,
				setTeams,
				setMembers,

				createCredential,
				getCredentials,
				getCredential,
				setCredential,
				credential,

				createTeam,
				getTeams,
				getTeam,
				setTeam,
				team,

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
