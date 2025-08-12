import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "../types";
import { useProductStore } from "../stores/useProductStore";

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  const heartButtonRef = useRef<HTMLButtonElement>(null);
  const { isLiked, toggleLike } = useProductStore();

  const liked = isLiked(product.id);
  const hasDiscount =
    product.discount === 0 || product.discount === undefined ? false : true;

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const wasLiked = liked;
    toggleLike(product.id);

    // 좋아요를 추가할 때만 애니메이션 실행
    if (!wasLiked) {
      setShowLikeAnimation(true);
      setTimeout(() => setShowLikeAnimation(false), 1000);
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.05,
        ease: "easeOut",
      }}
      className="card cursor-pointer group tap-highlight-none"
      onClick={() => {
        navigate(`/product/${product.id}`);
      }}
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] bg-gray-100 overflow-hidden">
        {!imageLoaded && <div className="absolute inset-0 skeleton-item" />}

        {!imageError ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">
              이미지를 불러올 수 없습니다
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="px-2 py-0.5 bg-primary-500 text-white text-xs font-medium rounded">
              NEW
            </span>
          )}
          {product.isBest && (
            <span className="px-2 py-0.5 bg-yellow-500 text-white text-xs font-medium rounded">
              BEST
            </span>
          )}
          {hasDiscount && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded">
              {product.discount}%
            </span>
          )}
        </div>

        {/* Like Button */}
        <button
          ref={heartButtonRef}
          onClick={handleLikeClick}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 tap-highlight-none ${
            liked
              ? "bg-white text-primary-500 shadow-sm"
              : "bg-white/80 text-gray-400 hover:bg-white hover:text-primary-500"
          }`}
        >
          <motion.div
            animate={liked ? { scale: [1, 1.3, 1] } : { scale: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Heart
              className={`w-4 h-4 transition-all duration-200 ${
                liked ? "fill-current" : ""
              }`}
            />
          </motion.div>
        </button>

        {/* Flying Heart Animation */}
        <AnimatePresence>
          {showLikeAnimation &&
            heartButtonRef.current &&
            (() => {
              const heartCount = Math.floor(Math.random() * 4) + 5; // 5-8개 하트
              const rect = heartButtonRef.current?.getBoundingClientRect();
              const startX = rect?.left + rect?.width / 2 || 0;
              const startY = rect?.top + rect?.height / 2 || 0;
              const endX = window.innerWidth * 0.495; // 하단 네비 하트 아이콘 위치
              const endY = window.innerHeight - 50; // 하단 네비 위치

              return Array.from({ length: heartCount }).map((_, index) => {
                // 각 하트마다 다른 경로 생성
                const midX = startX + (Math.random() - 0.5) * 170; // 더 넓은 범위
                const midY = startY - Math.random() * 30 - 70; // 위쪽으로 더 높이
                const delay = index * 0.08; // 각 하트마다 약간씩 지연
                const size = Math.random() * 8 + 12; // 12-20px 랜덤 크기
                const rotation = Math.random() * 720 - 360; // -360도에서 +360도

                return (
                  <motion.div
                    key={`heart-animation-${Date.now()}-${index}`}
                    initial={{
                      left: startX,
                      top: startY,
                      scale: 0,
                      opacity: 1,
                      rotate: 0,
                    }}
                    animate={{
                      left: [startX, midX, endX], // 3점을 통한 곡선 경로
                      top: [startY, midY, endY],
                      scale: [0, 1.5, 1, 0.3], // 크기 변화 (나타나기 → 커지기 → 작아지기)
                      opacity: [1, 1, 0.8, 0], // 투명도 변화
                      rotate: rotation, // 회전
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                    }}
                    transition={{
                      duration: 1.2 + Math.random() * 0.4, // 1.2-1.6초 랜덤 지속시간
                      delay: delay,
                      ease: "easeInOut",
                      times: [0, 0.3, 0.7, 1], // 키프레임 타이밍
                    }}
                    className="pointer-events-none z-50 fixed"
                    style={{
                      fontSize: `${size}px`,
                    }}
                  >
                    <Heart
                      className="text-primary-500 fill-current drop-shadow-lg"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        filter: `hue-rotate(${Math.random() * 60 - 30}deg)`, // 색상 약간 변화
                      }}
                    />
                  </motion.div>
                );
              });
            })()}
        </AnimatePresence>
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Brand */}
        <p className="text-xs text-gray-500 font-medium mb-1 truncate">
          {product.brand}
        </p>

        {/* Name */}
        <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs text-gray-600">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div className="flex items-end gap-1">
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">
                {product.originalPrice?.toLocaleString()}원
              </span>
            )}
            <span className="text-sm font-bold text-gray-900">
              {product.price.toLocaleString()}원
            </span>
          </div>

          {/* Like Count */}
          <div className="flex items-center gap-1">
            <Heart className="w-3 h-3 text-gray-300" />
            <span className="text-xs text-gray-400">{product.likeCount}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
