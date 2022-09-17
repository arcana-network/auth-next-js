import { AuthProvider } from "https://cdn.jsdelivr.net/npm/@arcana/auth/dist/standalone/auth.esm.js";

let auth;

const InitializeAuth = async () => {
  if (!auth) {
    auth = new AuthProvider(process.env.NEXT_PUBLIC_ARCANA_APP_ID);
    await auth.init({ appMode: 2, position: "right" });
  }
  return auth;
};

export { InitializeAuth };
