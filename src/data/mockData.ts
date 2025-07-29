import { Product, Category } from "../types";

// Mock categories
export const categories: Category[] = [
  { id: "1", name: "전체", slug: "all" },
  { id: "2", name: "아우터", slug: "outer" },
  { id: "3", name: "상의", slug: "top" },
  { id: "4", name: "하의", slug: "bottom" },
  { id: "5", name: "원피스", slug: "dress" },
  { id: "6", name: "신발", slug: "shoes" },
  { id: "7", name: "가방", slug: "bag" },
  { id: "8", name: "액세서리", slug: "accessory" },
];

// Mock product images (using picsum for demo)
const getRandomImage = (id: number, width = 300, height = 400) =>
  `https://picsum.photos/seed/${id}/${width}/${height}`;

// Mock products
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "오버핏 니트 카디건",
    brand: "COMMON UNIQUE",
    price: 39000,
    originalPrice: 59000,
    discount: 34,
    images: [getRandomImage(1), getRandomImage(11), getRandomImage(21)],
    category: "outer",
    isLiked: false,
    likeCount: 245,
    reviewCount: 87,
    rating: 4.8,
    tags: ["오버핏", "니트", "데일리"],
    createdAt: "2024-01-15",
    isSale: true,
  },
  {
    id: "2",
    name: "베이직 롱 슬리브 티",
    brand: "MINIMAL STUDIO",
    price: 19900,
    images: [getRandomImage(2), getRandomImage(12), getRandomImage(22)],
    category: "top",
    isLiked: true,
    likeCount: 189,
    reviewCount: 124,
    rating: 4.6,
    tags: ["베이직", "롱슬리브", "면100%"],
    createdAt: "2024-01-14",
    isNew: true,
  },
  {
    id: "3",
    name: "하이웨스트 와이드 팬츠",
    brand: "YOURS TRULY",
    price: 42000,
    images: [getRandomImage(3), getRandomImage(13), getRandomImage(23)],
    category: "bottom",
    isLiked: false,
    likeCount: 156,
    reviewCount: 67,
    rating: 4.7,
    tags: ["와이드", "하이웨스트", "편안함"],
    createdAt: "2024-01-13",
    isBest: true,
  },
  {
    id: "4",
    name: "플리츠 미디 스커트",
    brand: "FRENCH CHIC",
    price: 35000,
    originalPrice: 45000,
    discount: 22,
    images: [getRandomImage(4), getRandomImage(14), getRandomImage(24)],
    category: "bottom",
    isLiked: true,
    likeCount: 203,
    reviewCount: 89,
    rating: 4.9,
    tags: ["플리츠", "미디", "여성스러움"],
    createdAt: "2024-01-12",
    isSale: true,
  },
  {
    id: "5",
    name: "플라워 프린트 원피스",
    brand: "ROMANTIC CODE",
    price: 55000,
    images: [getRandomImage(5), getRandomImage(15), getRandomImage(25)],
    category: "dress",
    isLiked: false,
    likeCount: 287,
    reviewCount: 156,
    rating: 4.8,
    tags: ["플라워", "원피스", "페미닌"],
    createdAt: "2024-01-11",
    isNew: true,
  },
  {
    id: "6",
    name: "청키 스니커즈",
    brand: "STREET WALKER",
    price: 78000,
    images: [getRandomImage(6), getRandomImage(16), getRandomImage(26)],
    category: "shoes",
    isLiked: true,
    likeCount: 145,
    reviewCount: 78,
    rating: 4.5,
    tags: ["스니커즈", "청키", "스포티"],
    createdAt: "2024-01-10",
    isBest: true,
  },
  {
    id: "7",
    name: "미니멀 토트백",
    brand: "SIMPLE BAG",
    price: 89000,
    originalPrice: 129000,
    discount: 31,
    images: [getRandomImage(7), getRandomImage(17), getRandomImage(27)],
    category: "bag",
    isLiked: false,
    likeCount: 234,
    reviewCount: 112,
    rating: 4.7,
    tags: ["토트백", "미니멀", "가죽"],
    createdAt: "2024-01-09",
    isSale: true,
  },
  {
    id: "8",
    name: "실버 체인 목걸이",
    brand: "JEWELRY LAB",
    price: 29000,
    images: [getRandomImage(8), getRandomImage(18), getRandomImage(28)],
    category: "accessory",
    isLiked: true,
    likeCount: 167,
    reviewCount: 45,
    rating: 4.6,
    tags: ["목걸이", "실버", "체인"],
    createdAt: "2024-01-08",
  },
  {
    id: "9",
    name: "오버사이즈 후드 집업",
    brand: "CASUAL MOOD",
    price: 45000,
    images: [getRandomImage(9), getRandomImage(19), getRandomImage(29)],
    category: "outer",
    isLiked: false,
    likeCount: 198,
    reviewCount: 93,
    rating: 4.8,
    tags: ["후드", "오버사이즈", "집업"],
    createdAt: "2024-01-07",
    isNew: true,
  },
  {
    id: "10",
    name: "코튼 크롭 블라우스",
    brand: "PURE COTTON",
    price: 32000,
    images: [getRandomImage(10), getRandomImage(20), getRandomImage(30)],
    category: "top",
    isLiked: true,
    likeCount: 176,
    reviewCount: 68,
    rating: 4.5,
    tags: ["블라우스", "크롭", "코튼"],
    createdAt: "2024-01-06",
  },
  // Add more products for infinite scroll testing
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `${i + 11}`,
    name: `상품 ${i + 11}`,
    brand: "BRAND NAME",
    price: Math.floor(Math.random() * 100000) + 10000,
    originalPrice:
      Math.random() > 0.5
        ? Math.floor(Math.random() * 150000) + 50000
        : undefined,
    discount:
      Math.random() > 0.5 ? Math.floor(Math.random() * 50) + 10 : undefined,
    images: [
      getRandomImage(i + 31),
      getRandomImage(i + 81),
      getRandomImage(i + 131),
    ],
    category:
      categories[Math.floor(Math.random() * (categories.length - 1)) + 1].slug,
    isLiked: Math.random() > 0.7,
    likeCount: Math.floor(Math.random() * 500) + 10,
    reviewCount: Math.floor(Math.random() * 200) + 5,
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    tags: ["태그1", "태그2", "태그3"],
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    isNew: Math.random() > 0.8,
    isBest: Math.random() > 0.9,
    isSale: Math.random() > 0.7,
  })),
];

