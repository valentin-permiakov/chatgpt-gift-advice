import Layout from "@/components/Layout/Layout";
import { AppProps } from "next/app";
import "@/styles/main.global.scss";
import "@/styles/_variables.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
