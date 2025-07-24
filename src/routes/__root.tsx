import { createRootRoute } from "@tanstack/react-router";
import { Layout } from "../widgets/Layout/Layout.tsx";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return <Layout />;
}
