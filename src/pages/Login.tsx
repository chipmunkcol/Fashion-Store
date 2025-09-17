import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiLogin } from "../utils/api";
import { useAdminStore } from "../stores/useAdminStore";

const Login = () => {
  const navigate = useNavigate();
  const setAccessToken = useAdminStore((state) => state.setAccessToken);
  const [loginData, setLoginData] = useState({
    username: "johnd",
    password: "m38rmF$",
  });

  const onChangeLoginData = (key: "username" | "password", value: string) => {
    setLoginData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const mutation = useMutation({
    mutationFn: apiLogin,
    onSuccess: (data) => {
      alert("Login successful");
      setAccessToken(data.token);
      navigate(-1);
    },
    onError: (error) => {
      // console.error("Login failed:", error);
      alert(error?.message || "Login failed");
    },
  });

  const onSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기에 로그인 로직 추가 (예: API 호출)
    mutation.mutate(loginData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50  bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">장바구니</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </header>
      <main>
        <div className="pt-[40px] pb-[25px]">
          <h2 className="text-3xl">
            안녕하세요 <br /> 에이블리입니다
          </h2>
          <p className="mt-4 text-gray-600">
            로그인 후 더 다양한 혜택을 누려보세요!
          </p>
        </div>
        <div className="">
          <form className="flex flex-col gap-4" onSubmit={onSubmitLogin}>
            <div className="flex flex-col gap-3">
              <input
                placeholder="아이디 입력"
                className="border border-gray-200 px-[16px] py-[11px] rounded-md"
                onChange={(e) => onChangeLoginData("username", e.target.value)}
                value={loginData.username}
                required
              />
              <input
                placeholder="비밀번호 입력"
                className="border border-gray-200 px-[16px] py-[11px] rounded-md"
                type="password"
                onChange={(e) => onChangeLoginData("password", e.target.value)}
                value={loginData.password}
                required
              />
            </div>
            <button type="submit" className=" btn-primary py-[12px] rounded-md">
              로그인
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
