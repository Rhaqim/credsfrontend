import { BaseID } from ".";

declare interface User extends BaseID {
	display_name: string;
	email: string;
	oauth_id: string;
	refresh_token?: string;
}

export default User;
