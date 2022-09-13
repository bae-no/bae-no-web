import { useEffect } from "react";

const Acess = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const getKakaoToken = new URLSearchParams(window.location.search).get(
      "code",
    );
    const getGoogleToken = new URLSearchParams(
      window.location.hash.substring(1),
    ).get("access_token");
    console.log(getKakaoToken, getGoogleToken);
  }, []);
  return <div>acess 페이지</div>;
};

export default Acess;
