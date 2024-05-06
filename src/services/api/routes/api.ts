import { create } from "domain";

// API Routes
const org = '/api/organization';
export const OrgRoutes = {
	all: `${org}`,
	one: (orgId: number) => `${org}/${orgId}`,
	create: `${org}/create`,
};

const cred = `${org}/credential`;
export const CredsRoutes = {
	all: `${cred}`,
	one: (credId: number) => `${cred}/${credId}`,
	create: `${cred}/create`,
	upload: (credId: number) => `${cred}/${credId}/upload`,
	fields: (credId: number) => `${cred}/fields/${credId}`,
};

const team = `${org}/team`;
export const TeamRoutes = {
	create: `${team}/create`,
	all: `${team}`,
	one: (memId: number) => `${team}/${memId}`,
	add: `${team}/add`,
	invite: `${team}/invite`,
}