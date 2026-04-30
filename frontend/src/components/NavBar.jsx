import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logOut, selectCurrentUser } from "../features/auth/authSlice";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const user = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40 backdrop-blur-md bg-white/90">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black text-blue-600 tracking-tight">TASK.LY</Link>
        
        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
              <button onClick={handleLogout} className="bg-gray-100 px-5 py-2 rounded-full text-gray-700 font-semibold hover:bg-gray-200 transition">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 font-medium">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-md shadow-blue-100">Join</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;