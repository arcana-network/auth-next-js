import React from "react";
import { useArcanaAuth } from "../auth/useArcanaAuth";

export default function IndexPage() {
  const { isLoggedIn, loading, loginWithSocial, provider } = useArcanaAuth();
  const onConnect = () => {
    console.log("connected");
  };
  React.useEffect(() => {
    provider.on("connect", onConnect);
    return () => {
      provider.removeListener("connect", onConnect);
    };
  }, [provider]);
  return (
    <>
      {loading && "Loading..."}
      {!loading && (
        <div>
          IsLoggedIn: {isLoggedIn ? "Yes" : "No"}
          {!isLoggedIn && (
            <button onClick={() => loginWithSocial("google")}>
              Login With Google
            </button>
          )}
        </div>
      )}
    </>
  );
}
