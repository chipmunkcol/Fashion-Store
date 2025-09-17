import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAdminStore } from "../stores/useAdminStore";
import { apiUpdateUser, apiUser, UpdateUserPayload } from "../utils/api";
import { useState, useEffect } from "react";

const Profile = () => {
  const userId = useAdminStore((state) => state.userId()); // userId가 바뀌면 리렌더링
  console.log("🚀 ~ Profile ~ userId:", userId);

  const { data, isFetching } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => apiUser(Number(userId)),
    enabled: !!userId, // userId가 있을 때만 쿼리 실행
    staleTime: 0, // 항상 fresh하지 않은 상태로 만들어서 refetch 가능하게
    // refetchInterval: 1000,
  });
  console.log("🚀 user 쿼리 재실행? ~ isLoading:", isFetching);
  // console.log("🚀 ~ Profile ~ data:", data);

  // 정보 수정
  const [editMode, setEditMode] = useState(false);
  const toggleMode = () => {
    setEditMode((prev) => !prev);
  };

  // 변경할 유저 정보
  const [userInfo, setUserInfo] = useState<UpdateUserPayload>({
    id: undefined,
    email: "",
    username: "",
    password: "",
  });
  console.log("🚀 ~ Profile ~ userInfo:", userInfo);

  // data가 변경되면 userInfo 업데이트
  useEffect(() => {
    if (data?.id) {
      console.log("🚀 useEffect 실행됨 - data 변경:", data);
      setUserInfo({
        id: data.id,
        email: data.email,
        username: data.username,
        password: data.password,
      });
    }
  }, [data]); // userInfo.id 의존성 제거

  const onChangeUserInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (updatedData: UpdateUserPayload) => {
      await apiUpdateUser(updatedData);
      return updatedData; // 업데이트된 데이터 반환
    },
    onSuccess: (updatedData) => {
      console.log("🚀 mutation onSuccess:", updatedData);
      // 방법 : 캐시 업데이트
      queryClient.setQueryData(["user", userId], updatedData);

      setEditMode(false);
    },
    onError: (error) => {
      console.error("Error updating user:", error);
      // 실패 시 추가 작업 (예: 오류 메시지 표시)
    },
  });

  const handleUpdate = (
    e: React.FormEvent<HTMLFormElement>,
    updatedData: UpdateUserPayload
  ) => {
    console.log("🚀 ~ handleUpdate ~ updatedData:", updatedData);
    e.preventDefault();

    if (!updatedData.id) {
      alert("User ID is missing.");
      return;
    }

    mutation.mutate(updatedData);
  };

  if (isFetching) return <div>Loading user...</div>;
  if (!data?.id) return <div>No user data available.</div>;

  if (!editMode) {
    return (
      <div className="flex flex-col items-center p-4 space-y-4">
        <div className="">
          <h2 className="text-2xl font-bold mb-4">User Profile</h2>
          <p>
            <strong>Username:</strong> {data.username}
          </p>

          <p>
            <strong>Email:</strong> {data.email}
          </p>
          <p>
            <strong>Phone:</strong> {data.phone}
          </p>
          <p>
            <strong>Address:</strong> {data.address?.number}{" "}
            {data.address?.street}, {data.address?.city},{" "}
            {data.address?.zipcode}
          </p>
          <p>
            <strong>Geolocation:</strong> Lat: {data.address?.geolocation.lat},
            Long: {data.address?.geolocation.long}
          </p>
        </div>
        <div>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={toggleMode}
          >
            내 정보 수정
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <div className="">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form className="space-y-4" onSubmit={(e) => handleUpdate(e, userInfo)}>
          <div className="flex gap-4 items-center">
            <label className="flex-1 mb-1 font-semibold">Username</label>
            <input
              type="text"
              value={userInfo.username}
              onChange={onChangeUserInfo}
              name="username"
              className="flex-1 border border-gray-300 rounded px-3 py-2"
            />
          </div>

          <div className="flex gap-4 items-center">
            <label className="flex-1 block mb-1 font-semibold">Email</label>
            <input
              type="email"
              value={userInfo.email}
              onChange={onChangeUserInfo}
              name="email"
              className="flex-1 border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex gap-4 items-center">
            <label className="flex-1 block mb-1 font-semibold">password</label>
            <input
              type="password"
              value={userInfo.password}
              name="password"
              className="flex-1 border border-gray-300 rounded px-3 py-2"
              onChange={onChangeUserInfo}
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              onClick={toggleMode}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
