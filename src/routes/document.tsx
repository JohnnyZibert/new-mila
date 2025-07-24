import { createFileRoute } from "@tanstack/react-router";
import { DocumentPage } from "../entyties/DocumentPage/DocumentPage.tsx";

export const Route = createFileRoute("/document")({
  component: () => <DocumentPage />,
});
