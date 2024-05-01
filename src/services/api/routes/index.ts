export const AuthRoutes = {
	login: (provider: "google" | "github") => `/auth/${provider}/login`,
	logout: "/auth/logout",
	me: "/auth/me",
};

export const OrgRoutes = {
	all: "/organization",
	one: (orgId: string) => `/organization/${orgId}`,
	create: "/organization/create",
};

export const CredsRoutes = {
	all: "/organization/credentials",
	one: (credId: string) => `/organization/credentials/${credId}`,
	create: "/organization/credentials/create",
	upload: (credId: string) => `/organization/credentials/${credId}/upload`,
};

export const TeamRoutes = {
	all: "/organization/team",
	one: (memId: string) => `/organization/team/${memId}`,
	add: '/organization/team/add',
}