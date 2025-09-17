import { Navigate, Outlet } from "react-router-dom";
import { useAdminStore } from "../../stores/useAdminStore";

const ProtectedAdminRoute = () => {
  const isAdmin = useAdminStore((state) => state.isAdmin);

  if (!isAdmin()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
