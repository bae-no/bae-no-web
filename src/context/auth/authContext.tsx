import {
  createContext,
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import supabase from "src/lib/supabase";

export type AuthContextProps = {
  user?: User;
  session?: Session;
  signInWithGoogle: () => void;
  signOut: () => void;
  loading: boolean;
  loggedIn: boolean;
};

export const AuthContext = createContext<Partial<AuthContextProps>>({});

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [loggedIn, setLoggedIn] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ provider: "google" });
      if (error) {
        console.log(error);
      } else {
        console.log("success");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const signOut = async () => supabase.auth.signOut();

  useEffect(() => {
    const users = supabase.auth.user();
    const sessions = supabase.auth.session();

    if (users && sessions) {
      setUser(users);
      setLoggedIn(true);
      setSession(sessions);
      // 유저정보가 있을시에 라우텅
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          setLoggedIn(true);
          setSession(session);
          // 유저 정보가 있을시에 라우팅
        } else {
          setUser(undefined);
          setLoading(false);
          setLoggedIn(false);
          setSession(undefined);
          // 유저정보가 없으면 로그인 라우팅
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      signInWithGoogle,
      signOut,
      loading,
      loggedIn,
      session,
    }),
    [loading, loggedIn, user, session]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
