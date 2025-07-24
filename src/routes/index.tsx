import { createFileRoute } from "@tanstack/react-router";
import { SignPdnPage } from "../entyties/SignPdnPage/SignPdnPage.tsx";

export const Route = createFileRoute("/")({
  component: () => <SignPdnPage />,
});
