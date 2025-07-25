import { GetDocumentApi } from "./getDocument.api.ts";
import {
  type DocNameType,
  type GetDocumentResponse,
} from "./getDocument.types.ts";
import type { ApiResponse } from "../../../config/axios";
import type { UseQueryOptions } from "@tanstack/react-query";

export const getDocumentOpts = (
  docName: DocNameType,
): UseQueryOptions<ApiResponse<GetDocumentResponse>> => ({
  queryKey: ["get-document", docName],
  queryFn: () => GetDocumentApi.getDocuments(docName),
});
