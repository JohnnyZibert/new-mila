import { AuthApi } from "./auth.api.ts";
import { type AuthData, type AuthResponse } from "./auth.types.ts";
import type { ApiResponse } from "../../../config/axios";
import type { UseQueryOptions } from "@tanstack/react-query";

export const getAuthPatientOpts = (
  authData: AuthData,
): UseQueryOptions<ApiResponse<AuthResponse>> => ({
  queryKey: ["auth-patient", JSON.stringify(authData)],
  queryFn: () => AuthApi.auth(authData),
});
