import { makeRequest } from "../../../config/axios/makeRequest";
import { SING_DOCUMENTS_ENDPOINTS } from "./signDocuments.constants.ts";
import {
  type SignDocumentResponse,
  type SignStatus,
} from "./signDocuments.types.ts";

export class SignDocumentsApi {
  static async signDocuments(signStatus: SignStatus) {
    return makeRequest<SignDocumentResponse>({
      url: SING_DOCUMENTS_ENDPOINTS.sign,
      method: "POST",
      data: { action: signStatus },
    });
  }
}
