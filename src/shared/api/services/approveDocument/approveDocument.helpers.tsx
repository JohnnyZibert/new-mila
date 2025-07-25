import { ApproveDocumentApi } from "./approveDocument.api.ts";
import {
  type ApproveDocumentResponse,
  type DocType,
} from "./approveDocument.types.ts";
import type { ApiResponse } from "../../../config/axios";
import type { UseQueryOptions } from "@tanstack/react-query";

export const getApproveDocumentOpt = (
  docType: DocType,
): UseQueryOptions<ApiResponse<ApproveDocumentResponse>> => ({
  queryKey: ["approve-document", docType],
  queryFn: () => ApproveDocumentApi.approveDocuments(docType),
});
