/* eslint react/prop-types: 0 */

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const CartItem = ({ item }) => {
  const [equipment, setEquipment] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/equipment/${item.equipmentid}`)
      .then((response) => {
        setEquipment(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  });

  return (
    <div className="flex items-center justify-between border-b border-red-300 pb-4">
      <div className="flex items-center space-x-6">
        <input type="checkbox" className="form-checkbox text-red-400 w-5 h-5" />
        <div
          className="w-20 h-20"
          style={{
            backgroundImage: `url(/${equipment?.imageurl})`,
            backgroundSize: "cover",
          }}></div>

        <div>
          <h2 className="text-lg font-medium">{equipment?.name}</h2>
          <p className="text-red-400 font-semibold">
            Rs{item.price.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center">
          -
        </button>
        <span className="text-gray-700">{item.quantity}</span>
        <button className="w-8 h-8 bg-red-400 text-white rounded-md flex items-center justify-center">
          +
        </button>
      </div>
      <button className="text-red-400 font-semibold text-xl">×</button>
    </div>
  );
};

export default CartItem;
