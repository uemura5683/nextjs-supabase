import { AppProps } from "next/app";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const { pathname, push } = useRouter();
  const [loading, setLoading] = useState(true);

  supabase.auth.onAuthStateChange((_, session) => {
    console.log(process.env.SUPABASE_URL);
    if (session?.user && (pathname === "/signin" || pathname === "/signup")) {
      push("/");
    } else if (!session?.user && pathname !== "/signup") {
      push("/signin");
    }
  });

  useEffect(() => {
    (async () => {
      const user = supabase.auth.user();
      if (user && (pathname === "/signin" || pathname === "/signup")) {
        await push("/");
      } else if (!user && pathname !== "/signup") {
        await push("/signin");
      }
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <div className="wrapper">
            <div className="wrapperinner">
              <h1>loading...</h1>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="wrapper">
            <div className="wrapperinner">
              <Component {...pageProps} />
              <button className="logoutbtn" onClick={() => supabase.auth.signOut()}>ログアウト</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
