// src/components/Layout.js
import { Outlet } from "react-router-dom";
import { logout } from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout);
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
