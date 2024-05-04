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
};

const team = `${org}/team`;
export const TeamRoutes = {
	all: `${team}`,
	one: (memId: number) => `${team}/${memId}`,
	add: '${team}/add',
	invite: '${team}/invite',
}