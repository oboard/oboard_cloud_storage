import "@/styles/globals.css";
import NoSSR from "../components/NoSSR";

export default function App({ Component, pageProps }) {
  return (
    <NoSSR>
      <Component {...pageProps} />
    </NoSSR>
  );
}
