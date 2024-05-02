import Credential, { Environment } from "@/types/credential.type";

type Action =
	| { type: "SET_CREDENTIAL_NAME"; payload: string }
	| { type: "SET_ENVIRONMENT"; payload: Environment };

export const initialState: Credential = {
	name: "",
	organization_id: 0,
	environment: Environment.DEVELOPMENT,
};

export const reducer = (state: Credential, action: Action): Credential => {
	switch (action.type) {
		case "SET_CREDENTIAL_NAME":
			return { ...state, name: action.payload };
		case "SET_ENVIRONMENT":
			return { ...state, environment: action.payload };
		default:
			return state;
	}
};
