import { createFileRoute } from "@tanstack/react-router";
import { GosUslugiAuthPage } from "../entyties/GosUslugiAuthPage/GosUslugiAuthPage.tsx";

export const Route = createFileRoute("/gos-uslugi")({
  component: RouteComponent,
});

function RouteComponent() {
  return <GosUslugiAuthPage />;
}
