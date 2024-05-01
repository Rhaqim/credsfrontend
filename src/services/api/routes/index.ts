// Auth Routes
export const AuthRoutes = {
	login: (provider: "google" | "github") => `/auth/${provider}/login`,
	logout: "/auth/logout",
	me: "/auth/me",
};

// API Routes
export const OrgRoutes = {
	all: `/api/organization`,
	one: (orgId: Number) => `/api/organization/${orgId}`,
	create: `/api/organization/create`,
};

export const CredsRoutes = {
	all: `/api/organization/credentials`,
	one: (credId: Number) => `/api/organization/credentials/${credId}`,
	create: `/api/organization/credentials/create`,
	upload: (credId: Number) => `/api/organization/credentials/${credId}/upload`,
};

export const TeamRoutes = {
	all: `/api/organization/team`,
	one: (memId: Number) => `/api/organization/team/${memId}`,
	add: '/organization/team/add',
}