import Credential, { Enviornment } from "@/types/credential.type";

export type Action =
    | { type: "SET_CREDENTIAL_NAME"; payload: string }
    | { type: "SET_USER_ID"; payload: string }
    | { type: "SET_ENVIRONMENT"; payload: Enviornment }
    | { type: "SET_VERSION"; payload: string }

export const initialState: Credential = {
    name: "",
    organization_id: 0,
    user_id: "",
    environment: Enviornment.DEVELOPMENT,
    version: "",
};

export const reducer = (state: Credential, action: Action) => {
    switch (action.type) {
        case "SET_CREDENTIAL_NAME":
            return { ...state, name: action.payload };
        case "SET_USER_ID":
            return { ...state, user_id: action.payload };
        case "SET_ENVIRONMENT":
            return { ...state, enviornmant: action.payload };
        case "SET_VERSION":
            return { ...state, version: action.payload };
        default:
            return state;
    }
};