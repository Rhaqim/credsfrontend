import { Environment } from "@/types/credential.type";

export const envString = (env: number) => {
    switch (env) {
        case Environment.DEVELOPMENT:
            return "Development";
        case Environment.STAGING:
            return "Staging";
        case Environment.PREPRODUCTION:
            return "Preproduction";
        case Environment.PRODUCTION:
            return "Production";
        default:
            return "Development";
    }
}