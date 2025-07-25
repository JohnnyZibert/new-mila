import { getSignDocumentsOpt } from "./signDocuments.helpers.tsx";
import {
  type SignDocumentResponse,
  type SignStatus,
} from "./signDocuments.types.ts";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "../../../config/axios";

export const useSignDocuments = (signStatus: SignStatus) =>
  useQuery<ApiResponse<SignDocumentResponse>>(getSignDocumentsOpt(signStatus));
