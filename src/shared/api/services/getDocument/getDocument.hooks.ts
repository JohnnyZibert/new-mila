import { getDocumentOpts } from "./getDocument.helpers.tsx";
import {
  type DocNameType,
  type GetDocumentResponse,
} from "./getDocument.types.ts";
import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "../../../config/axios";

export const approveDocument = (docName: DocNameType) =>
  useQuery<ApiResponse<GetDocumentResponse>>(getDocumentOpts(docName));
