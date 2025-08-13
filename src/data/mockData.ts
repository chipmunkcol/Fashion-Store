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

const fashionImages = {
  outer: [
    "https://cdn.pixabay.com/photo/2017/08/01/15/00/blue-2566082_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg",
    "https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=400",
    "https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=400",
    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400",
    "https://images.unsplash.com/photo-1525562723836-dca67a71d5f1?w=400",
    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",
    "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400",
    "https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=400",
    "https://media.istockphoto.com/id/1169982283/photo/smiling-young-woman-feeling-happy.jpg?s=2048x2048&w=is&k=20&c=9ydtCQzDQ5wmDZSEYOkzyEkmvJJbaJznHaAHbTOrwS4=",
  ],
  dress: [
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400",
    "https://cdn.pixabay.com/photo/2021/03/22/16/07/woman-6115105_1280.jpg",
    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400",
    "https://cdn.pixabay.com/photo/2020/10/23/16/50/woman-5679284_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/02/01/03/00/girl-4809433_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/07/13/06/26/fluttering-dress-4334145_1280.jpg",
  ],
  top: [
    "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400",
    "https://cdn.pixabay.com/photo/2016/03/23/08/34/woman-1274361_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/01/01/17/18/girl-4733999_1280.jpg",
    "https://cdn.pixabay.com/photo/2019/11/06/05/57/woman-4605248_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/08/24/16/21/cotton-1617328_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/08/26/20/44/elan-1623088_1280.jpg",
  ],
  bottom: [
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400",
    "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400",
    "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=400",
    "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400",
    "https://cdn.pixabay.com/photo/2016/03/05/01/56/jeans-1237046_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/05/21/14/54/feet-349687_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/10/20/05/00/woman-9134037_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/04/05/12/18/parking-5005901_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/06/18/09/42/fashion-5312743_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/10/10/14/25/red-3737422_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/02/12/15/18/woman-8568749_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/01/20/19/15/woman-8521750_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/08/06/19/27/girl-7369230_1280.jpg",
    "https://cdn.pixabay.com/photo/2022/07/18/13/42/woman-7329920_1280.jpg",
  ],
  shoes: [
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400",
    "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400",
    "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400",
    "https://cdn.pixabay.com/photo/2013/08/30/02/09/cowboy-boots-177193_1280.jpg",
    "https://cdn.pixabay.com/photo/2018/11/30/02/11/winter-boots-3846915_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/12/23/22/15/teen-photo-8466399_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/06/02/23/15/winter-boots-795706_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/11/29/12/24/autumn-1869461_1280.jpg",
    "https://cdn.pixabay.com/photo/2015/11/24/06/53/boots-1059555_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/10/07/15/52/sports-shoes-1721890_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/08/10/12/21/boots-2622091_1280.jpg",
  ],
  accessory: [
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
    "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400",
    "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400",
    "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400",
    "https://cdn.pixabay.com/photo/2020/08/14/05/58/glasses-5486967_1280.jpg",
    "https://cdn.pixabay.com/photo/2023/04/26/17/59/wrist-watch-7953062_1280.jpg",
    "https://cdn.pixabay.com/photo/2014/11/05/19/26/woman-518275_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/05/13/12/40/fashion-2309519_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/08/02/01/34/pocket-watch-2569573_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/12/06/20/23/accessory-3002608_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/08/31/11/59/androgynous-6588615_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/01/11/10/25/headsets-1971383_1280.jpg",
    "https://cdn.pixabay.com/photo/2024/07/08/17/54/model-8881740_1280.jpg",
  ],
  bag: [
    "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
    "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400",
    "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400",
    "https://cdn.pixabay.com/photo/2015/11/20/03/53/package-1052370_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/07/04/18/27/bag-yellow-2472101_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/07/04/18/28/bag-2472106_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/07/04/18/29/bag-2472112_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/07/04/18/28/bag-2472109_1280.jpg",
    "https://cdn.pixabay.com/photo/2020/11/16/10/32/bag-5748628_1280.jpg",
    "https://cdn.pixabay.com/photo/2021/07/02/03/18/culture-6380757_1280.jpg",
  ],
};

// 2. 랜덤 이미지 선택 함수
function getRandomImage(category: string) {
  const images = fashionImages[category as keyof typeof fashionImages];
  if (!images) {
    return "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400";
  }
  return images[Math.floor(Math.random() * images.length)];
}

