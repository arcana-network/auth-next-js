import React from "react";
import { useAuth } from "@arcana/auth-react";
import Loader from "../components/loader";
import { Info } from "../components/info";
import styles from "./index.module.css";

export default function IndexPage() {
  const { user, connect, isLoggedIn, loading, loginWithSocial, provider } =
    useAuth();

  const onConnectClick = async () => {
    try {
      await connect();
    } catch (e) {
      console.log(e);
    }
  };

  const onConnect = () => {
    console.log("connected");
  };

  React.useEffect(() => {
    provider.on("connect", onConnect);
    return () => {
      provider.removeListener("connect", onConnect);
    };
  }, [provider]);

  if (loading) {
    return <Loader secondaryColor="#101010" strokeColor="#101010" />;
  }

  if (!isLoggedIn) {
    return (
      <button className={styles.Btn} onClick={onConnectClick}>
        Connect
      </button>
    );
  }
  return <Info info={user} />;
}
