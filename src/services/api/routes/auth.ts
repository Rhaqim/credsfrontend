// Auth Routes
export const AuthRoutes = {
	login: (provider: "google" | "github") => `/auth/${provider}/login`,
	logout: "/auth/logout",
	me: "/auth/me",
};

