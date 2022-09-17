import { useEffect, useState, useRef } from "react";
import { InitializeAuth } from "../auth/init";

export default function IndexPage() {
  const authRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    InitializeAuth().then(async (auth) => {
      setLoaded(true);
      authRef.current = auth;
      const isLoggedIn = await authRef.current.isLoggedIn();
      setLoggedIn(isLoggedIn);
    });
  }, []);
  return (
    <>
      {!loaded && "Loading..."}
      {loaded && (
        <div>
          IsLoggedIn: {loggedIn ? "Yes" : "No"}
          {!loggedIn && (
            <button onClick={() => authRef.current?.loginWithSocial("google")}>
              Login With Google
            </button>
          )}
        </div>
      )}
    </>
  );
}
