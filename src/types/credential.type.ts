import { BaseID } from ".";

declare interface Credential extends BaseID {
    name: string;
    organization_id: Number;
    environment: Environment;
    user_id?: Number;
    version?: string;

}

export enum Environment {
    DEVELOPMENT = 1,
    STAGING = 2,
    PREPRODUCTION = 3,
    PRODUCTION = 4,
}

export interface CredentialField extends BaseID {
    credential_id: number;
    file_id: number;
    key: string;
    value: string;
}

export default Credential;