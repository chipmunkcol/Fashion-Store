import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const {
    items,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const handleQuantityChange = (
    itemId: string,
    currentQuantity: number,
    delta: number
  ) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-6 w-6 text-gray-700" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">장바구니</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </header>

        {/* Empty State */}
        <div className=" flex flex-col items-center justify-center py-20 px-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <ShoppingBag className="h-10 w-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            장바구니가 비어있어요
          </h2>
          <p className="text-gray-600 text-center mb-8">
            마음에 드는 상품을 장바구니에 담아보세요
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            쇼핑 계속하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            장바구니 ({getTotalItems()})
          </h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </header>

      {/* Cart Items */}
      <div className="px-4 py-4 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex space-x-3">
              {/* Product Image */}
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://via.placeholder.com/80x80?text=No+Image";
                  }}
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500 mb-1">
                      {item.product.brand}
                    </p>
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                      {item.product.name}
                    </h3>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Selected Options */}
                {item.selectedOptions &&
                  Object.keys(item.selectedOptions).length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {Object.entries(item.selectedOptions).map(
                        ([key, value]) => (
                          <span
                            key={key}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                          >
                            {key === "size"
                              ? "사이즈"
                              : key === "color"
                              ? "색상"
                              : key}
                            : {value}
                          </span>
                        )
                      )}
                    </div>
                  )}

                {/* Price and Quantity */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    {item.product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ₩{item.product.originalPrice.toLocaleString()}
                      </span>
                    )}
                    <span className="text-sm font-bold text-gray-900">
                      ₩{item.product.price.toLocaleString()}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity, -1)
                      }
                      className="p-1 hover:bg-gray-50 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4 text-gray-600" />
                    </button>
                    <span className="px-3 py-1 text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity, 1)
                      }
                      className="p-1 hover:bg-gray-50 transition-colors"
                      disabled={item.quantity >= 10}
                    >
                      <Plus className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right mt-2">
                  <span className="text-sm font-bold text-gray-900">
                    소계: ₩
                    {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="px-4 py-4">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            주문 요약
          </h3>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">상품 금액</span>
              <span className="text-gray-900">
                ₩{getTotalPrice().toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">배송비</span>
              <span className="text-gray-900">
                {getTotalPrice() >= 50000 ? "무료" : "₩3,000"}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900">총 결제금액</span>
                <span className="text-gray-900">
                  ₩
                  {(
                    getTotalPrice() + (getTotalPrice() >= 50000 ? 0 : 3000)
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {getTotalPrice() < 50000 && (
            <div className="bg-blue-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-blue-700">
                ₩{(50000 - getTotalPrice()).toLocaleString()} 더 구매하시면
                무료배송이에요!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="max-w-screen-sm mx-auto fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 shadow-lg">
        <div className="flex space-x-3">
          <button
            onClick={() => navigate("/")}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-4 rounded-lg font-semibold transition-colors"
          >
            쇼핑 계속하기
          </button>
          <button
            onClick={handleCheckout}
            className="flex-1 bg-black hover:bg-gray-800 text-white py-4 rounded-lg font-semibold transition-colors"
          >
            결제하기 ({getTotalItems()}개)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
