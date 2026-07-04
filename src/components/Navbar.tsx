import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import { useAuthContext } from "../contexts/authContext";

function Navbar() {
  const { isPending, useSignOut } = useAuth();
  const { user } = useAuthContext();
  console.log(user);
  const logout = async () => {
    await useSignOut();
  };
  return (
    <header className="border border-line md:mb-10 mb-4 shadow-soft backdrop-blur-sm p-4 sm:p-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4 ">
          <div className="flex  md:h-12 md:w-12 h-8 w-8 items-center justify-center bg-ink text-white">
            <svg
              viewBox="0 0 24 24"
              className="md:h-7 md:w-7 h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M8 6h8M8 10h8M8 14h5" />
              <path d="M4 18h16M7 6l-1 6h2l-1-6z" />
            </svg>
          </div>
          <div>
            <h2 className="font-semibold ">Task Dashboard</h2>
            <p className="md:text-sm text-xs text-zinc-600 ">
              A clean foucs workspace
            </p>
          </div>
        </div>
        <div className="space-x-2 ">
          {user && (
            <button
              type="button"
              disabled={isPending}
              onClick={logout}
              className="text-white cursor-pointer bg-ink rounded-full md:text-sm text-xs font-medium md:px-4 px-2 md:py-1.5 py-1"
            >
              Logout
            </button>
          )}
          {!user && (
            <Link
              to={"/login"}
              className="text-white cursor-pointer bg-ink rounded-full text-sm font-medium px-4 py-1.5"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
