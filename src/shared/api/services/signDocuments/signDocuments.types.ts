export interface SignDocumentResponse {
  status: string;
  message: string;
}

export type SignStatus = "onSigning" | "onReject";
