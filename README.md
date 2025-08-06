# Fashion Store 🛍️

모바일에 최적화된 패션 쇼핑몰입니다. 에이블리 스타일을 참고해 가볍고 직관적인 UX에 집중했습니다. <br />
[🛍️Fashion Store](https://fashion-store-iota-three.vercel.app/)

<img width="793" height="850" alt="image" src="https://github.com/user-attachments/assets/72687c96-eadd-46b3-8855-2ee9d7c56af8" />


## ✨ 주요 기능

- 모바일 퍼스트 UI
- 무한 스크롤 기반 상품 탐색
- 좋아요, 리뷰, 공유 등 상호작용 기능
- 빠른 로딩: lazy loading + skeleton UI
- Framer Motion 기반 부드러운 전환 효과

## 🛠️ 기술 스택

- **Frontend**: React 18, TypeScript
- **상태 관리**: Zustand
- **데이터 페칭**: TanStack Query
- **스타일링**: Tailwind CSS
- **애니메이션**: Framer Motion
- **아이콘**: Lucide React
- **빌드 도구**: Vite

## 📱 주요 화면

### 홈

- 검색바 + 카테고리 필터
- 2열 그리드 + 무한 스크롤
- 실시간 검색 및 필터링

### 상품 카드

- 브랜드명 / 상품명 / 가격 / 할인율
- NEW, BEST 뱃지 표시
- 좋아요 버튼 + 리뷰, 평점 표시

### 네비게이션

- 하단 탭바 (홈, 카테고리, 검색, 마이페이지)
- 헤더 내 검색 및 필터 기능

## 📁 프로젝트 구조

```
src/
├── pages // page 컴포넌트
├── components/ // UI 컴포넌트
├── hooks/ // 커스텀 훅
├── stores/ // Zustand 상태 관리
├── types/ // 타입 정의
├── data/ // Mock 데이터
├── App.tsx
└── main.tsx
```

## ⚙️ 기타

- `Intersection Observer` + `useInfiniteQuery` 로 무한 스크롤 구현
- `React.memo`, `useMemo` 로 렌더링 최적화
- 모바일 반응형 및 iOS Safe Area 대응
# Fashion-Store
