import { Navigate, Outlet } from "react-router-dom";
import { useAdminStore } from "../../stores/useAdminStore";

const ProtectedRoute = () => {
  const accessToken = useAdminStore((state) => state.accessToken);

  if (!accessToken) {
    alert("로그인이 필요한 서비스입니다.");

    // 지금 화면에서 어두운 배경만 추가
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <Navigate to="/login" replace />
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
