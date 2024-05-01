"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import { OrgEndPoints } from "@/services/api";
import Organization from "@/types/organization.type";

type OrgContextType = {
	organizations: Organization[];
	organization: Organization | null;
	loading: boolean;
	createOrganization: (data: Organization) => void;
	getOrganizations: () => void;
	getOrganization: (id: number) => void;
};

export const OrgContext = createContext<OrgContextType>({
	organizations: [],
	organization: null,
	loading: false,
	createOrganization: (data: Organization) => {},
	getOrganizations: () => {},
	getOrganization: (id: number) => {},
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
			setOrganizations(data as unknown as Organization[]);
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
			setOrganization(data as unknown as Organization);
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
				loading,
				createOrganization,
				getOrganizations,
				getOrganization,
			}}
		>
			{children}
		</OrgContext.Provider>
	);
};
