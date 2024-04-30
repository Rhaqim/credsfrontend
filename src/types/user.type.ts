declare interface User {
	ID?: string;
	Displayname: string;
	Email: string;
	OAuthID: string;
	RefreshToken?: string;
	CreatedAt?: Date;
	UpdatedAt?: Date;
}

export default User;