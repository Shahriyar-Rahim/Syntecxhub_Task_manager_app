import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth);

  // If no user is found in Redux state, redirect to login
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;