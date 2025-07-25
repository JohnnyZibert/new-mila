export interface ApproveDocumentResponse {
  status: string;
  message: string;
}

export type DocType = "pdp" | "edm";

export interface ApproveDocError {
  status: string;
  data: null;
  message: string;
}
