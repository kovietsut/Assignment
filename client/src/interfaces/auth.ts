type TToken = {
  accessToken?: string;
  refreshToken?: string;
};

type TData = {
  email?: string;
  fullName?: string;
  tokenData: TToken;
};

export type TAuthCredential = {
  data: TData;
};

export type TAuthState = {
  credential: TAuthCredential | null;
};

export type TAuthEvent = {
  isAuthenticated: () => boolean;
  setCredential: (value: TAuthCredential) => void;
  signOut: () => void;
  reset: () => void;
};

export type TAuthStore = TAuthState & TAuthEvent;
