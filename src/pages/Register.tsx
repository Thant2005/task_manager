import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { error, isPending, useSignUp } = useAuth();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    let userData = {
      email,
      password,
      username,
    };
    await useSignUp(userData);
  };
  return (
    <div className="mx-auto shadow-xl max-w-2xl rounded-lg bg-white md:px-13 px-4  md:py-6 py-3 ">
      <div className="md:mb-4 mb-2">
        <h2 className="text-center text-ink md:text-3xl text-lg font-bold">
          Sign Up
        </h2>
        <p className="text-sm font-semibold text-zinc-500 text-center">
          Create an account to get started.
        </p>
      </div>
      <form className="md:space-y-5 space-y-3" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="" className="block text-lg text-ink font-bold  ">
            Username
          </label>
          <input
            value={username}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            type="text"
            placeholder="Username"
            className="py-2 px-4 w-full rounded-lg border border-line bg-surface outline-none transition  focus:border-ink focus:ring-2 focus:ring-ink/10"
          />
        </div>
        <div>
          <label htmlFor="" className="block text-lg text-ink font-bold  ">
            Email
          </label>
          <input
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            type="text"
            placeholder="you@example.com"
            className="py-2 px-4 w-full rounded-lg border border-line bg-surface outline-none transition  focus:border-ink focus:ring-2 focus:ring-ink/10"
          />
        </div>
        <div>
          <label htmlFor="" className="block text-lg text-ink font-bold  ">
            Password
          </label>
          <input
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            type="password"
            placeholder="Enter your Email"
            className="py-2 px-4 w-full rounded-lg border border-line bg-surface outline-none transition focus:border-ink focus:ring-2 focus:ring-ink/10"
          />
        </div>
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
        <div className="w-full">
          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-ink text-lg font-medium text-white rounded-lg py-2 px-3"
          >
            Register
          </button>
        </div>
      </form>

      <div className="flex items-center justify-center md:my-5 my-2 mb-6">
        <span className="md:text-sm text-xs text-zinc-500">
          Already have an account?
        </span>
        <Link
          className="text-ink text-xs md:text-sm decoration-1 underline hover:text-blue-600 decoration-black"
          to={"/login"}
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default Register;
