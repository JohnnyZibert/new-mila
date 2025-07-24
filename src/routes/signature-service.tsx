import { createFileRoute } from "@tanstack/react-router";
import { ElectronicSignaturePage } from "../entyties/ElectronicSignaturePage/ElectronicSignaturePage.tsx";

export const Route = createFileRoute("/signature-service")({
  component: () => <ElectronicSignaturePage />,
});
