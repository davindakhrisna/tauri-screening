import { Bot } from "lucide-react";
import { Label } from "@/components/ui";

export const addSoon = () => {
	return (
		<div className="h-full border-border border-2 rounded-lg bg-muted/50 flex items-center justify-center">
			<div className="flex items-center justify-center flex-col gap-4">
				<Bot className="size-10" />
				<Label className="text-lg text-muted-foreground">
					Feature will be added soon! Stay tuned.
				</Label>
			</div>
		</div>
	);
};

export default addSoon;
