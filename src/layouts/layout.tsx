// src/layouts/layout.tsx
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("login");
  };

  return (
    <div>
      <div className="flex items-center justify-between w-full px-10 py-10 bg-white">
        <p className="text-2xl font-semibold text-black">Project Space</p>
        <button
          className="px-10 py-2 text-white bg-red-500 rounded"
          onClick={() => handleLogout()}
        >
          Logout
        </button>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
