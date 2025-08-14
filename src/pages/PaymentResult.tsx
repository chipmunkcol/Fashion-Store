import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, XCircle, Home, RotateCcw } from "lucide-react";
import ReactGA from "react-ga4";
import { useCartStore } from "../stores/useCartStore";

const PaymentResult: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { items } = useCartStore();
  const [paymentInfo, setPaymentInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isSuccess = window.location.pathname.includes("success");
  const orderId = searchParams.get("orderId");
  const paymentKey = searchParams.get("paymentKey");
  const amount = searchParams.get("amount");

  useEffect(() => {
    // 실제 환경에서는 서버에서 결제 정보를 조회해야 합니다
    const mockPaymentInfo = {
      orderId: orderId || "ORDER_" + Date.now(),
      paymentKey: paymentKey || "test_payment_key",
      amount: amount || "0",
      method: "카드",
      approvedAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setPaymentInfo(mockPaymentInfo);
      setIsLoading(false);
    }, 1000);
  }, [orderId, paymentKey, amount]);

  useEffect(() => {
    if (isSuccess) {
      ReactGA.event("purchase", {
        transaction_id: orderId,
        currency: "KRW",
        value: amount,
        shipping: 0,
        tax: 0,
        items: items.map((item) => ({
          item_id: item.id,
          item_name: item.product.name,
          category: item.product.category,
          price: item.product.price,
          quantity: item.quantity,
        })),
      });
    }
  }, [isSuccess]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">결제 정보를 확인하고 있습니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Result Icon */}
          <div className="text-center mb-8">
            {isSuccess ? (
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-4" />
            ) : (
              <XCircle className="h-20 w-20 text-red-500 mx-auto mb-4" />
            )}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {isSuccess ? "결제가 완료되었습니다!" : "결제에 실패했습니다"}
            </h1>
            <p className="text-gray-600">
              {isSuccess
                ? "주문이 정상적으로 접수되었습니다."
                : "결제 중 문제가 발생했습니다."}
            </p>
          </div>

          {/* Payment Info */}
          {isSuccess && paymentInfo && (
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                결제 정보
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">주문번호</span>
                  <span className="text-gray-900 font-medium">
                    {paymentInfo.orderId}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">결제금액</span>
                  <span className="text-gray-900 font-medium">
                    ₩{parseInt(paymentInfo.amount).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">결제방법</span>
                  <span className="text-gray-900 font-medium">
                    {paymentInfo.method}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">결제일시</span>
                  <span className="text-gray-900 font-medium">
                    {new Date(paymentInfo.approvedAt).toLocaleString("ko-KR")}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Error Info */}
          {!isSuccess && (
            <div className="bg-red-50 rounded-lg p-6 shadow-sm mb-6">
              <h2 className="text-lg font-semibold text-red-900 mb-2">
                실패 사유
              </h2>
              <p className="text-red-700 text-sm">
                {searchParams.get("message") ||
                  "결제 처리 중 오류가 발생했습니다."}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            {isSuccess ? (
              <>
                <button
                  onClick={() => navigate("/orders")}
                  className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <span>주문 내역 보기</span>
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Home className="h-5 w-5" />
                  <span>홈으로 가기</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/cart")}
                  className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <RotateCcw className="h-5 w-5" />
                  <span>다시 시도하기</span>
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
                >
                  <Home className="h-5 w-5" />
                  <span>홈으로 가기</span>
                </button>
              </>
            )}
          </div>

          {/* Additional Info */}
          {isSuccess && (
            <div className="mt-8 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                배송 안내
              </h3>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• 주문 완료 후 1-2일 내 배송 시작</li>
                <li>• 배송 현황은 주문 내역에서 확인 가능</li>
                <li>• 문의사항은 고객센터로 연락 주세요</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;
