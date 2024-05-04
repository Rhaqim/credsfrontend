import { create } from "domain";
import { apiFunctions } from "./providers";
import { AuthRoutes, OrgRoutes, CredsRoutes, TeamRoutes } from "./routes";

import Organization from "@/types/organization.type";
import OrganizationTeam, { OrganizationMember } from "@/types/team.type";

const { get, post, upload } = apiFunctions;

export const AuthEndPoints = {
	me: () => get(AuthRoutes.me),
	logout: () => get(AuthRoutes.logout),
};

export const OrgEndPoints = {
	create: (data: Organization) => post(OrgRoutes.create, data),
	all: () => get(OrgRoutes.all),
	find: (id: number) => get(OrgRoutes.one(id)),
};

export const CredsEndPoints = {
	create: (data: any) => post(CredsRoutes.create, data),
	all: () => get(CredsRoutes.all),
	find: (id: number) => get(CredsRoutes.one(id)),
	upload: (id: number, data: File) => upload(CredsRoutes.upload(id), data),
};

export const TeamEndPoints = {
	create: (data: OrganizationTeam) => post(TeamRoutes.create, data),
	all: () => get(TeamRoutes.all),
	find: (id: number) => get(TeamRoutes.one(id)),
	invite: (email: string, data: OrganizationMember) =>
		post(`${TeamRoutes.invite}?email=${email}`, data),
	add: (data: any) => post(TeamRoutes.add, data),
};
