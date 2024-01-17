import { getAuth } from "../auth/getArcanaAuth";
import { ProvideAuth } from "@arcana/auth-react";
import Layout from "../components/layout";

const auth = getAuth();

export default function App({ Component, pageProps }) {
  return (
    <ProvideAuth provider={auth}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ProvideAuth>
  );
}
