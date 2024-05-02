import { BaseID } from ".";

declare interface OrganizationMember extends BaseID {
    organization_id: number;
    user_id: number;
    role: OrganizationRole;
    status: OrganizationMemberStatus;
}

export enum OrganizationRole {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
}

export enum OrganizationMemberStatus {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}

export default OrganizationMember;