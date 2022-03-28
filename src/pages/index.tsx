import type { NextPage } from "next";
import { useAuth } from "src/context/auth";

const Home: NextPage = () => {
  const { loggedIn, signInWithGoogle } = useAuth();

  return (
    <div>
      <button type="button" onClick={signInWithGoogle}>
        로그인
      </button>
      <div>
        {loggedIn ? <span>로그인 완료</span> : <span>현재 미로그인</span>}
      </div>
    </div>
  );
};

export default Home;
