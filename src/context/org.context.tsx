"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { OrgEndPoints } from "@/services/api";
import Organization from "@/types/organization.type";
import Credential from "@/types/credential.type";
import Member from "@/types/team.type";

type OrgContextType = {
	organizations: Organization[];
	organization: Organization | null;
	credentials: Credential[];
	members: Member[];
	loading: boolean;
	createOrganization: (data: Organization) => void;
	getOrganizations: () => void;
	getOrganization: (id: number) => void;
	setCredentials: (data: Credential[]) => void;
	setMembers: (data: Member[]) => void;
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
	setMembers: (data: Member[]) => {},
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
	const [members, setMembers] = useState<Member[]>([]);
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
			setMembers(org.members as unknown as Member[]);
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
			}}
		>
			{children}
		</OrgContext.Provider>
	);
};
