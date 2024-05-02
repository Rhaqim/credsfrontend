import { BaseID } from ".";

export enum Environment {
    DEVELOPMENT = 1,
    STAGING = 2,
    PREPRODUCTION = 3,
    PRODUCTION = 4,
}

export interface CredentialField extends BaseID {
    credential_id: number;
    file_id?: number;
    key: string;
    value: string;
}

export interface CredentialFile extends BaseID {
    credential_id: number;
    file_name: string;
    file_size: number;
    file_data: string;
    file_format: string;
} 


declare interface Credential extends BaseID {
    name: string;
    organization_id: Number;
    environment: Environment;
    user_id?: Number;
    version?: string;
}

interface Field {
    key: string;
    value: string;
}

export interface CredentialReturn  {
    credential: Credential;
    fields?: Field[];
    file?: CredentialFile;
}
    

export default Credential;