import { BaseID } from ".";

declare interface OrganizationTeam extends BaseID {
    name: string;
    manager_id?: number;
    created_by_id?: number;
    organization_id: number;
    privileges: Privileges;
}

export enum Privileges {
    MANAGE = "MANAGE",
    READ = "READ",
}

export interface OrganizationMember extends BaseID {
    organization_id: number;
    user_id: number;
    role: OrganizationRole;
    team_id: number;
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

export default OrganizationTeam;