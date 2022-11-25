import { useArcanaAuth } from "../auth/init";

export default function IndexPage() {
  const { isLoggedIn, loading, loginWithSocial, provider } = useArcanaAuth();
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
