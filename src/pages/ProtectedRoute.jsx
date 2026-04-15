import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ tokenKey = 'user' }) => {
  const token = localStorage.getItem(tokenKey);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
