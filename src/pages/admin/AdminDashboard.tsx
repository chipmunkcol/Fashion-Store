import { useQuery } from "@tanstack/react-query";
import { apiUsers } from "../../utils/api";

const AdminDashboard = () => {
  const { data: users, isFetching } = useQuery({
    queryKey: ["user", "dashboard"],
    queryFn: apiUsers,
  });

  if (isFetching) return <div>Loading users...</div>;
  if (!users) return <div>No user data available.</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <ul className="flex flex-col gap-4">
        {users?.map((user) => (
          <li key={user.id}>
            <h3>
              {user.username} ({user.email})
            </h3>
            <p>
              {user.address?.city}, {user.address?.street}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
