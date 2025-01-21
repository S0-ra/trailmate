/* eslint react/prop-types: 0 */
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { useState } from "react";
import { useEffect } from "react";

const CartSummary = function ({ cartItems }) {
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  console.log("Cart items are ", cartItems);

  const [formData, setformData] = useState({
    amount: "100",
    tax_amount: "10",
    total_amount: "110",
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: "http://localhost:5173/paymentsuccess",
    failure_url: "http://localhost:5173/paymentfailure",
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q",
  });

  const generateSignature = (
    total_amount,
    transaction_uuid,
    product_code,
    secret
  ) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    const hashedSignature = CryptoJS.enc.Base64.stringify(hash);
    return hashedSignature;
  };

  useEffect(() => {
    const { total_amount, transaction_uuid, product_code, secret } = formData;
    const hashedSignature = generateSignature(
      total_amount,
      transaction_uuid,
      product_code,
      secret
    );

    setformData({ ...formData, signature: hashedSignature });
  }, [totalAmount]);

  return (
    <div className="w-1/3">
      <button className="w-full border text-md border-red-400 text-red-400 py-3 rounded-md mb-4 flex items-center justify-between px-4">
        <span>Have a coupon code?</span>
        <span>›</span>
      </button>

      <div className="p-5 border border-red-400 rounded-md">
        <h3 className="font-medium mb-3">Summary</h3>
        <div className="flex justify-between mb-2">
          <span className="text-sm">Total</span>
          <span className="text-red-400 font-semibold">Rs {totalAmount}</span>
        </div>
        <form
          action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
          method="POST">
          <input
            type="hidden"
            id="amount"
            name="amount"
            value={formData.amount}
            required
          />
          <input
            type="hidden"
            id="tax_amount"
            name="tax_amount"
            value={formData.tax_amount}
            required
          />
          <input
            type="hidden"
            id="total_amount"
            name="total_amount"
            value={formData.total_amount}
            required
          />
          <input
            type="hidden"
            id="transaction_uuid"
            name="transaction_uuid"
            value={formData.transaction_uuid}
            required
          />
          <input
            type="hidden"
            id="product_code"
            name="product_code"
            value={formData.product_code}
            required
          />
          <input
            type="hidden"
            id="product_service_charge"
            name="product_service_charge"
            value={formData.product_service_charge}
            required
          />
          <input
            type="hidden"
            id="product_delivery_charge"
            name="product_delivery_charge"
            value={formData.product_delivery_charge}
            required
          />
          <input
            type="hidden"
            id="success_url"
            name="success_url"
            value={formData.success_url}
            required
          />
          <input
            type="hidden"
            id="failure_url"
            name="failure_url"
            value={formData.failure_url}
            required
          />
          <input
            type="hidden"
            id="signed_field_names"
            name="signed_field_names"
            value={formData.signed_field_names}
            required
          />
          <input
            type="hidden"
            id="signature"
            name="signature"
            value={formData.signature}
            required
          />
          <button className="w-full bg-red-400 text-white py-3 rounded-md mt-2">
            Checkout
          </button>
        </form>
        <button className="w-full text-sm py-3 rounded-md mt-1 text-red-400">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
