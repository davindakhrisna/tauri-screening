import { atom } from "jotai";
import type { Settings } from "@/lib/api";

export const settingsAtom = atom<Settings | null>(null);
export const originalSettingsAtom = atom<Settings | null>(null);

export const apiKeyAtom = atom(
	(get) => get(settingsAtom)?.api_key ?? "",
	(get, set, value: string) => {
		const current = get(settingsAtom);
		if (current) {
			set(settingsAtom, { ...current, api_key: value });
		}
	},
);

export const sttEngineAtom = atom(
	(get) => get(settingsAtom)?.stt_engine ?? "gpu",
	(get, set, value: "gpu" | "cpu") => {
		const current = get(settingsAtom);
		if (current) {
			set(settingsAtom, { ...current, stt_engine: value });
		}
	},
);

export const ocrEngineAtom = atom(
	(get) => get(settingsAtom)?.ocr_engine ?? "gpu",
	(get, set, value: "gpu" | "cpu") => {
		const current = get(settingsAtom);
		if (current) {
			set(settingsAtom, { ...current, ocr_engine: value });
		}
	},
);

export const sttSizeAtom = atom(
	(get) => get(settingsAtom)?.stt_size ?? "tiny",
	(get, set, value: "tiny" | "base" | "small") => {
		const current = get(settingsAtom);
		if (current) {
			set(settingsAtom, { ...current, stt_size: value });
		}
	},
);

export const hasChangesAtom = atom((get) => {
	const settings = get(settingsAtom);
	const original = get(originalSettingsAtom);
	if (!settings || !original) return false;
	return (
		settings.api_key !== original.api_key ||
		settings.stt_engine !== original.stt_engine ||
		settings.ocr_engine !== original.ocr_engine ||
		settings.stt_size !== original.stt_size
	);
});
