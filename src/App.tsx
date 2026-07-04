import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden antialiased bg-surface text-ink">
      <div className="mx-auto max-w-4xl md:px-4 md:py-10 py-1">
        <Navbar />
        <main className="md:space-y-6 space-y-2 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
