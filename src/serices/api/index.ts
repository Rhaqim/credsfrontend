import { BASEURL } from "@/config";

export const AuthRoutes = {
	login: `${BASEURL}/auth/login`,
	register: `${BASEURL}/auth/register`,
    
    googleLogin: `${BASEURL}/auth/google/login`,
    
	logout: `${BASEURL}/auth/logout`,

	me: `${BASEURL}/auth/me`,
};
