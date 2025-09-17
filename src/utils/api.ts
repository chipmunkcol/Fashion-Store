import axios from "axios";
import { Fake_Product, Fake_User } from "../types";

type loginData = {
  username: string;
  password: string;
};
export const apiLogin = async (
  payload: loginData
): Promise<{ token: string }> => {
  try {
    const url = "https://fakestoreapi.com/auth/login";
    const response = await axios.post(url, payload);
    if (response?.status !== 201) throw new Error("Login failed");

    return response.data;
  } catch (error) {
    throw error;
  }
};

interface Fake_Cart {
  id: number;
  userId: number;
  products: { productId: number; quantity: number }[];
  date: string;
}
export const apiCart = async (cartId: number | null): Promise<Fake_Cart> => {
  if (!cartId) throw null;

  try {
    const url = `https://fakestoreapi.com/carts/${cartId}`;
    const response = await axios.get(url);
    if (response?.status !== 200) throw new Error("Failed to fetch carts");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export type addCartPayload = {
  id?: number;
  userId?: number;
  products?: { productId: number; quantity: number }[];
};

export const apiUpdateCart = async (payload: addCartPayload) => {
  const { id } = payload;
  try {
    const url = `https://fakestoreapi.com/carts/${id}`;
    const response = await axios.put(url, payload);
    if (response?.status !== 200 && response?.status !== 201)
      throw new Error("Failed to add cart");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiProduct = async (productId: number) => {
  try {
    const response = await axios.get(
      `https://fakestoreapi.com/products/${productId}`
    );

    if (response?.status !== 200) throw new Error("Failed to fetch product");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiUser = async (userId: number): Promise<Fake_User> => {
  try {
    const response = await axios.get(
      `https://fakestoreapi.com/users/${userId}`
    );
    if (response?.status !== 200) throw new Error("Failed to fetch user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export type UpdateUserPayload = {
  id?: number;
  email?: string;
  username?: string;
  password?: string;
};

export const apiUpdateUser = async (payload: UpdateUserPayload) => {
  const { id } = payload;
  if (!id) throw new Error("User ID is required for update");

  try {
    const url = `https://fakestoreapi.com/users/${id}`;
    const response = await axios.put(url, payload);
    if (response?.status !== 200 && response?.status !== 201)
      throw new Error("Failed to update user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const apiUsers = async (): Promise<Fake_User[]> => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/users`);
    if (response?.status !== 200) throw new Error("Failed to fetch users");
    return response.data;
  } catch (error) {
    throw error;
  }
};
