import Organization, { OrganizationType } from "@/types/organization.type";

export type Action =
	| { type: "SET_ORGANIZATION_NAME"; payload: string }
	| { type: "SET_DESCRIPTION"; payload: string }
	| { type: "SET_ORGANIZATION_TYPE"; payload: OrganizationType };

export const initialState: Organization = {
	organization_name: "",
	description: "",
	organization_type: OrganizationType.PERSONAL,
};

export const reducer = (state: Organization, action: Action) => {
	switch (action.type) {
		case "SET_ORGANIZATION_NAME":
			return { ...state, organization_name: action.payload };
		case "SET_DESCRIPTION":
			return { ...state, description: action.payload };
		case "SET_ORGANIZATION_TYPE":
			return { ...state, organization_type: action.payload };
		default:
			return state;
	}
};
