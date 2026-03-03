import { createFileRoute } from "@tanstack/react-router";
import { useAtom, useAtomValue } from "jotai";
import { Info } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";
import {
	apiKeyAtom,
	hasChangesAtom,
	ocrEngineAtom,
	originalSettingsAtom,
	settingsAtom,
	sttEngineAtom,
	sttSizeAtom,
} from "@/atoms/settings";
import {
	Button,
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Input,
	Label,
	NativeSelect,
	NativeSelectOption,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui";
import { useSettings, useUpdateSettings } from "@/hooks/use-settings";

export const Route = createFileRoute("/settings/")({
	component: Settings,
});

function Settings() {
	const { data: settings, isLoading } = useSettings();
	const updateMutation = useUpdateSettings();

	const [apiKey, setApiKey] = useAtom(apiKeyAtom);
	const [sttEngine, setSttEngine] = useAtom(sttEngineAtom);
	const [ocrEngine, setOcrEngine] = useAtom(ocrEngineAtom);
	const [sttSize, setSttSize] = useAtom(sttSizeAtom);
	const hasChanges = useAtomValue(hasChangesAtom);
	const [, setOriginalSettings] = useAtom(originalSettingsAtom);
	const [, setSettings] = useAtom(settingsAtom);

	useEffect(() => {
		if (settings) {
			setSettings(settings);
			setOriginalSettings(settings);
		}
	}, [settings, setSettings, setOriginalSettings]);

	const handleSave = async () => {
		try {
			await updateMutation.mutateAsync({
				api_key: apiKey,
				stt_engine: sttEngine,
				ocr_engine: ocrEngine,
				stt_size: sttSize,
			});
			toast.success("Settings saved successfully");
			setOriginalSettings({
				api_key: apiKey,
				stt_engine: sttEngine,
				ocr_engine: ocrEngine,
				stt_size: sttSize,
			});
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to save settings",
			);
		}
	};

	if (isLoading) {
		return (
			<div className="h-full flex justify-center items-center">
				<p>Loading settings...</p>
			</div>
		);
	}

	return (
		<div className="h-full flex justify-center items-center">
			<Card className="w-full max-w-sm flex">
				<CardHeader>
					<CardTitle>Application Configuration</CardTitle>
					<CardDescription>
						Change settings below to suit your device's specification
					</CardDescription>
					<CardAction>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className="flex gap-1 items-center justify-center">
									<Info className="size-4" />
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>App needs to be restarted for changes to have effects</p>
							</TooltipContent>
						</Tooltip>
					</CardAction>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<div className="flex items-center justify-between">
								<Label htmlFor="api-key">Groq API Key</Label>
								<Label className="text-red-400">*required</Label>
							</div>
							<Input
								type="password"
								value={apiKey}
								onChange={(e) => setApiKey(e.target.value)}
								required
							/>
						</div>
						<div className="flex items-center justify-between">
							<div className="grid gap-2">
								<Label>STT</Label>
								<NativeSelect
									value={sttEngine}
									onChange={(e) =>
										setSttEngine(e.target.value as "gpu" | "cpu")
									}
								>
									<NativeSelectOption value="gpu">GPU</NativeSelectOption>
									<NativeSelectOption value="cpu">CPU</NativeSelectOption>
								</NativeSelect>
							</div>
							<div className="grid gap-2">
								<Label>OCR</Label>
								<NativeSelect
									value={ocrEngine}
									onChange={(e) =>
										setOcrEngine(e.target.value as "gpu" | "cpu")
									}
								>
									<NativeSelectOption value="gpu">GPU</NativeSelectOption>
									<NativeSelectOption value="cpu">CPU</NativeSelectOption>
								</NativeSelect>
							</div>
							<div className="grid gap-2">
								<Label>STT Size</Label>
								<NativeSelect
									value={sttSize}
									onChange={(e) =>
										setSttSize(e.target.value as "tiny" | "base" | "small")
									}
								>
									<NativeSelectOption value="tiny">Tiny</NativeSelectOption>
									<NativeSelectOption value="base">Base</NativeSelectOption>
									<NativeSelectOption value="small">Small</NativeSelectOption>
								</NativeSelect>
							</div>
						</div>
					</div>
				</CardContent>
				<CardFooter className="flex-col gap-2 items-end">
					<Button
						type="submit"
						className="w-full cursor-pointer"
						onClick={handleSave}
						disabled={!hasChanges || updateMutation.isPending}
					>
						{updateMutation.isPending ? "Saving..." : "Save Settings"}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
