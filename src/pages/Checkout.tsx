import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Wallet,
  AlertCircle,
} from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

// 토스페이먼츠 타입 정의
declare global {
  interface Window {
    TossPayments: any;
  }
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
  type:
    | "CARD"
    | "VIRTUAL_ACCOUNT"
    | "MOBILE_MONEY"
    | "CULTURE_GIFT_CERTIFICATE";
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("CARD");
  const [isLoading, setIsLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    detailAddress: "",
    zipCode: "",
  });

  const paymentMethods: PaymentMethod[] = [
    {
      id: "CARD",
      name: "신용/체크카드",
      icon: <CreditCard className="h-5 w-5" />,
      type: "CARD",
    },
    {
      id: "VIRTUAL_ACCOUNT",
      name: "가상계좌",
      icon: <Wallet className="h-5 w-5" />,
      type: "VIRTUAL_ACCOUNT",
    },
    {
      id: "MOBILE_MONEY",
      name: "휴대폰 결제",
      icon: <Smartphone className="h-5 w-5" />,
      type: "MOBILE_MONEY",
    },
  ];

  const totalAmount = getTotalPrice();
  const shippingFee = totalAmount >= 50000 ? 0 : 3000;
  const finalAmount = totalAmount + shippingFee;

  useEffect(() => {
    // 장바구니가 비어있으면 홈으로 리다이렉트
    if (items.length === 0) {
      navigate("/");
      return;
    }

    // 토스페이먼츠 SDK 로드
    const script = document.createElement("script");
    script.src = "https://js.tosspayments.com/v1/payment";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [items.length, navigate]);

  const handlePayment = async () => {
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.email) {
      alert("필수 정보를 모두 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      // 토스페이먼츠 클라이언트 키 (테스트용)
      const clientKey = "test_ck_yZqmkKeP8g2e9JLangzkrbQRxB9l";
      const tossPayments = window.TossPayments(clientKey);

      // 주문 정보
      const orderId = `ORDER_${Date.now()}`;
      const orderName =
        items.length === 1
          ? items[0].product.name
          : `${items[0].product.name} 외 ${items.length - 1}건`;

      // 결제 요청
      await tossPayments.requestPayment(selectedPaymentMethod, {
        amount: finalAmount,
        orderId: orderId,
        orderName: orderName,
        customerName: customerInfo.name,
        customerEmail: customerInfo.email,
        customerMobilePhone: customerInfo.phone.includes("-")
          ? customerInfo.phone.replace(/[^0-9]/g, "")
          : customerInfo.phone,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });

      // 성공 시 장바구니 비우기
      clearCart();
    } catch (error) {
      console.error("Payment error:", error);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            disabled={isLoading}
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">주문/결제</h1>
          <div className="w-10" />
        </div>
      </header>

      <div className="px-4 py-4 space-y-6">
        {/* 주문 상품 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            주문 상품
          </h2>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex space-x-3">
                <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500">{item.product.brand}</p>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                    {item.product.name}
                  </h3>
                  {item.selectedOptions && (
                    <div className="flex space-x-2 mt-1">
                      {Object.entries(item.selectedOptions).map(
                        ([key, value]) => (
                          <span key={key} className="text-xs text-gray-500">
                            {value}
                          </span>
                        )
                      )}
                    </div>
                  )}
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-sm text-gray-500">
                      수량: {item.quantity}
                    </span>
                    <span className="text-sm font-semibold">
                      ₩{(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 배송 정보 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            배송 정보
          </h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="이름을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="010-0000-0000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이메일 <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={customerInfo.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                placeholder="example@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                주소 <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {/* <input
                  type="text"
                  value={customerInfo.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="우편번호"
                  required
                /> */}
                <input
                  type="text"
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="기본 주소"
                />
                <input
                  type="text"
                  value={customerInfo.detailAddress}
                  onChange={(e) =>
                    handleInputChange("detailAddress", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="상세 주소"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 결제 방법 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            결제 방법
          </h2>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedPaymentMethod(method.type)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                  selectedPaymentMethod === method.type
                    ? "border-black bg-gray-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                {method.icon}
                <span className="text-sm font-medium">{method.name}</span>
                <div className="flex-1" />
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    selectedPaymentMethod === method.type
                      ? "border-black bg-black"
                      : "border-gray-300"
                  }`}
                >
                  {selectedPaymentMethod === method.type && (
                    <div className="w-full h-full rounded-full bg-white scale-50" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* 결제 정보 */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            결제 정보
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">상품 금액</span>
              <span className="text-gray-900">
                ₩{totalAmount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">배송비</span>
              <span className="text-gray-900">
                {shippingFee === 0
                  ? "무료"
                  : `₩${shippingFee.toLocaleString()}`}
              </span>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <div className="flex justify-between text-lg font-bold">
                <span className="text-gray-900">총 결제금액</span>
                <span className="text-gray-900">
                  ₩{finalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 안내사항 */}
        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex space-x-2">
            <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">결제 전 확인사항</p>
              <ul className="text-xs space-y-1 text-yellow-700">
                <li>• 이는 테스트 결제 환경입니다.</li>
                <li>• 실제 결제가 진행되지 않습니다.</li>
                <li>• 테스트 카드번호를 사용해주세요.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="sticky z-50 bottom-0  bg-white border-t border-gray-200 px-4 py-4 shadow-lg">
        <button
          onClick={handlePayment}
          disabled={
            isLoading ||
            !customerInfo.name ||
            !customerInfo.phone ||
            !customerInfo.email ||
            !customerInfo.address
          }
          className={`w-full py-4 rounded-lg font-semibold transition-colors ${
            isLoading ||
            !customerInfo.name ||
            !customerInfo.phone ||
            !customerInfo.email ||
            !customerInfo.address
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-black hover:bg-gray-800 text-white"
          }`}
        >
          {isLoading
            ? "결제 진행 중..."
            : `₩${finalAmount.toLocaleString()} 결제하기`}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
