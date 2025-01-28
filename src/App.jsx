import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="font-secondary mx-auto min-h-screen max-w-screen-xl px-4 py-6">
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
}

export default App;
