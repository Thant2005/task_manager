import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface AuthCredentials {
  email: string;
  password: string;
  username?: string;
}
interface UseAuthReturn {
  error: string | null;
  isPending: boolean;
  useSignInWithGoogle: () => Promise<void>;
  useSignOut: () => Promise<void>;
  useSignIn: (credentials: AuthCredentials) => Promise<void>;
  useSignUp: (credentials: AuthCredentials) => Promise<void>;
}
const useAuth = (): UseAuthReturn => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setPending] = useState(false);
  const useSignInWithGoogle = async () => {
    setPending(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    setPending(false);

    if (error) {
      setError(error?.message);
    }
  };
  const useSignIn = async (credentials: AuthCredentials) => {
    setPending(true);
    const { error } = await supabase.auth.signInWithPassword(credentials);
    setPending(false);
    if (error) {
      setError(error.message);
    }
  };
  const useSignUp = async (credentials: AuthCredentials) => {
    setPending(true);
    const { error } = await supabase.auth.signUp({
      email: credentials.email,
      password: credentials.password,

      options: {
        data: {
          full_name: credentials.username,
        },
      },
    });
    setPending(false);
    if (error) setError(error.message);
  };
  const useSignOut = async () => {
    setPending(true);
    const { error } = await supabase.auth.signOut();
    setPending(false);
    if (error) setError(error.message);
  };

  return {
    isPending,
    error,
    useSignInWithGoogle,
    useSignIn,
    useSignUp,
    useSignOut,
  };
};

export default useAuth;
