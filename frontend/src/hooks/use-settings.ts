import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
	getSettings,
	type Settings,
	type SettingsUpdate,
	updateSettings,
} from "@/lib/api";

export function useSettings() {
	return useQuery<Settings>({
		queryKey: ["settings"],
		queryFn: getSettings,
	});
}

export function useUpdateSettings() {
	const queryClient = useQueryClient();

	return useMutation<Settings, Error, SettingsUpdate>({
		mutationFn: updateSettings,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["settings"] });
		},
	});
}
