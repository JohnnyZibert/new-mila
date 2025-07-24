import { createFileRoute } from "@tanstack/react-router";
import { SignEdoPage } from "../entyties/SignEdoPage/SignEdoPage.tsx";

export const Route = createFileRoute("/sign-edo")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignEdoPage />;
}
