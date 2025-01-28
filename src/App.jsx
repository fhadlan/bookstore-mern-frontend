import { Outlet } from "react-router";

function App() {
  return (
    <>
      <nav className="font-primary">Header</nav>
      <main className="font-secondary mx-auto min-h-screen max-w-screen-2xl px-4 py-6">
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
}

export default App;
