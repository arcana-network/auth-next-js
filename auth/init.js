import { AuthProvider } from "@arcana/auth";

let auth = new AuthProvider(process.env.NEXT_PUBLIC_ARCANA_APP_ID);

const InitializeAuth = async () => {
  await auth.init();
  return auth;
};

export { InitializeAuth };
