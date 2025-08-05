import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  Share,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockProducts } from "../data/mockData";
import { useCartStore } from "../stores/useCartStore";

interface ProductDetailProps {}

const ProductDetail: React.FC<ProductDetailProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCartStore();

  const product = mockProducts.find((p) => p.id === id);
  const hasDiscount =
    product?.discount === 0 || product?.discount === undefined ? false : true;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(product?.isLiked || false);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            상품을 찾을 수 없습니다
          </h2>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            홈으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = ["Black", "White", "Gray", "Navy", "Beige"];

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  const handleAddToCart = () => {
    if (!product || !selectedSize || !selectedColor) return;

    const selectedOptions = {
      size: selectedSize,
      color: selectedColor,
    };

    addToCart(product, quantity, selectedOptions);

    // 성공 알림 (간단한 alert로 구현, 실제로는 toast 등을 사용)
    alert(`${product.name}이(가) 장바구니에 추가되었습니다!`);
  };

  const handleBuyNow = () => {
    if (!product || !selectedSize || !selectedColor) return;

    const selectedOptions = {
      size: selectedSize,
      color: selectedColor,
    };

    // 장바구니에 추가 후 바로 결제 페이지로 이동
    addToCart(product, quantity, selectedOptions);
    navigate("/checkout");
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Share className="h-6 w-6 text-gray-700" />
            </button>
            <button
              onClick={handleLikeToggle}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Heart
                className={`h-6 w-6 ${
                  isLiked ? "text-red-500 fill-current" : "text-gray-700"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Product Images */}
      <div className="relative">
        {/* Main Image */}
        <div className="aspect-square bg-gray-100 overflow-hidden">
          <img
            src={product.images[selectedImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src =
                "https://via.placeholder.com/400x500?text=Image+Not+Found";
            }}
          />
        </div>

        {/* Image indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {product.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === selectedImageIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Swipe Navigation */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={() =>
                setSelectedImageIndex(
                  selectedImageIndex > 0
                    ? selectedImageIndex - 1
                    : product.images.length - 1
                )
              }
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
            >
              ←
            </button>
            <button
              onClick={() =>
                setSelectedImageIndex(
                  selectedImageIndex < product.images.length - 1
                    ? selectedImageIndex + 1
                    : 0
                )
              }
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-colors"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Images */}
      {product.images.length > 1 && (
        <div className="px-4 py-3 bg-white">
          <div className="flex space-x-2 overflow-x-auto">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === selectedImageIndex
                    ? "border-black"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/64x64?text=No+Image";
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Product Info */}
      <div className="px-4 py-6">
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">{product.brand}</p>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>

          <div className="flex items-center space-x-2 mb-3">
            <div className="flex items-center">
              {renderStars(product.rating)}
              <span className="ml-1 text-sm text-gray-600">
                {product.rating} ({product.reviewCount})
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {hasDiscount && product.originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                ₩{product.originalPrice.toLocaleString()}
              </span>
            )}
            <span className="text-2xl font-bold text-gray-900">
              ₩{product.price.toLocaleString()}
            </span>
            {hasDiscount && product.discount && (
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                {product.discount}%
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Size Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">사이즈</h3>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                  selectedSize === size
                    ? "border-black bg-black text-white"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">색상</h3>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                  selectedColor === color
                    ? "border-black bg-black text-white"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">수량</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-2 hover:bg-gray-50 transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4 text-gray-600" />
              </button>
              <span className="px-4 py-2 text-lg font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-2 hover:bg-gray-50 transition-colors"
                disabled={quantity >= 10}
              >
                <Plus className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Truck className="h-5 w-5" />
            <span>무료배송 (5만원 이상 구매시)</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <RotateCcw className="h-5 w-5" />
            <span>7일 무료 교환/반품</span>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <Shield className="h-5 w-5" />
            <span>정품보장</span>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              리뷰 ({product.reviewCount})
            </h3>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              전체보기
            </button>
          </div>

          {/* Review Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-4 mb-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {product.rating}
                </div>
                <div className="flex justify-center mb-1">
                  {renderStars(product.rating)}
                </div>
                <div className="text-xs text-gray-500">평균 평점</div>
              </div>
              <div className="flex-1">
                <div className="space-y-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center space-x-2">
                      <span className="text-xs text-gray-600 w-2">{star}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{
                            width: `${
                              star === 5
                                ? 60
                                : star === 4
                                ? 25
                                : star === 3
                                ? 10
                                : star === 2
                                ? 3
                                : 2
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 w-8">
                        {star === 5
                          ? "60%"
                          : star === 4
                          ? "25%"
                          : star === 3
                          ? "10%"
                          : star === 2
                          ? "3%"
                          : "2%"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sample Reviews */}
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    김**
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {renderStars(5)}
                    <span className="text-xs text-gray-500">2024.01.15</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                재질이 정말 좋고 핏도 예쁘네요! 평소 M사이즈 입는데 딱 맞았어요.
                배송도 빨라서 만족합니다. 색상도 사진과 동일해서 좋았습니다.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                  사이즈 적당함
                </span>
                <span className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs">
                  색상 만족
                </span>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">
                    박**
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {renderStars(4)}
                    <span className="text-xs text-gray-500">2024.01.12</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                디자인은 예쁜데 생각보다 두께가 얇아요. 그래도 가격대비
                만족합니다.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded text-xs">
                  얇은 소재
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-4 shadow-lg">
        {/* Price Summary */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">총 상품금액</span>
            <span className="text-xs text-gray-500">({quantity}개)</span>
          </div>
          <div className="flex items-center space-x-2">
            {hasDiscount && product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₩{(product.originalPrice * quantity).toLocaleString()}
              </span>
            )}
            <span className="text-lg font-bold text-gray-900">
              ₩{(product.price * quantity).toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleLikeToggle}
            className={`p-4 rounded-lg border transition-colors ${
              isLiked
                ? "border-red-500 bg-red-50 text-red-500"
                : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Heart className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`} />
          </button>

          <button
            onClick={handleAddToCart}
            className={`px-6 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
              selectedSize && selectedColor
                ? "bg-gray-100 hover:bg-gray-200 text-gray-900"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!selectedSize || !selectedColor}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>장바구니</span>
          </button>

          <button
            onClick={handleBuyNow}
            className={`flex-1 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
              selectedSize && selectedColor
                ? "bg-black hover:bg-gray-800 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!selectedSize || !selectedColor}
          >
            <span>
              {!selectedSize || !selectedColor
                ? "옵션을 선택해주세요"
                : "바로구매"}
            </span>
          </button>
        </div>

        {(!selectedSize || !selectedColor) && (
          <p className="text-xs text-red-500 mt-2 text-center">
            사이즈와 색상을 모두 선택해주세요
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
