import { BaseID } from ".";

declare interface Organization extends BaseID {
	creator_id?: Number;
	organization_name: string;
	description: string;
	organization_type: OrganizationType;
	credentials?: Number[];
	credentialsCount?: number;
	members?: Number[];
	membersCount?: number;
}

export enum OrganizationType {
	COMPANY = "company",
	PERSONAL = "personal",
	COMMERCIAL = "commercial",
	EDUCATIONAL = "educational",
}

export default Organization;
