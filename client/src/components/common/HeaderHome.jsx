import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBagShopping,
} from "@fortawesome/free-solid-svg-icons";
import ContactInfo from "./ContactInfo";
import { useUserId } from "../../context/UserContext";
import { useProduct } from "../../context/ProductContext"; // Add this import
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'; //

export const HeaderHome = function () {
  const { userId, updateUserId } = useUserId();
  const { searchQuery, setSearchQuery } = useProduct(); // Add this
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/category');
    }
  };

  return (
    <>
      <ContactInfo />
      <div className="container mx-auto my-4 px-5">
        <div className="flex justify-between items-center space-y-3 flex-wrap">
          <a href="#" className="text-3xl font-bold text-red-400">
            TrailMate
          </a>

          <div className="flex-wrap space-y-2 items-start md:items-center space-x-2 md:space-x-4 md:flex">
            <form
              onSubmit={handleSearch}
              className="flex items-center border w-1/3 md:w-max border-gray-300 rounded-lg overflow-hidden">
              <input
                type="text"
                placeholder="Search here"
                className="py-2 px-4 w-80 border-none outline-none text-sm text-gray-600 focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="bg-red-400 p-3 text-white cursor-pointer"
                />
              </button>
            </form>
            <div>
              <a href="/cart">
                <FontAwesomeIcon
                  icon={faBagShopping}
                  className="fa-lg px-2"
                  style={{ color: "#000000" }}
                />
              </a>
            </div>
            {!userId ? (
              <>
                <a className="text-red-400 text-sm underline" href="/auth">
                  Sign in
                </a>
                <button
                  className="text-white text-sm px-3 py-2 bg-red-400 rounded"
                  href="/auth">
                  Sign Up
                </button>
              </>
            ) : (
              <button
                className="text-red-400 text-sm underline"
                onClick={() => {
                  updateUserId(null);
                  toast.success("Logged out", {
                    position: "top-right", // Customize position (optional)
                    autoClose: 3000, // Duration in milliseconds
                    hideProgressBar: true,
                  });
                }}>
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        id="nav-links"
        className="pt-4 text-gray-950 ps-5 text-xs show md:flex md:flex-row md:space-y-0 md:justify-center px-6 flex flex-col justify-start md:space-x-6 space-y-3">
        <a href="/" className="text-red-400">
          Home
        </a>
        <a href="/about">About</a>
        <a href="/category">Product</a>
        <a href="/blog">Blog</a>
        <a href="/contact">Contact</a>
        <a href="/community">Our Community</a>
        <a href="/become-seller">Sell Products</a>
      </div>
    </>
  );
};
