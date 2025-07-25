import { SignDocumentsApi } from "./signDocuments.api.ts";
import {
  type SignDocumentResponse,
  type SignStatus,
} from "./signDocuments.types.ts";
import type { ApiResponse } from "../../../config/axios";
import type { UseQueryOptions } from "@tanstack/react-query";

export const getSignDocumentsOpt = (
  signStatus: SignStatus,
): UseQueryOptions<ApiResponse<SignDocumentResponse>> => ({
  queryKey: ["sign-status", signStatus],
  queryFn: () => SignDocumentsApi.signDocuments(signStatus),
});
