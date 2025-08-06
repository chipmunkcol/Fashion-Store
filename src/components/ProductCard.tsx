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
              const rect = heartButtonRef.current?.getBoundingClientRect();
              const initialLeft = rect?.left || 0;
              const initialTop = rect?.top || 0;

              return (
                <motion.div
                  initial={{
                    left: initialLeft,
                    top: initialTop,
                    scale: 1.5,
                    opacity: 1,
                  }}
                  animate={{
                    left: window.innerWidth * 0.5, // Bottom nav heart icon position (50% from left)
                    top: window.innerHeight - 40, // Bottom nav position
                    scale: [1, 2, 0.5],
                    opacity: [1, 0.8, 0],
                    rotate: [0, 15, -15, 0],
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none z-50 fixed"
                >
                  <Heart className="w-4 h-4 text-primary-500 fill-current drop-shadow-lg" />
                </motion.div>
              );
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
