import { apiFunctions } from "./providers";
import { AuthRoutes } from "./routes";

const { get, post } = apiFunctions;

export const AuthEndPoints = {
	me: () => get(AuthRoutes.me),
	logout: () => get(AuthRoutes.logout),
};
