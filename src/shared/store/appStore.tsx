import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";
import type { AppStoreTypes } from "./appStore.types.ts";

export const useAppStore = create<AppStoreTypes>()(
  // persist(
  (set) => ({
    isSignStatus: false,
    setIsSignStatus: (signValue: boolean) =>
      set((state) => ({ ...state, isSignStatus: signValue })),
    // jwtToken: null,
    // refreshToken: null,
    // login: ({ jwtToken, refreshToken }: ITokenResponse) =>
    //   set((state) => ({ ...state, jwtToken, refreshToken })),
    //
    // setRefreshToken: (refreshToken: string) =>
    //   set((state) => ({ ...state, refreshToken: refreshToken })),
    // setNewToken: (newToken: string) =>
    //   set((state) => ({ ...state, jwtToken: newToken })),
    // setEmail: (email: string) => set((state) => ({ ...state, email })),
  }),

  //   {
  //     name: "token",
  //     storage: createJSONStorage(() => localStorage),
  //   },
  // ),
);
