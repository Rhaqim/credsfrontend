import { BaseID } from ".";
import OrganizationMember from "./team.type";
import Credential from "./credential.type";
import User from "./user.type";

declare interface Organization extends BaseID {
	creator_id?: Number;
	organization_name: string;
	description: string;
	organization_type: OrganizationType;
	credentials?: Credential[];
	credentials_count?: number;
	members?: OrganizationMember[];
	members_user?: User[];
	members_count?: number;
}

export enum OrganizationType {
	COMPANY = "company",
	PERSONAL = "personal",
	COMMERCIAL = "commercial",
	EDUCATIONAL = "educational",
}

export default Organization;
