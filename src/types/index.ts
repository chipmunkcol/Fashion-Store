export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  subcategory?: string;
  isLiked: boolean;
  likeCount: number;
  reviewCount: number;
  rating: number;
  tags: string[];
  createdAt: string;
  isNew?: boolean;
  isBest?: boolean;
  isSale?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  likedProducts: string[];
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedOptions?: Record<string, string>;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  content: string;
  images?: string[];
  createdAt: string;
  isHelpful: boolean;
  helpfulCount: number;
}

export interface Filter {
  category?: string;
  subcategory?: string;
  priceRange?: [number, number];
  brands?: string[];
  tags?: string[];
  sortBy?: "newest" | "popular" | "price-low" | "price-high" | "review";
}

export interface ProductsResponse {
  products: Product[];
  hasNextPage: boolean;
  nextCursor?: number;
  total: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
