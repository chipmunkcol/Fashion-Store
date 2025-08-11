# Fashion Store 🛍️

모바일에 최적화된 패션 쇼핑몰입니다. 에이블리 스타일을 참고해 가볍고 직관적인 UX에 집중했습니다. <br />
[🛍️Fashion Store](https://fashion-store-iota-three.vercel.app/)

<img width="400" height="425" alt="image" src="https://github.com/user-attachments/assets/91d026bc-8e1c-4793-a633-2ee3d493e0ae" />

## ✨ 주요 기능

- 모바일 퍼스트 UI
- 무한 스크롤 기반 상품 탐색
- 좋아요, 리뷰, 공유 등 상호작용 기능
- 빠른 로딩: lazy loading + skeleton UI
- Framer Motion 기반 부드러운 전환 효과
- Tosspayments sdk 결제 (테스트)

## 🛠️ 기술 스택

- **Frontend**: React 18, TypeScript
- **상태 관리**: Zustand
- **데이터 페칭**: TanStack Query
- **스타일링**: Tailwind CSS
- **애니메이션**: Framer Motion
- **아이콘**: Lucide React
- **빌드 도구**: Vite

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

## 러닝 포인트💪

1. Framer Motion

- 핵심 메서드

  - motion 컴포넌트
  - AnimatePresence - 조건부 렌더링 애니메이션
  - initial, animate, exit - 기본 애니메이션 라이프사이클
  - transition - 애니메이션 타이밍과 이동
  - whileHover, whileTap - 사용자 상호작용

- 실무 TIP

  - variants 활용 - 재사용 가능한 애니메이션 정의
  - stagger 효과 - 리스트 아이템 순차 애니메이션
  - layout 애니메이션 - 자동 레이아웃 전환
  - 성능 모니터링 (과도한 애니메이션으로 사용자 경험 해치지 않도록 주의)

- 기본 사용법

```
import {motion} from 'framer-motion'

<motion.div
  initial={{ x: -100, opacity: 0 }} // 시작 상태
  animate={{ x: 0, opacity: 1 }}    // 끝 상태
  exit={{ x: 100, opacity: 0 }}     // 종료 상태태
  transition={{ duration: 0.5 }}  // 전환 설정
>
  애니메이션
</motion.div>
```

```
import { AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {show && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      조건부 렌더링 요소
    </motion.div>
  )}
</AnimatePresence>
```

- 제스처 애니메이션

```
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  whileFocus={{ boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)" }}
>
  버튼
</motion.button>
```

```
<motion.div
  drag                                    // 모든 방향
  drag="x"                               // x축만
  drag="y"                               // y축만
  dragConstraints={{
    left: -100,
    right: 100,
    top: -50,
    bottom: 50
  }}
  dragElastic={0.2}                      // 탄성
  dragMomentum={false}                   // 관성 비활성화
  whileDrag={{ scale: 1.1, rotate: 5 }}
>
  드래그 가능한 요소
</motion.div>
```

- motion 컴포넌트 (모든 HTML 요소 motiion. 으로 변환 가능)
  - motion.div, motion.buttonm, motion.img ...
