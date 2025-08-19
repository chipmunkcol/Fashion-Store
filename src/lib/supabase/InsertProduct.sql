-- Supabase Products 테이블 INSERT SQL
-- 생성일: 2025-08-19
-- 총 60개의 상품 데이터

-- 기존 데이터 삭제 (필요시 주석 해제)
-- TRUNCATE TABLE products;

INSERT INTO products (
    id, name, brand, price, original_price, discount, images, 
    category, is_liked, like_count, review_count, rating, 
    tags, created_at, is_new, is_best, is_sale
) VALUES
    ('1', '오버핏 니트 카디건', 'COMMON UNIQUE', 39000, 59000, 34, 
     ARRAY['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400','https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg','https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg'], 
     'outer', false, 245, 87, 4.8, 
     ARRAY['오버핏','니트','데일리'], '2024-01-15', false, false, true),
    
    ('2', '베이직 롱 슬리브 티', 'MINIMAL STUDIO', 19900, NULL, 0,
     ARRAY['https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg','https://cdn.pixabay.com/photo/2016/08/26/20/44/elan-1623088_1280.jpg','https://cdn.pixabay.com/photo/2020/01/01/17/18/girl-4733999_1280.jpg'],
     'top', true, 189, 124, 4.6,
     ARRAY['베이직','롱슬리브','면100%'], '2024-01-14', true, false, false),
    
    ('3', '하이웨스트 와이드 팬츠', 'YOURS TRULY', 42000, NULL, 0,
     ARRAY['https://cdn.pixabay.com/photo/2018/10/10/14/25/red-3737422_1280.jpg','https://cdn.pixabay.com/photo/2024/02/12/15/18/woman-8568749_1280.jpg','https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400'],
     'bottom', false, 156, 67, 4.7,
     ARRAY['와이드','하이웨스트','편안함'], '2024-01-13', false, true, false),
    
    ('4', '플리츠 미디 스커트', 'FRENCH CHIC', 35000, 45000, 22,
     ARRAY['https://cdn.pixabay.com/photo/2020/02/01/03/00/girl-4809433_1280.jpg','https://cdn.pixabay.com/photo/2020/02/01/03/00/girl-4809433_1280.jpg','https://cdn.pixabay.com/photo/2019/07/13/06/26/fluttering-dress-4334145_1280.jpg'],
     'bottom', true, 203, 89, 4.9,
     ARRAY['플리츠','미디','여성스러움'], '2024-01-12', false, false, true),
    
    ('5', '청키 스니커즈', 'STREET WALKER', 78000, NULL, 0,
     ARRAY['https://cdn.pixabay.com/photo/2016/11/29/12/24/autumn-1869461_1280.jpg','https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400','https://cdn.pixabay.com/photo/2017/08/10/12/21/boots-2622091_1280.jpg'],
     'shoes', true, 145, 78, 4.5,
     ARRAY['스니커즈','청키','스포티'], '2024-01-10', false, true, false),
    
    ('6', '미니멀 토트백', 'SIMPLE BAG', 89000, 129000, 31,
     ARRAY['https://cdn.pixabay.com/photo/2017/07/04/18/27/bag-yellow-2472101_1280.jpg','https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400','https://cdn.pixabay.com/photo/2021/07/02/03/18/culture-6380757_1280.jpg'],
     'bag', false, 234, 112, 4.7,
     ARRAY['토트백','미니멀','가죽'], '2024-01-09', false, false, true),
    
    ('7', '실버 체인 목걸이', 'JEWELRY LAB', 29000, NULL, 0,
     ARRAY['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400','https://cdn.pixabay.com/photo/2021/08/31/11/59/androgynous-6588615_1280.jpg','https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400'],
     'accessory', true, 167, 45, 4.6,
     ARRAY['목걸이','실버','체인'], '2024-01-08', false, false, false),
    
    ('8', '오버사이즈 후드 집업', 'CASUAL MOOD', 45000, NULL, 0,
     ARRAY['https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=400','https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg','https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=400'],
     'outer', false, 198, 93, 4.8,
     ARRAY['후드','오버사이즈','집업'], '2024-01-07', true, false, false),
    
    ('9', '코튼 크롭 블라우스', 'PURE COTTON', 32000, NULL, 0,
     ARRAY['https://cdn.pixabay.com/photo/2019/11/06/05/57/woman-4605248_1280.jpg','https://cdn.pixabay.com/photo/2020/01/01/17/18/girl-4733999_1280.jpg','https://cdn.pixabay.com/photo/2019/11/06/05/57/woman-4605248_1280.jpg'],
     'top', true, 176, 68, 4.5,
     ARRAY['블라우스','크롭','코튼'], '2024-01-06', false, false, false),
    
    ('10', '플라워 프린트 원피스', 'ROMANTIC CODE', 55000, NULL, 0,
     ARRAY['https://cdn.pixabay.com/photo/2020/02/01/03/00/girl-4809433_1280.jpg','https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400','https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400'],
     'dress', false, 287, 156, 4.8,
     ARRAY['플라워','원피스','페미닌'], '2024-01-11', true, false, false),
    
    ('11', '상품 11', 'BRAND NAME', 33622, 33622, 0,
     ARRAY['https://media.istockphoto.com/id/1169982283/photo/smiling-young-woman-feeling-happy.jpg?s=2048x2048&w=is&k=20&c=9ydtCQzDQ5wmDZSEYOkzyEkmvJJbaJznHaAHbTOrwS4=','https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=400','https://cdn.pixabay.com/photo/2017/08/01/15/00/blue-2566082_1280.jpg'],
     'outer', false, 172, 70, 3.4,
     ARRAY['태그1','태그2','태그3'], '2025-07-21', false, false, true),
    
    ('12', '상품 12', 'BRAND NAME', 58976, 58976, 0,
     ARRAY['https://cdn.pixabay.com/photo/2017/07/04/18/28/bag-2472109_1280.jpg','https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400','https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'],
     'bag', false, 391, 71, 3.6,
     ARRAY['태그1','태그2','태그3'], '2025-08-08', false, false, false),
    
    ('13', '상품 13', 'BRAND NAME', 102710, 102710, 0,
     ARRAY['https://cdn.pixabay.com/photo/2020/08/14/05/58/glasses-5486967_1280.jpg','https://cdn.pixabay.com/photo/2024/07/08/17/54/model-8881740_1280.jpg','https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400'],
     'accessory', false, 12, 160, 3.9,
     ARRAY['태그1','태그2','태그3'], '2025-08-03', false, false, false),
    
    ('14', '상품 14', 'BRAND NAME', 72963, 72963, 0,
     ARRAY['https://cdn.pixabay.com/photo/2017/08/02/01/34/pocket-watch-2569573_1280.jpg','https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400','https://cdn.pixabay.com/photo/2017/05/13/12/40/fashion-2309519_1280.jpg'],
     'accessory', false, 166, 109, 3.8,
     ARRAY['태그1','태그2','태그3'], '2025-07-27', false, false, false),
    
    ('15', '상품 15', 'BRAND NAME', 83856, 83856, 0,
     ARRAY['https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400','https://cdn.pixabay.com/photo/2019/11/06/05/57/woman-4605248_1280.jpg','https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg'],
     'top', false, 286, 67, 3.9,
     ARRAY['태그1','태그2','태그3'], '2025-08-08', false, false, false),
    
    ('16', '상품 16', 'BRAND NAME', 86744, 86744, 0,
     ARRAY['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400','https://cdn.pixabay.com/photo/2023/04/26/17/59/wrist-watch-7953062_1280.jpg','https://cdn.pixabay.com/photo/2014/11/05/19/26/woman-518275_1280.jpg'],
     'accessory', false, 499, 37, 4.7,
     ARRAY['태그1','태그2','태그3'], '2025-08-02', false, false, false),
    
    ('17', '상품 17', 'BRAND NAME', 19023, 19023, 0,
     ARRAY['https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg','https://cdn.pixabay.com/photo/2020/01/01/17/18/girl-4733999_1280.jpg','https://cdn.pixabay.com/photo/2019/11/06/05/57/woman-4605248_1280.jpg'],
     'top', false, 29, 107, 4.5,
     ARRAY['태그1','태그2','태그3'], '2025-07-30', false, false, false),
    
    ('18', '상품 18', 'BRAND NAME', 73355, 73355, 0,
     ARRAY['https://media.istockphoto.com/id/1169982283/photo/smiling-young-woman-feeling-happy.jpg?s=2048x2048&w=is&k=20&c=9ydtCQzDQ5wmDZSEYOkzyEkmvJJbaJznHaAHbTOrwS4=','https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400','https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400'],
     'outer', false, 59, 38, 3.6,
     ARRAY['태그1','태그2','태그3'], '2025-07-29', false, false, false),
    
    ('19', '상품 19', 'BRAND NAME', 35914, 58876, 39,
     ARRAY['https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg','https://cdn.pixabay.com/photo/2016/08/26/20/44/elan-1623088_1280.jpg','https://cdn.pixabay.com/photo/2020/01/01/17/18/girl-4733999_1280.jpg'],
     'top', false, 93, 58, 3.4,
     ARRAY['태그1','태그2','태그3'], '2025-07-27', false, false, false),
    
    ('20', '상품 20', 'BRAND NAME', 29232, 32846, 11,
     ARRAY['https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg','https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=400','https://media.istockphoto.com/id/1169982283/photo/smiling-young-woman-feeling-happy.jpg?s=2048x2048&w=is&k=20&c=9ydtCQzDQ5wmDZSEYOkzyEkmvJJbaJznHaAHbTOrwS4='],
     'outer', false, 195, 114, 3.6,
     ARRAY['태그1','태그2','태그3'], '2025-07-25', false, false, false),
    
    ('21', '상품 21', 'BRAND NAME', 47639, 93411, 49,
     ARRAY['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400','https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400','https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400'],
     'outer', false, 302, 17, 3.4,
     ARRAY['태그1','태그2','태그3'], '2025-08-07', false, false, false),
    
    ('22', '상품 22', 'BRAND NAME', 32827, 32827, 0,
     ARRAY['https://cdn.pixabay.com/photo/2015/06/02/23/15/winter-boots-795706_1280.jpg','https://cdn.pixabay.com/photo/2016/10/07/15/52/sports-shoes-1721890_1280.jpg','https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'],
     'shoes', false, 222, 143, 3.1,
     ARRAY['태그1','태그2','태그3'], '2025-08-08', false, false, false),
    
    ('23', '상품 23', 'BRAND NAME', 58892, 58892, 0,
     ARRAY['https://cdn.pixabay.com/photo/2016/11/29/12/24/autumn-1869461_1280.jpg','https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400','https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400'],
     'shoes', false, 266, 200, 3.9,
     ARRAY['태그1','태그2','태그3'], '2025-07-25', false, false, false),
    
    ('24', '상품 24', 'BRAND NAME', 50897, 50897, 0,
     ARRAY['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400','https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400','https://cdn.pixabay.com/photo/2014/11/05/19/26/woman-518275_1280.jpg'],
     'accessory', false, 235, 78, 4.2,
     ARRAY['태그1','태그2','태그3'], '2025-08-07', false, false, true),
    
    ('25', '상품 25', 'BRAND NAME', 65450, 97687, 33,
     ARRAY['https://cdn.pixabay.com/photo/2018/11/30/02/11/winter-boots-3846915_1280.jpg','https://cdn.pixabay.com/photo/2016/10/07/15/52/sports-shoes-1721890_1280.jpg','https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'],
     'shoes', false, 410, 139, 4.8,
     ARRAY['태그1','태그2','태그3'], '2025-08-16', false, false, false),
    
    ('26', '상품 26', 'BRAND NAME', 56440, 56440, 0,
     ARRAY['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400','https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400','https://images.unsplash.com/photo-1525562723836-dca67a71d5f1?w=400'],
     'outer', false, 96, 46, 3.6,
     ARRAY['태그1','태그2','태그3'], '2025-07-29', false, true, true),
    
    ('27', '상품 27', 'BRAND NAME', 31585, 31585, 0,
     ARRAY['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400','https://cdn.pixabay.com/photo/2020/10/23/16/50/woman-5679284_1280.jpg','https://cdn.pixabay.com/photo/2020/10/23/16/50/woman-5679284_1280.jpg'],
     'dress', false, 83, 40, 3.6,
     ARRAY['태그1','태그2','태그3'], '2025-07-24', true, false, false),
    
    ('28', '상품 28', 'BRAND NAME', 49050, 74319, 34,
     ARRAY['https://cdn.pixabay.com/photo/2017/07/04/18/28/bag-2472106_1280.jpg','https://cdn.pixabay.com/photo/2017/07/04/18/29/bag-2472112_1280.jpg','https://cdn.pixabay.com/photo/2017/07/04/18/28/bag-2472106_1280.jpg'],
     'bag', false, 309, 90, 4.6,
     ARRAY['태그1','태그2','태그3'], '2025-08-10', true, false, false),
    
    ('29', '상품 29', 'BRAND NAME', 53292, 53292, 0,
     ARRAY['https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=400','https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=400','https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg'],
     'outer', false, 369, 123, 3.6,
     ARRAY['태그1','태그2','태그3'], '2025-07-29', true, false, true),
    
    ('30', '상품 30', 'BRAND NAME', 92774, 92774, 0,
     ARRAY['https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg','https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg','https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400'],
     'outer', false, 139, 74, 3.4,
     ARRAY['태그1','태그2','태그3'], '2025-07-27', true, false, true),
    
    ('31', '상품 31', 'BRAND NAME', 59899, 59899, 0,
     ARRAY['https://cdn.pixabay.com/photo/2016/03/23/08/34/woman-1274361_1280.jpg','https://cdn.pixabay.com/photo/2016/08/26/20/44/elan-1623088_1280.jpg','https://cdn.pixabay.com/photo/2016/08/24/16/21/cotton-1617328_1280.jpg'],
     'top', false, 321, 186, 4.6,
     ARRAY['태그1','태그2','태그3'], '2025-08-12', false, false, true),
    
    ('32', '상품 32', 'BRAND NAME', 100138, 100138, 0,
     ARRAY['https://cdn.pixabay.com/photo/2023/04/26/17/59/wrist-watch-7953062_1280.jpg','https://cdn.pixabay.com/photo/2014/11/05/19/26/woman-518275_1280.jpg','https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400'],
     'accessory', false, 459, 113, 4.6,
     ARRAY['태그1','태그2','태그3'], '2025-07-27', false, false, true),
    
    ('33', '상품 33', 'BRAND NAME', 59286, 100486, 41,
     ARRAY['https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400','https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400','https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400'],
     'accessory', false, 138, 172, 3.0,
     ARRAY['태그1','태그2','태그3'], '2025-08-11', false, false, false),
    
    ('34', '상품 34', 'BRAND NAME', 102824, 102824, 0,
     ARRAY['https://cdn.pixabay.com/photo/2017/07/04/18/28/bag-2472109_1280.jpg','https://cdn.pixabay.com/photo/2020/11/16/10/32/bag-5748628_1280.jpg','https://cdn.pixabay.com/photo/2017/07/04/18/28/bag-2472109_1280.jpg'],
     'bag', false, 258, 31, 5.0,
     ARRAY['태그1','태그2','태그3'], '2025-07-31', true, false, false),
    
    ('35', '상품 35', 'BRAND NAME', 100259, 100259, 0,
     ARRAY['https://cdn.pixabay.com/photo/2023/04/26/17/59/wrist-watch-7953062_1280.jpg','https://cdn.pixabay.com/photo/2017/01/11/10/25/headsets-1971383_1280.jpg','https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400'],
     'accessory', false, 198, 7, 3.6,
     ARRAY['태그1','태그2','태그3'], '2025-08-01', false, false, true),
    
    ('36', '상품 36', 'BRAND NAME', 72483, 108185, 33,
     ARRAY['https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=400','https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=400','https://media.istockphoto.com/id/1169982283/photo/smiling-young-woman-feeling-happy.jpg?s=2048x2048&w=is&k=20&c=9ydtCQzDQ5wmDZSEYOkzyEkmvJJbaJznHaAHbTOrwS4='],
     'outer', false, 447, 39, 4.5,
     ARRAY['태그1','태그2','태그3'], '2025-08-14', false, false, false),
    
    ('37', '상품 37', 'BRAND NAME', 72308, 72308, 0,
     ARRAY['https://cdn.pixabay.com/photo/2020/02/01/03/00/girl-4809433_1280.jpg','https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400','https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400'],
     'dress', false, 10, 29, 4.1,
     ARRAY['태그1','태그2','태그3'], '2025-08-15', false, false, false),
    
    ('38', '상품 38', 'BRAND NAME', 90913, 90913, 0,
     ARRAY['https://cdn.pixabay.com/photo/2019/07/13/06/26/fluttering-dress-4334145_1280.jpg','https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400','https://cdn.pixabay.com/photo/2020/10/23/16/50/woman-5679284_1280.jpg'],
     'dress', false, 71, 94, 3.6,
     ARRAY['태그1','태그2','태그3'], '2025-08-06', false, false, false),
    
    ('39', '상품 39', 'BRAND NAME', 105957, 105957, 0,
     ARRAY['https://cdn.pixabay.com/photo/2016/11/29/12/24/autumn-1869461_1280.jpg','https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400','https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400'],
     'shoes', false, 372, 180, 3.3,
     ARRAY['태그1','태그2','태그3'], '2025-08-06', false, false, false),
    
    ('40', '상품 40', 'BRAND NAME', 64421, 64421, 0,
     ARRAY['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400','https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400','https://cdn.pixabay.com/photo/2017/08/01/15/00/blue-2566082_1280.jpg'],
     'outer', false, 45, 104, 3.4,
     ARRAY['태그1','태그2','태그3'], '2025-07-23', false, false, true),
    
    ('41', '상품 41', 'BRAND NAME', 13427, 31226, 57,
     ARRAY['https://images.unsplash.com/photo-1614676471928-2ed0ad1061a4?w=400','https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?w=400','https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400'],
     'outer', false, 403, 168, 3.1,
     ARRAY['태그1','태그2','태그3'], '2025-08-09', false, false, false),
    
    ('42', '상품 42', 'BRAND NAME', 101372, 101372, 0,
     ARRAY['https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg','https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg','https://cdn.pixabay.com/photo/2016/03/23/08/34/woman-1274361_1280.jpg'],
     'top', false, 447, 113, 4.4,
     ARRAY['태그1','태그2','태그3'], '2025-08-10', false, false, true),
    
    ('43', '상품 43', 'BRAND NAME', 26318, 51604, 49,
     ARRAY['https://cdn.pixabay.com/photo/2023/12/23/22/15/teen-photo-8466399_1280.jpg','https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400','https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400'],
     'shoes', false, 495, 182, 3.3,
     ARRAY['태그1','태그2','태그3'], '2025-07-27', false, false, false),
    
    ('44', '상품 44', 'BRAND NAME', 31008, 31008, 0,
     ARRAY['https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400','https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400','https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400'],
     'accessory', false, 135, 17, 4.7,
     ARRAY['태그1','태그2','태그3'], '2025-08-16', false, false, false),
    
    ('45', '상품 45', 'BRAND NAME', 34012, 34012, 0,
     ARRAY['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400','https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400','https://cdn.pixabay.com/photo/2016/11/29/12/24/autumn-1869461_1280.jpg'],
     'shoes', false, 224, 169, 3.8,
     ARRAY['태그1','태그2','태그3'], '2025-07-29', false, false, false),
    
    ('46', '상품 46', 'BRAND NAME', 38440, 38440, 0,
     ARRAY['https://cdn.pixabay.com/photo/2013/08/30/02/09/cowboy-boots-177193_1280.jpg','https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400','https://cdn.pixabay.com/photo/2015/06/02/23/15/winter-boots-795706_1280.jpg'],
     'shoes', false, 410, 85, 3.9,
     ARRAY['태그1','태그2','태그3'], '2025-08-18', true, false, false),
    
    ('47', '상품 47', 'BRAND NAME', 53392, 72152, 26,
     ARRAY['https://cdn.pixabay.com/photo/2024/07/08/17/54/model-8881740_1280.jpg','https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400','https://cdn.pixabay.com/photo/2017/08/02/01/34/pocket-watch-2569573_1280.jpg'],
     'accessory', false, 261, 16, 3.6,
     ARRAY['태그1','태그2','태그3'], '2025-07-23', false, false, false),
    
    ('48', '상품 48', 'BRAND NAME', 26446, 26446, 0,
     ARRAY['https://cdn.pixabay.com/photo/2024/07/08/17/54/model-8881740_1280.jpg','https://cdn.pixabay.com/photo/2021/08/31/11/59/androgynous-6588615_1280.jpg','https://cdn.pixabay.com/photo/2017/05/13/12/40/fashion-2309519_1280.jpg'],
     'accessory', false, 234, 14, 3.9,
     ARRAY['태그1','태그2','태그3'], '2025-08-14', false, false, true),
    
    ('49', '상품 49', 'BRAND NAME', 31434, 31434, 0,
     ARRAY['https://cdn.pixabay.com/photo/2022/08/06/19/27/girl-7369230_1280.jpg','https://cdn.pixabay.com/photo/2024/02/12/15/18/woman-8568749_1280.jpg','https://cdn.pixabay.com/photo/2024/01/20/19/15/woman-8521750_1280.jpg'],
     'bottom', false, 457, 193, 3.3,
     ARRAY['태그1','태그2','태그3'], '2025-07-24', false, false, false),
    
    ('50', '상품 50', 'BRAND NAME', 82564, 82564, 0,
     ARRAY['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400','https://cdn.pixabay.com/photo/2018/11/30/02/11/winter-boots-3846915_1280.jpg','https://cdn.pixabay.com/photo/2013/08/30/02/09/cowboy-boots-177193_1280.jpg'],
     'shoes', false, 21, 52, 3.5,
     ARRAY['태그1','태그2','태그3'], '2025-08-13', true, true, false),
    
    ('51', '상품 51', 'BRAND NAME', 41635, 41635, 0,
     ARRAY['https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=400','https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=400','https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_1280.jpg'],
     'outer', false, 158, 52, 4.8,
     ARRAY['태그1','태그2','태그3'], '2025-08-04', false, false, false),
    
    ('52', '상품 52', 'BRAND NAME', 102485, 102485, 0,
     ARRAY['https://cdn.pixabay.com/photo/2018/11/30/02/11/winter-boots-3846915_1280.jpg','https://cdn.pixabay.com/photo/2015/11/24/06/53/boots-1059555_1280.jpg','https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'],
     'shoes', false, 81, 40, 3.0,
     ARRAY['태그1','태그2','태그3'], '2025-07-27', false, false, true),
    
    ('53', '상품 53', 'BRAND NAME', 65635, 65635, 0,
     ARRAY['https://cdn.pixabay.com/photo/2024/07/08/17/54/model-8881740_1280.jpg','https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400','https://cdn.pixabay.com/photo/2014/11/05/19/26/woman-518275_1280.jpg'],
     'accessory', false, 447, 107, 3.4,
     ARRAY['태그1','태그2','태그3'], '2025-07-26', false, true, false),
    
    ('54', '상품 54', 'BRAND NAME', 100440, 100440, 0,
     ARRAY['https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400','https://cdn.pixabay.com/photo/2015/11/24/06/53/boots-1059555_1280.jpg','https://cdn.pixabay.com/photo/2013/08/30/02/09/cowboy-boots-177193_1280.jpg'],
     'shoes', false, 408, 64, 4.8,
     ARRAY['태그1','태그2','태그3'], '2025-08-11', false, false, false),
    
    ('55', '상품 55', 'BRAND NAME', 39344, 93678, 58,
     ARRAY['https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400','https://cdn.pixabay.com/photo/2016/08/26/20/44/elan-1623088_1280.jpg','https://cdn.pixabay.com/photo/2016/08/26/20/44/elan-1623088_1280.jpg'],
     'top', false, 387, 107, 4.4,
     ARRAY['태그1','태그2','태그3'], '2025-08-10', false, false, false),
    
    ('56', '상품 56', 'BRAND NAME', 33847, 33847, 0,
     ARRAY['https://cdn.pixabay.com/photo/2016/08/26/20/44/elan-1623088_1280.jpg','https://cdn.pixabay.com/photo/2018/01/22/07/31/portrait-3098319_1280.jpg','https://cdn.pixabay.com/photo/2016/08/26/20/44/elan-1623088_1280.jpg'],
     'top', false, 438, 116, 4.7,
     ARRAY['태그1','태그2','태그3'], '2025-08-09', false, false, false),
    
    ('57', '상품 57', 'BRAND NAME', 16126, 16126, 0,
     ARRAY['https://cdn.pixabay.com/photo/2014/05/21/14/54/feet-349687_1280.jpg','https://cdn.pixabay.com/photo/2024/02/12/15/18/woman-8568749_1280.jpg','https://cdn.pixabay.com/photo/2020/06/18/09/42/fashion-5312743_1280.jpg'],
     'bottom', false, 462, 169, 3.4,
     ARRAY['태그1','태그2','태그3'], '2025-07-24', false, false, false),
    
    ('58', '상품 58', 'BRAND NAME', 103532, 103532, 0,
     ARRAY['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400','https://cdn.pixabay.com/photo/2015/06/02/23/15/winter-boots-795706_1280.jpg','https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'],
     'shoes', false, 207, 192, 4.7,
     ARRAY['태그1','태그2','태그3'], '2025-08-01', false, false, false),
    
    ('59', '상품 59', 'BRAND NAME', 70935, 70935, 0,
     ARRAY['https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400','https://cdn.pixabay.com/photo/2017/01/11/10/25/headsets-1971383_1280.jpg','https://cdn.pixabay.com/photo/2020/08/14/05/58/glasses-5486967_1280.jpg'],
     'accessory', false, 221, 59, 4.2,
     ARRAY['태그1','태그2','태그3'], '2025-08-03', false, false, false),
    
    ('60', '상품 60', 'BRAND NAME', 97031, 97031, 0,
     ARRAY['https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400','https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400','https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400'],
     'bag', false, 292, 154, 4.4,
     ARRAY['태그1','태그2','태그3'], '2025-07-23', false, false, true);

-- 삽입 후 확인 쿼리
SELECT COUNT(*) as total_products FROM products;
SELECT category, COUNT(*) as count FROM products GROUP BY category ORDER BY count DESC;
SELECT * FROM products WHERE is_sale = true LIMIT 5;
SELECT * FROM products WHERE is_new = true LIMIT 5;
SELECT * FROM products WHERE is_best = true LIMIT 5;

-- 성능 최적화를 위한 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_products_rating ON products(rating);
CREATE INDEX IF NOT EXISTS idx_products_compound ON products(category, price, rating);
CREATE INDEX IF NOT EXISTS idx_products_flags ON products(is_new, is_best, is_sale);

-- 통계 정보 업데이트 (성능 향상)
ANALYZE products;

-- 데이터 확인 결과 예상값
-- total_products: 60
-- 카테고리별 분포:
-- outer: 11개, top: 8개, accessory: 12개, shoes: 13개, 
-- bag: 4개, bottom: 3개, dress: 4개