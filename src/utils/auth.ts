import { jwtDecode } from "jwt-decode";

export const decodeToken = (token: string | null) => {
  if (!token) return null;
  try {
    const { sub, user } = jwtDecode(token) as { sub: string; user: string };
    return { id: sub, username: user };
  } catch (err) {
    return null;
  }
};
