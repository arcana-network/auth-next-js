import { AuthProvider } from "@arcana/auth";
import React from "react";
const auth = new AuthProvider(process.env.NEXT_PUBLIC_ARCANA_APP_ID);

const useArcanaAuth = () => {
  const [loading, setLoading] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [availableLogins, setAvailableLogins] = React.useState([]);
  const [user, setUser] = React.useState(null);
  const providerRef = React.useRef(null);

  const loginWithSocial = async (p) => {
    await auth.init();
    await auth.loginWithSocial(p);
  };

  const loginWithLink = async (email) => {
    await auth.init();
    return auth.loginWithLink(email);
  };

  const logout = async () => {
    if (await auth.isLoggedIn()) {
      await auth.logout();
    }
  };

  const onConnectHook = async () => {
    setIsLoggedIn(true);
    const info = await auth.getUser();
    setUser(info);
  };

  const onDisconnectHook = () => {
    setIsLoggedIn(false);
  };

  React.useEffect(() => {
    auth.provider.on("connect", onConnectHook);
    auth.provider.on("disconnect", onDisconnectHook);
    auth.init().then(() => {
      setLoading(false);
      auth.isLoggedIn().then((loggedIn) => {
        if (!loggedIn) {
          auth.getLogins().then((logins) => {
            console.log({ logins });
            setAvailableLogins(logins.filter((l) => l != "passwordless"));
          });
        }
        setIsLoggedIn(loggedIn);
      });
    });
    return () => {
      auth.provider.removeListener("connect", onConnectHook);
      auth.provider.removeListener("disconnect", onDisconnectHook);
    };
  }, []);

  return {
    availableLogins,
    loading,
    loginWithLink,
    loginWithSocial,
    logout,
    provider: auth.provider,
    isLoggedIn,
    user,
    appId: auth.appId,
  };
};

export { useArcanaAuth };
