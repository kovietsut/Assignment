import {
  type TAuthCredential,
  type TAuthState,
  type TAuthStore,
} from "@/interfaces/auth";
import { logger } from "@/utils/store.log";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const initialState: TAuthState = {
  credential: null,
};

const authStore = create<TAuthStore>()(
  persist(
    logger<TAuthStore>((set, get) => ({
      ...initialState,
      isAuthenticated: () => Boolean(get().credential),
      setCredential: (value: TAuthCredential) => {
        if (value?.data.tokenData.accessToken) {
          axios.defaults.headers.common.Authorization = `Bearer ${value?.data.tokenData.accessToken}`;
        } else {
          delete axios.defaults.headers.common.Authorization;
        }
        set({ credential: value });
      },
      reset: () => set({ ...initialState }),
      signOut: () => get().reset(),
    })),
    {
      name: "auth",
      storage: createJSONStorage(() => localStorage),
      partialize: (state: TAuthStore) => ({
        credential: state.credential,
      }),
    }
  )
);

export default authStore;