// Generate more products for pagination
export const generateMoreProducts = (
  page: number,
  pageSize: number = 20
): Product[] => {
  const startId = page * pageSize + 1;

  return Array.from({ length: pageSize }, (_, i) => ({
    id: `gen-${startId + i}`,
    name: `상품 ${startId + i}`,
    brand: `브랜드 ${Math.floor(Math.random() * 10) + 1}`,
    price: Math.floor(Math.random() * 100000) + 10000,
    originalPrice:
      Math.random() > 0.6
        ? Math.floor(Math.random() * 150000) + 50000
        : undefined,
    discount:
      Math.random() > 0.6 ? Math.floor(Math.random() * 50) + 10 : undefined,
    images: [
      getRandomImage(startId + i + 200),
      getRandomImage(startId + i + 400),
      getRandomImage(startId + i + 600),
    ],
    category:
      categories[Math.floor(Math.random() * (categories.length - 1)) + 1].slug,
    isLiked: Math.random() > 0.7,
    likeCount: Math.floor(Math.random() * 500) + 10,
    reviewCount: Math.floor(Math.random() * 200) + 5,
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    tags: ["신상품", "인기", "세일"],
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    isNew: Math.random() > 0.8,
    isBest: Math.random() > 0.9,
    isSale: Math.random() > 0.7,
  }));
};
