import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import useCartWithProducts from "../hooks/useCartWithProducts";
import { useUpdateToCart } from "../hooks/useUpdateToCart";
import { useAdminStore } from "../stores/useAdminStore";

const cartId = 1; // 임시 cartId
const Cart: React.FC = () => {
  const navigate = useNavigate();
  const userId = useAdminStore((state) => state.userId()); // userId가 바뀌면 리렌더링

  // console.log("🚀 ~ Cart ~ currentUserId:", currentUserId);

  // 개선된 커스텀 훅 사용
  const {
    carts,
    products: productDatas,
    isLoading: productsLoading,
    error,
  } = useCartWithProducts(cartId);

  const { handleAddToCart } = useUpdateToCart(cartId, Number(userId));

  // 안전한 데이터 접근
  const items = carts?.products || [];
  const cartTotalQuantity = items.reduce((acc, val) => acc + val.quantity, 0);

  const totalAmount = items.reduce((sum, item) => {
    const productPrice =
      productDatas.find((p) => p?.id === item.productId)?.price || 0;
    return sum + productPrice * item.quantity;
  }, 0);

  // 조건부 렌더링
  if (productsLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
          <h1 className="text-lg font-semibold text-gray-900">장바구니</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </header>

      {/* Cart Items */}
      <div className="px-4 py-4 space-y-4">
        {items.map((item, index) => {
          const productData = productDatas[index];
          const productPrice = productData.price * item.quantity || 0;

          return (
            <div
              key={item.productId}
              className="bg-white rounded-lg shadow p-4 flex justify-between items-center"
            >
              <div>
                <div className="w-16 h-16 flex-shrink-0 mr-4">
                  <img src={productData.image} className="w-full h-full" />
                </div>
                <div className="w-40 overflow-hidden text-ellipsis whitespace-nowrap">
                  {" "}
                  {productData.title}
                </div>
              </div>
              <div className="flex items-center gap-3">
                수량 :
                <button
                  onClick={() => handleAddToCart(item.productId, -1)}
                  className="p-1 border rounded-full ml-2"
                >
                  <Minus />
                </button>
                <div>{item.quantity}</div>
                <button
                  onClick={() => handleAddToCart(item.productId, 1)}
                  className="p-1 border rounded-full ml-2"
                >
                  <Plus />
                </button>
              </div>
              <div>금액: ${productPrice}</div>
            </div>
          );
        })}

        <div>총 금액: ${totalAmount}</div>

        {/* Bottom Actions */}
        <div className="max-w-screen-sm mx-auto fixed z-50 bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-4 shadow-lg">
          <div className="flex space-x-3">
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-4 rounded-lg font-semibold transition-colors"
            >
              쇼핑 계속하기
            </button>
            <button
              onClick={() => {}}
              className="flex-1 bg-black hover:bg-gray-800 text-white py-4 rounded-lg font-semibold transition-colors"
            >
              결제하기 ({cartTotalQuantity} 개)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
