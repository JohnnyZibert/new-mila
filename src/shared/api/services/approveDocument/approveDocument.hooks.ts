import { getApproveDocumentOpt } from "./approveDocument.helpers.tsx";
import {
  type ApproveDocumentResponse,
  type DocType,
} from "./approveDocument.types.ts";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "../../../config/axios";

export const useApproveDocument = (docType: DocType) =>
  useQuery<ApiResponse<ApproveDocumentResponse>>(
    getApproveDocumentOpt(docType),
  );
