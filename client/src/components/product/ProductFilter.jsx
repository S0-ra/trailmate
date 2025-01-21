import { useState } from "react";
import { useProduct } from "../../context/ProductContext";
import { FaStar } from "react-icons/fa";

const ProductFilter = () => {
  const { filter, updateFilter, resetFilters, intialFilter } = useProduct();
  const [tempFilter, setTempFilter] = useState({ ...filter });

  const handleTempFilterChange = (key, value) => {
    setTempFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const applyFilters = () => {
    Object.keys(tempFilter).forEach((key) => {
      updateFilter(key, tempFilter[key]);
    });
  };

  const handleReset = () => {
    resetFilters();
    setTempFilter(intialFilter);
  };

  return (
    <aside className="w-full h-3/4 text-sm lg:w-1/4 bg-white p-6 shadow rounded">
      <h2 className="font-bold text-lg mb-4">All Categories</h2>
      <ul className="space-y-2 text-sm mb-6">
        {[
          "Sleeping Bags",
          "Tents",
          "Backpacks",
          "Trekking Poles",
          "Shoes",
          "Accessories",
        ].map((category, index) => (
          <li key={index}>
            <a href="#" className="text-gray-700 hover:text-red-400">
              {category}
            </a>
          </li>
        ))}
      </ul>

      <hr className="my-4" />
      <h2 className="font-medium text-regular mb-4">Filter by Price</h2>
      <div className="mb-6">
        <input
          type="range"
          min="0"
          max="100000"
          step="1000"
          value={tempFilter.maxPrice || 0}
          onChange={(e) =>
            handleTempFilterChange("maxPrice", Number(e.target.value))
          }
          className="price-slider w-full accent-red-400"
        />
        <p className="text-gray-600 mt-2">
          Price:Rs0 - Rs{tempFilter.maxPrice || 0}
        </p>
      </div>

      <hr className="my-4" />
      <h2 className="font-medium text-regular mb-4">Filter by Location</h2>
      <select
        className="w-full border-gray-300 rounded"
        value={filter.location || ""}
        onChange={(e) => handleTempFilterChange("location", e.target.value)}>
        <option value="">Select Location</option>
        {[
          "Kathmandu",
          "Pokhara",
          "Chitwan",
          "Birgunj",
          "Dhangadi",
          "Nepalgunj",
          "Palpa",
          "Ilam",
        ].map((loc, index) => (
          <option key={index} value={loc}>
            {loc.toUpperCase()}
          </option>
        ))}
      </select>

      <hr className="my-4" />
      <h2 className="font-medium text-regular mb-4">Filter by Rating</h2>
      <div className="space-y-2">
        {[5, 4, 3].map((stars) => (
          <label key={stars} className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={tempFilter.rating === stars}
              onChange={() =>
                handleTempFilterChange(
                  "rating",
                  filter.rating === stars ? 0 : stars
                )
              }
            />
            <div className="flex items-center">
              <div className="flex ml-2">
                {Array.from({ length: stars }).map((_, index) => (
                  <FaStar key={index} className="text-yellow-400" />
                ))}
              </div>
              <div>
                <span className="text-gray-700 ml-2">
                  {stars === 5 ? "" : ` And Up`}
                </span>
              </div>
            </div>
          </label>
        ))}
      </div>

      <hr className="my-4" />
      <button
        className="mt-6 w-full bg-red-400 text-white py-2 px-4 rounded"
        onClick={applyFilters}>
        Apply Filters
      </button>
      <button
        className="text-red-400 text-center text-sm mt-5 block"
        onClick={handleReset}>
        Reset Filters
      </button>
    </aside>
  );
};

export default ProductFilter;
