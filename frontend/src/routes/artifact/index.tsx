import { createFileRoute } from "@tanstack/react-router";
import AddSoon from "@/components/misc/addSoon";

export const Route = createFileRoute("/artifact/")({
	component: AddSoon,
});
