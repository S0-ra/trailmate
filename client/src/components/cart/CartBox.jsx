import { useState, useEffect } from "react";
import CartSummary from "./CartSummary";
import CartItem from "./CartItem";
import { useUserId } from "../../context/UserContext";
import axios from "axios";

const CartBox = function () {
  const [cartItems, setCartItems] = useState([]);
  const { userId } = useUserId();

  useEffect(() => {
    // Make the axios call only if we have a userId
    if (userId) {
      axios
        .get(`http://localhost:8000/api/cart/${userId}`)
        .then((response) => {
          setCartItems(response.data); // Assuming the API response has a cartItems array
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
        });
    }
  }, [userId]);

  console.log("cartItems in cartbox are ", cartItems);

  return (
    <>
      <section className="text-sm pt-6 flex ml-20">
        <a href="/">Home</a>
        <p>&nbsp;&gt;&nbsp;</p>
        <a href="#" className="text-red-400">
          My Cart
        </a>
      </section>
      <div className="flex justify-center items-center">
        <div className="max-w-4xl w-full bg-white p-8 rounded-md">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <h1
              className="text-2xl font-bold tracking-tight"
              style={{ fontFamily: "montserrat" }}>
              My Cart
            </h1>
            <div className="flex space-x-8">
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 rounded-full bg-red-400 text-white flex items-center justify-center">
                  1
                </span>
                <span className="text-red-400 font-medium">My Cart</span>
              </div>
              <hr className="w-20 mt-4 border-gray-300" />
              <a href="/index/checkout.html">
                <div className="flex items-center space-x-2 opacity-50">
                  <span className="w-8 h-8 rounded-full bg-gray-300 text-white flex items-center justify-center">
                    2
                  </span>
                  <span className="text-gray-500">Checkout</span>
                </div>
              </a>
            </div>
          </div>
          <div className="flex mt-8 space-x-12">
            <div className="w-2/3">
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="form-checkbox text-red-400 w-3 h-3 mr-2"
                />
                <span className="text-gray-600 text-md">Select All</span>
              </div>
              <div className="space-y-8">
                {cartItems.map((item, index) => (
                  <CartItem key={index} item={item} />
                ))}
              </div>
            </div>
            <CartSummary cartItems={cartItems} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartBox;
