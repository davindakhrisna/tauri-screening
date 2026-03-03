import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		SERVER_URL: z.string().optional(),
	},

	clientPrefix: "VITE_",

	client: {
		VITE_SERVER_URL: z.string().min(1).optional(),
	},

	runtimeEnv: import.meta.env,

	emptyStringAsUndefined: true,
});
