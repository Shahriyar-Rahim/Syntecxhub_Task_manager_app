import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router"; 
import { logOut } from "../features/auth/authSlice";
import { User, ChevronDown, LogOut, Settings, LogIn } from "lucide-react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logOut());
      setIsDropdownOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* 1. Logo as a Button to Home */}
          <Link 
            to="/" 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black">
              T
            </div>
            <span className="hidden md:block text-xl font-black text-gray-900">
              Taskly
            </span>
          </Link>

          {/* User Name in Mobile (Shown only if logged in) */}
          <div className="md:hidden flex flex-col ml-1">
             {user && (
               <>
                 <span className="text-[10px] text-gray-400 font-bold uppercase leading-none">User</span>
                 <span className="text-sm font-bold text-gray-800 truncate max-w-[100px]">
                   {user.name}
                 </span>
               </>
             )}
          </div>

          <div className="flex items-center gap-2">
            {/* 2. PC View Logic */}
            <div className="hidden md:block relative">
              {user ? (
                <div>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-2xl border border-gray-100 transition-all active:scale-95"
                  >
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                      <User size={18} />
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] text-gray-400 font-bold uppercase leading-none">Account</p>
                      <p className="text-sm font-bold text-gray-800">{user.name}</p>
                    </div>
                    <ChevronDown size={16} className={`text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 py-2">
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 transition">
                        <Settings size={16} /> Settings
                      </button>
                      <hr className="my-2 border-gray-50" />
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition font-bold"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Login Button for PC */
                <Link 
                  to="/login" 
                  className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
                >
                  Login
                </Link>
              )}
            </div>

            {/* 3. Mobile View Logic */}
            <div className="md:hidden">
              {user ? (
                /* Logout Icon for Mobile */
                <button
                  onClick={handleLogout}
                  className="p-2 text-red-500 bg-red-50 rounded-xl active:scale-90 transition-transform"
                >
                  <LogOut size={20} />
                </button>
              ) : (
                /* Login Icon for Mobile */
                <Link 
                  to="/login" 
                  className="p-2 text-blue-600 bg-blue-50 rounded-xl active:scale-90 transition-transform flex items-center gap-1"
                >
                  <LogIn size={20} />
                  <span className="text-xs font-bold">Login</span>
                </Link>
              )}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;