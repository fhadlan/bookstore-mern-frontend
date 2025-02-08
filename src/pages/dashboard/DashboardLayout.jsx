import React from "react";
import { Link, Outlet, useLocation, useMatch } from "react-router";
import { MdClose } from "react-icons/md";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [bookDropdownOpen, setBookDropdownOpen] = React.useState(false);
  const [pageTitle, setPageTitle] = React.useState("Dashboard");
  const location = useLocation();

  const isEditBook = useMatch("/dashboard/edit-book/:id");

  React.useEffect(() => {
    setSidebarOpen(false);
    if (isEditBook) {
      setPageTitle("Edit Book");
    } else {
      switch (location.pathname) {
        case "/dashboard":
          setPageTitle("Dashboard");
          break;
        case "/dashboard/manage-book":
          setPageTitle("Manage Book");
          break;
        case "/dashboard/add-book":
          setPageTitle("Add Book");
          break;
        case "/dashboard/manage-user":
          setPageTitle("Manage User");
          break;
        default:
          setPageTitle("Dashboard");
      }
    }
  }, [location]);

  return (
    <div className="flex">
      {/* Overlay (Backdrop) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)} // Close sidebar when clicking outside
        />
      )}
      <div
        id="sidebar"
        className={`fixed h-screen w-64 ${
          sidebarOpen ? "" : "-translate-x-64"
        } z-20 space-y-6 bg-gray-900 p-5 text-white transition-transform md:translate-x-0`}
      >
        <button
          className="absolute top-5 right-4 text-white md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <MdClose className="size-7" />
        </button>
        <h2 className="text-2xl font-bold">My Sidebar</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to={"/dashboard"}
                className="block rounded px-4 py-2 hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={() => setBookDropdownOpen(!bookDropdownOpen)}
                className="flex w-full justify-between rounded px-4 py-2 text-left hover:bg-gray-700"
              >
                Book
                <span>{bookDropdownOpen ? "▲" : "▼"}</span>
              </button>

              <ul
                className={`overflow-hidden rounded transition-all ease-in-out ${
                  bookDropdownOpen
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <li>
                  <Link
                    to="add-book"
                    className="ml-4 block rounded px-4 py-2 hover:bg-gray-700"
                  >
                    Add Book
                  </Link>
                </li>
                <li>
                  <Link
                    to="manage-book"
                    className="ml-4 block rounded px-4 py-2 hover:bg-gray-700"
                  >
                    Manage Book
                  </Link>
                </li>
              </ul>
            </li>

            <li>
              <a
                href="#"
                className="mt-0 block rounded px-4 py-2 hover:bg-gray-700"
              >
                Profile
              </a>
            </li>
            <li>
              <a href="#" className="block rounded px-4 py-2 hover:bg-gray-700">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block rounded px-4 py-2 hover:bg-gray-700">
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="ml-0 flex flex-1 flex-col md:ml-64">
        <header className="fixed top-0 left-0 w-full bg-gray-800 p-4 text-white md:left-64 md:w-[calc(100%-16rem)]">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white md:hidden"
            >
              ☰
            </button>
            <h1 className="text-xl font-bold">{pageTitle}</h1>
            <div className="space-x-4">
              <a href="#" className="hover:text-gray-400">
                Profile
              </a>
              <a href="#" className="hover:text-gray-400">
                Logout
              </a>
            </div>
          </div>
        </header>

        <main className="mt-16 flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
