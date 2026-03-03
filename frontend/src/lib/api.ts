export interface Settings {
	ocr_engine: "gpu" | "cpu";
	stt_engine: "gpu" | "cpu";
	stt_size: "tiny" | "base" | "small";
	api_key: string;
}

export interface SettingsUpdate {
	ocr_engine: "gpu" | "cpu";
	stt_engine: "gpu" | "cpu";
	stt_size: "tiny" | "base" | "small";
	api_key: string;
}

export async function getSettings(): Promise<Settings> {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/sqlite/settings`,
	);
	if (!response.ok) {
		throw new Error("Failed to fetch settings");
	}
	return response.json();
}

export async function updateSettings(data: SettingsUpdate): Promise<Settings> {
	const response = await fetch(
		`${import.meta.env.VITE_SERVER_URL}/sqlite/settings`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		},
	);
	if (!response.ok) {
		const error = await response
			.json()
			.catch(() => ({ detail: "Failed to update settings" }));
		throw new Error(error.detail || "Failed to update settings");
	}
	return response.json();
}
