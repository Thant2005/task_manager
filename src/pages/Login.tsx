import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isPending, useSignInWithGoogle, useSignIn } = useAuth();
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    let userData = {
      email,
      password,
    };
    await useSignIn(userData);
    setEmail("");
    setPassword("");
  };
  console.log("login screen rendering");
  return (
    <div className="mx-auto bg-white shadow-xl max-w-2xl rounded-lg  md:px-13 px-4 md:py-6 py-3">
      <div className="md:mb-4 mb-2">
        <h2 className="text-center text-ink md:text-3xl text-lg font-bold">
          Sign In
        </h2>
        <p className="text-sm font-semibold text-zinc-500 text-center">
          Acess to your account with email or google.
        </p>
      </div>
      <form className="md:space-y-5 space-y-3" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="" className="block text-lg text-ink font-bold  ">
            Email
          </label>
          <input
            autoComplete="email"
            type="text"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your Email"
            className="py-2 px-4 w-full rounded-lg border border-line bg-surface outline-none transition  focus:border-ink focus:ring-2 focus:ring-ink/10"
          />
        </div>
        <div>
          <label htmlFor="" className="block text-lg text-ink font-bold  ">
            Password
          </label>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Enter your Email"
            className="py-2 px-4 w-full rounded-lg border border-line bg-surface outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10"
          />
        </div>
        {error && <p className="text-sm text-center text-red-500">{error}</p>}
        <div className="w-full">
          <button
            disabled={isPending}
            className={`w-full bg-ink text-lg ${isPending ? "bg-zinc-600" : ""} font-medium text-white rounded-lg py-2 px-3`}
          >
            Login
          </button>
        </div>
      </form>
      <div className="my-6 flex items-center text-xs text-muted gap-3">
        <div className="flex-1 h-px bg-line"></div>
        <span>or Continue with</span>
        <div className="flex-1 h-px bg-line"></div>
      </div>
      <div className="my-5">
        <button
          disabled={isPending}
          onClick={useSignInWithGoogle}
          className="flex items-center gap-3 justify-center w-full border border-line px-4 py-3 rounded-lg cursor-pointer bg-white hover:bg-surface"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="h-5 w-5"
          />
          Login with Google
        </button>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-sm text-zinc-500">Don't have an account? </span>
        <Link
          className="text-ink decoration-1 underline hover:text-blue-600 decoration-black"
          to={"/register"}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
