import { BaseID } from ".";

declare interface Credential extends BaseID {
    name: string;
    organization_id: number;
    user_id: string;
    enviornmant: Enviornment;
    version: string;

}

export enum Enviornment {
    DEVELOPMENT = 0,
    STAGING = 1,
    PREPRODUCTION = 2,
    PRODUCTION = 3,
}

export interface CredentialField extends BaseID {
    credential_id: number;
    file_id: number;
    key: string;
    value: string;
}

export default Credential;