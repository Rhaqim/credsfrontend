import { BaseID } from ".";
import OrganizationTeam, { OrganizationMember } from "./team.type";
import Credential from "./credential.type";
import User from "./user.type";

declare interface Organization extends BaseID {
	creator_id?: number;
	organization_name: string;
	description: string;
	organization_type: OrganizationType;
	members?: OrganizationMember[];
	members_user?: User[];
	members_count?: number;
	credentials?: Credential[];
	credentials_count?: number;
	teams?: OrganizationTeam[];
	teams_count?: number;
}

export enum OrganizationType {
	COMPANY = "company",
	PERSONAL = "personal",
	COMMERCIAL = "commercial",
	EDUCATIONAL = "educational",
}

export default Organization;