// Mock products
// mock data image 썸네일이 다양하게 나오게 해줘 썸네일 이미지 모두 다르게 해줘
export const mockProducts: Product[] = [
  {
    id: "1",
    name: "오버핏 니트 카디건",
    brand: "COMMON UNIQUE",
    price: 39000,
    originalPrice: 59000,
    discount: 34,
    images: [
      getRandomImage("outer"),
      getRandomImage("outer"),
      getRandomImage("outer"),
    ],
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
    images: [
      getRandomImage("top"),
      getRandomImage("top"),
      getRandomImage("top"),
    ],
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
    images: [
      getRandomImage("bottom"),
      getRandomImage("bottom"),
      getRandomImage("bottom"),
    ],
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
    images: [
      getRandomImage("dress"),
      getRandomImage("dress"),
      getRandomImage("dress"),
    ],
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
    name: "청키 스니커즈",
    brand: "STREET WALKER",
    price: 78000,
    images: [
      getRandomImage("shoes"),
      getRandomImage("shoes"),
      getRandomImage("shoes"),
    ],
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
    id: "6",
    name: "미니멀 토트백",
    brand: "SIMPLE BAG",
    price: 89000,
    originalPrice: 129000,
    discount: 31,
    images: [
      getRandomImage("bag"),
      getRandomImage("bag"),
      getRandomImage("bag"),
    ],
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
    id: "7",
    name: "실버 체인 목걸이",
    brand: "JEWELRY LAB",
    price: 29000,
    images: [
      getRandomImage("accessory"),
      getRandomImage("accessory"),
      getRandomImage("accessory"),
    ],
    category: "accessory",
    isLiked: true,
    likeCount: 167,
    reviewCount: 45,
    rating: 4.6,
    tags: ["목걸이", "실버", "체인"],
    createdAt: "2024-01-08",
  },
  {
    id: "8",
    name: "오버사이즈 후드 집업",
    brand: "CASUAL MOOD",
    price: 45000,
    images: [
      getRandomImage("outer"),
      getRandomImage("outer"),
      getRandomImage("outer"),
    ],
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
    id: "9",
    name: "코튼 크롭 블라우스",
    brand: "PURE COTTON",
    price: 32000,
    images: [
      getRandomImage("top"),
      getRandomImage("top"),
      getRandomImage("top"),
    ],
    category: "top",
    isLiked: true,
    likeCount: 176,
    reviewCount: 68,
    rating: 4.5,
    tags: ["블라우스", "크롭", "코튼"],
    createdAt: "2024-01-06",
  },
  {
    id: "10",
    name: "플라워 프린트 원피스",
    brand: "ROMANTIC CODE",
    price: 55000,
    images: [
      getRandomImage("dress"),
      getRandomImage("dress"),
      getRandomImage("dress"),
    ],
    category: "dress",
    isLiked: false,
    likeCount: 287,
    reviewCount: 156,
    rating: 4.8,
    tags: ["플라워", "원피스", "페미닌"],
    createdAt: "2024-01-11",
    isNew: true,
  },
  // Add more products for infinite scroll testing
  ...Array.from({ length: 50 }, (_, i) => {
    const originalPrice = Math.floor(Math.random() * 100000) + 10000;
    const hasDiscount = Math.random() < 0.3; // 30% 확률로 할인
    const discount = hasDiscount ? Math.floor(Math.random() * 50) + 10 : 0;
    const price = Math.floor((originalPrice * (100 - discount)) / 100);
    const category =
      categories[Math.floor(Math.random() * (categories.length - 1)) + 1].slug;

    return {
      id: `${i + 11}`,
      name: `상품 ${i + 11}`,
      brand: "BRAND NAME",
      originalPrice: originalPrice,
      price: price,
      discount: discount,
      images: [
        getRandomImage(category),
        getRandomImage(category),
        getRandomImage(category),
      ],
      category: category,
      isLiked: false,
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
    };
  }),
];

// Generate more products for pagination
export const generateMoreProducts = (
  page: number,
  pageSize: number = 20
): Product[] => {
  const startId = page * pageSize + 1;
  const category =
    categories[Math.floor(Math.random() * (categories.length - 1)) + 1].slug;

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
      getRandomImage(category),
      getRandomImage(category),
      getRandomImage(category),
    ],
    category: category,
    isLiked: false,
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

// Mock user's liked products (simulating local storage or backend data)
export const userLikedProducts = new Set<string>();

// Initialize with some liked products
mockProducts.forEach((product) => {
  if (product.isLiked) {
    userLikedProducts.add(product.id);
  }
});
