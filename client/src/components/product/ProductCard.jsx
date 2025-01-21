import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ProductCard = function ({ id, name, price, availability, path, rating }) {
  const navigate = useNavigate();
  const handleClick = function () {
    navigate(`/product/${id}`);
  };

  return (
    <a className="w-full hover:cursor-pointer">
      <div className="w-full border border-gray-200 rounded-lg p-4 mb-5 text-center">
        <div className="relative w-full h-56 bg-gray-200 rounded-lg">
          <img src={`src/assets/${path}`} alt="Product Image"  className="w-full h-full object-contain"/>
        </div>
        <div className="mt-4">
          <h2 className="text-sm font-medium text-gray-800">{name}</h2>
          <p className="text-red-400 text-sm py-1 font-semibold">Rs{price}</p>
          <div className="flex justify-center items-center mt-2 space-x-3 text-gray-500">
            <div>
              <span className="text-yellow-500 text-sm">★</span>
              <span className="text-sm">{rating}</span>
            </div>
            <div>
              <span className="text-sm text-gray-300">|</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-center space-x-2">
          {availability === "buy" && (
            <button
              className="px-3 py-1 text-xs text-white bg-red-400 hover:bg-red-500"
              onClick={handleClick}>
              Buy
            </button>
          )}
          {availability === "rent" && (
            <button
              className="px-3 py-1 text-xs text-white bg-gray-800 hover:bg-gray-900"
              onClick={handleClick}>
              Rent
            </button>
          )}
        </div>
      </div>
    </a>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  availability: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default ProductCard;
