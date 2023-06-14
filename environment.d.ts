declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
			PORT?: string;
			OSU_CALLBACK_URL: string;
			OSU_CLIENT_SECRET: string;
			OSU_CLIENT_ID: string;
			FORM_URL: string;
			FORM_USERNAME_FIELD: string;
			FORM_USER_ID_FIELD: string;
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
