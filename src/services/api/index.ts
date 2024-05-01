import { apiFunctions } from "./providers";
import { AuthRoutes, OrgRoutes } from "./routes";

import Organization from "@/types/organization.type";

const { get, post } = apiFunctions;

export const AuthEndPoints = {
	me: () => get(AuthRoutes.me),
	logout: () => get(AuthRoutes.logout),
};

export const OrgEndPoints = {
	create: (data: Organization) => post(OrgRoutes.create, data),
};