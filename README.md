# A-bly Fashion Store 🛍️

에이블리 스타일의 모바일 최적화된 패션 쇼핑몰입니다.

## 🌟 주요 특징

- **모바일 퍼스트 디자인**: 모바일 사용자 경험을 최우선으로 설계
- **무한 스크롤**: 끊김 없는 상품 탐색 경험
- **소셜 커머스**: 좋아요, 리뷰, 공유 등 사용자 상호작용 요소
- **빠른 로딩**: 이미지 lazy loading과 skeleton 로딩으로 최적화
- **부드러운 애니메이션**: Framer Motion을 활용한 자연스러운 전환 효과

## 🚀 기술 스택

- **Frontend**: React 18, TypeScript
- **상태 관리**: Zustand
- **데이터 페칭**: TanStack Query (React Query)
- **스타일링**: Tailwind CSS
- **애니메이션**: Framer Motion
- **아이콘**: Lucide React
- **빌드 도구**: Vite
- **개발 도구**: ESLint, PostCSS

## 📱 주요 기능

### 🏠 홈페이지

- 검색바와 카테고리 필터
- 2열 그리드 상품 진열
- 무한 스크롤로 상품 로딩
- 실시간 검색 및 필터링

### 🛒 상품 카드

- 고화질 상품 이미지
- 브랜드명, 상품명, 가격 정보
- 할인률 및 배지 (NEW, BEST) 표시
- 좋아요 버튼 및 카운트
- 평점 및 리뷰 개수

### 🧭 네비게이션

- 하단 탭 네비게이션 (홈, 카테고리, 검색, 마이페이지)
- 헤더 검색 및 필터 기능
- 카테고리별 상품 분류

## 🎨 디자인 시스템

### 색상 팔레트

- **Primary**: #ef4444 (빨강 계열)
- **Gray**: #fafafa ~ #171717 (그레이 스케일)
- **배경**: #f9fafb (연한 회색)

### 타이포그래피

- **폰트**: Pretendard (한글 최적화)
- **크기**: 12px ~ 16px (모바일 최적화)

### 레이아웃

- **그리드**: 2열 상품 카드 레이아웃
- **간격**: 12px 카드 간격
- **패딩**: 16px 컨테이너 패딩

## 📦 설치 및 실행

### 1. 저장소 클론

```bash
git clone <repository-url>
cd a-bly
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 개발 서버 실행

```bash
npm run dev
```

개발 서버가 http://localhost:3000 에서 실행됩니다.

### 4. 빌드

```bash
npm run build
```

## 📂 프로젝트 구조

```
src/
├── components/          # React 컴포넌트
│   ├── Header.tsx      # 헤더 (검색, 필터)
│   ├── ProductCard.tsx # 상품 카드
│   ├── ProductGrid.tsx # 상품 그리드
│   ├── LoadingSkeleton.tsx # 로딩 스켈레톤
│   └── BottomNavigation.tsx # 하단 네비게이션
├── hooks/              # 커스텀 훅
│   └── useProducts.ts  # 상품 데이터 훅
├── stores/             # 상태 관리
│   └── useProductStore.ts # 상품 스토어
├── types/              # TypeScript 타입
│   └── index.ts        # 공통 타입 정의
├── data/               # Mock 데이터
│   └── mockData.ts     # 상품 mock 데이터
├── App.tsx             # 메인 앱 컴포넌트
├── main.tsx            # 앱 엔트리 포인트
└── index.css           # 글로벌 스타일
```

## 🔧 주요 기능 설명

### 무한 스크롤

- React Intersection Observer를 사용한 뷰포트 감지
- TanStack Query의 `useInfiniteQuery`로 페이지네이션 구현
- 자동 로딩 및 스켈레톤 UI 제공

### 상태 관리

- Zustand를 사용한 가벼운 상태 관리
- 좋아요 상태, 검색 쿼리, 필터 상태 관리
- 지속적인 상태 유지

### 성능 최적화

- 이미지 lazy loading으로 초기 로딩 속도 개선
- React.memo와 useMemo를 활용한 리렌더링 최적화
- CSS 애니메이션과 Framer Motion으로 부드러운 UX

### 모바일 최적화

- 터치 친화적인 UI 디자인
- iOS Safe Area 대응
- 반응형 그리드 레이아웃

## 🛠️ 개발 가이드

### 새로운 컴포넌트 추가

1. `src/components/` 디렉토리에 컴포넌트 파일 생성
2. TypeScript 인터페이스 정의
3. Tailwind CSS 클래스 활용
4. 모바일 퍼스트 디자인 적용

### 상태 추가

1. `src/stores/` 디렉토리의 해당 스토어 수정
2. 액션과 상태 정의
3. 컴포넌트에서 훅 사용

### API 연동

1. `src/hooks/` 디렉토리에 API 훅 생성
2. TanStack Query 활용
3. 에러 처리 및 로딩 상태 관리

## 📱 모바일 테스트

Chrome DevTools의 Device Mode를 사용하여 다양한 모바일 디바이스에서 테스트하세요:

- iPhone 12/13/14
- Samsung Galaxy S20/S21
- iPad

## 🚀 배포

### Vercel 배포

```bash
npm run build
# Vercel CLI를 사용하거나 GitHub 연동
```

### Netlify 배포

```bash
npm run build
# dist 폴더를 Netlify에 업로드
```

## 📄 라이센스

MIT License

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

Made with ❤️ for Fashion E-commerce Experience
