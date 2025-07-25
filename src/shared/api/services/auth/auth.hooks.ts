import { getAuthPatientOpts } from "./auth.helpers.tsx";
import { type AuthData, type AuthResponse } from "./auth.types.ts";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "../../../config/axios";

export const useGetAuthPatient = (authData: AuthData) =>
  useQuery<ApiResponse<AuthResponse>>(getAuthPatientOpts(authData));
