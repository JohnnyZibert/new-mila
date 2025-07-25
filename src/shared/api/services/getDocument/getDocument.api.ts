import { makeRequest } from "../../../config/axios/makeRequest";
import { GET_DOCUMENT_ENDPOINTS } from "./getDocument.constants.ts";
import {
  type DocNameType,
  type GetDocumentResponse,
} from "./getDocument.types.ts";

export class GetDocumentApi {
  static async getDocuments(docName: DocNameType) {
    return makeRequest<GetDocumentResponse>({
      url: GET_DOCUMENT_ENDPOINTS.doc,
      method: "POST",
      data: { action: docName },
    });
  }
}
