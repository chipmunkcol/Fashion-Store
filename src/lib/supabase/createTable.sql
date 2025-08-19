-- products 테이블 생성
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT,
  price INTEGER NOT NULL,
  original_price INTEGER,
  discount INTEGER DEFAULT 0,
  images TEXT[], -- 배열로 저장
  category TEXT,
  is_liked BOOLEAN DEFAULT false,
  like_count INTEGER DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0,
  tags TEXT[], -- 배열로 저장
  created_at DATE,
  is_new BOOLEAN DEFAULT false,
  is_best BOOLEAN DEFAULT false,
  is_sale BOOLEAN DEFAULT false
);

-- RLS 비활성화 (개발용)
ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- 인덱스 추가 (성능 향상)
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_price ON products(price);
CREATE INDEX idx_products_rating ON products(rating);