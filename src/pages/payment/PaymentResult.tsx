import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from '../../lib/supabase/supabase';
import { useCartStore } from "../../stores/useCartStore";

const PaymentResult = () => {
  const clearCart = useCartStore(state => state.clearCart)
  const [searchParams] = useSearchParams();
  const [responseData, setResponseData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('')
  const [result, setResult] = useState(false)
 
  useEffect(() => {
    async function confirm() {
      const requestData = {
        orderId: searchParams.get("orderId"),
        amount: searchParams.get("amount"),
        paymentKey: searchParams.get("paymentKey"),
      };

      const response = await fetch("/api/confirm/widget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const json = await response.json();

      if (!response.ok) {
        throw { message: json.message, code: json.code };
      }

      return json;
    }

    confirm()
      .then(async (data) => {
        await supabase.from("payment")
        .insert({
          order_id: data.orderId,
          order_name: data.orderName,
          amount: data.totalAmount,
          payment_key: data.paymentKey,
          status: data.status
        })
        setResponseData(data)
        setResult(true)
        clearCart()
      })
      .catch((error) => {
        // navigate(`/fail?code=${error.code}&message=${error.message}`);
        setErrorMessage(`${error.code} : ` + `${error.message}`)
      });
  }, [searchParams]);

  return (
    <>
      <div className="box_section" style={{ width: "600px" }}>
        <div className="w-full flex items-center justify-center">
        <img
          width="100px"
          src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
        />

        </div>
        <h2>결제를 완료했어요</h2>
        <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
          <div className="p-grid-col text--left">
            <b>결제금액</b>
          </div>
          <div className="p-grid-col text--right" id="amount">
            {`${Number(searchParams.get("amount")).toLocaleString()}원`}
          </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>주문번호</b>
          </div>
          <div className="p-grid-col text--right" id="orderId">
            {`${searchParams.get("orderId")}`}
          </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>paymentKey</b>
          </div>
          <div
            className="p-grid-col text--right"
            id="paymentKey"
            style={{ whiteSpace: "initial", width: "250px" }}
          >
            {`${searchParams.get("paymentKey")}`}
          </div>
        </div>
       
      </div>
      <div
        className="box_section"
        style={{ width: "600px", textAlign: "left" }}
      >
        <b>Response Data :</b>
        <div id="response" style={{ whiteSpace: "initial" }}>
          {responseData && <pre>{JSON.stringify(responseData, null, 4)}</pre>}
          {errorMessage && <pre>{errorMessage}</pre>  }
        </div>
      </div>
    </>
  );
}

export default PaymentResult
