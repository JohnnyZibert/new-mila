import { makeRequest } from "../../../config/axios/makeRequest";
import { AUTH_ENDPOINTS } from "./auth.constants.ts";
import { type AuthData, type AuthResponse } from "./auth.types.ts";

export class AuthApi {
  static async auth(authData: AuthData) {
    return makeRequest<AuthResponse>({
      url: AUTH_ENDPOINTS.auth,
      method: "POST",
      data: authData,
    });
  }
}
