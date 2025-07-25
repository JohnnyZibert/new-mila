import { makeRequest } from "../../../config/axios/makeRequest";
import { APPROVE_DOCUMENT_ENDPOINTS } from "./approveDocument.constants.ts";
import {
  type ApproveDocumentResponse,
  type DocType,
} from "./approveDocument.types.ts";

export class ApproveDocumentApi {
  static async approveDocuments(docType: DocType) {
    return makeRequest<ApproveDocumentResponse>({
      url: APPROVE_DOCUMENT_ENDPOINTS.approveDoc,
      method: "POST",
      data: { type: docType },
    });
  }
}
