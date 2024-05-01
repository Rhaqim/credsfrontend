import { BaseID } from ".";

declare interface OrganizationMember extends BaseID {
    organization_id: number;
    user_id: number;
    role: OrganizationRole;
}

export enum OrganizationRole {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
}

export default OrganizationMember;