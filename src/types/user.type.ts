declare interface User {
	ID?: string;
	display_name: string;
	email: string;
	oauth_id: string;
	refresh_token?: string;
	CreatedAt?: Date;
	UpdatedAt?: Date;
}

export default User;