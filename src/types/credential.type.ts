import { BaseID } from ".";

declare interface Credential extends BaseID {
    name: string;
    organization_id: number;
    user_id: string;
    environment: Enviornment;
    version: string;

}

export enum Enviornment {
    DEVELOPMENT = "development",
    STAGING = "staging",
    PREPRODUCTION = "preproduction",
    PRODUCTION = "production",
}

export interface CredentialField extends BaseID {
    credential_id: number;
    file_id: number;
    key: string;
    value: string;
}

export default Credential;