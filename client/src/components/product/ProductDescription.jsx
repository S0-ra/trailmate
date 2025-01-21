/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { useUserId } from "../../context/UserContext";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";


const SingleReview = function ({ review }) {
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users/name/${review.userid}`)
      .then((response) => {
        setName(response.data.name);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [review.userid]);

  if (loading) {
    return (
      <div className="w-full bg-white rounded-lg shadow p-4">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-lg shadow p-4">
      <div className="flex items-start space-x-4">
        <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold">
          {name?.charAt(0) || "?"}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium">{review.rating}</span>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
          <p className="mt-2 text-gray-600">{review.reviewtext}</p>
        </div>
      </div>
    </div>
  );
};





const ReviewSection = function ({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { userId } = useUserId();

  const fetchReviews = () => {
    axios
      .get(`http://localhost:8000/api/review/${productId}`)
      .then((response) => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error('Please login to submit a review');
      return;
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    if (reviewText.trim().length < 10) {
      toast.error('Review must be at least 10 characters long');
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post('http://localhost:8000/api/review', {
        userid: userId,
        equipmentid: productId,
        rating,
        reviewtext: reviewText
      });

      toast.success('Review submitted successfully!');
      setRating(0);
      setReviewText('');
      fetchReviews(); // Refresh reviews after successful submission
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Reviews List Section */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-2xl font-semibold">Customer Reviews</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {loading ? (
                  Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="h-32 w-full bg-gray-100 rounded-lg animate-pulse"
                      />
                    ))
                ) : reviews.length > 0 ? (
                  reviews.map((review) => (
                    <SingleReview key={review.reviewid} review={review} />
                  ))
                ) : (
                  <div className="bg-gray-50 rounded-lg">
                    <div className="p-8 text-center">
                      <p className="text-gray-600">
                        No reviews yet. Be the first to review!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Add Review Form Section */}
        <div className="lg:w-[400px]">
          <div className="bg-white rounded-lg shadow sticky top-4">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Write a Review</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Rating:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className="p-1"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHover(star)}
                      onMouseLeave={() => setHover(0)}
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= (hover || rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Review</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Share your experience with this product..."
                  className="w-full min-h-[100px] p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f46b5b] focus:border-transparent resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="text-white bg-[#f46b5b] hover:bg-[#e45b4b] px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};



const ProductDetails = function ({ product }) {
  const [count, setCount] = useState(1);
  const { userId } = useUserId();

  const handleIncrease = function () {
    setCount((prev) => prev + 1);
  };

  const handleDecrease = function () {
    if (count === 1) {
      setCount(1);
    } else {
      setCount((prev) => prev - 1);
    }
  };

  const addToCart = async function () {
    const cartItem = {
      userid: userId,
      equipmentid: product.equipmentid,
      quantity: count,
      price: product.price,
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/api/cart",
        cartItem
      );
      console.log("Item added to cart", response.data.message);
      toast.success(`Item added to cart`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.log(
        "Error adding item to cart",
        error.response?.data?.message || error.message
      );
    }
  };

  console.log(product);

  return (
    <>
      <div className="flex flex-col gap-2 mt-10 flex-1">
        <div className="flex items-center">
          {product.rating}&nbsp;
          <FaStar className="text-yellow-400" />
        </div>

        <h1 className="text-2xl mb-2">{product.name}</h1>
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-3xl font-semibold">Rs {product.price}</h1>
          <p className="text-red-400 font-medium">
            {product.availabilitystatus.toUpperCase()}
          </p>
        </div>
        <hr className="mt-2" />
        <div>
          <h1 className="text-sm mt-2">Description</h1>
          <p className="text-sm text-[#c4c4c4] mt-2">{product.description}</p>
        </div>
        <div className="flex gap-6 items-center mt-8">
          <p className="text-red-400 text-sm font-medium">
            {product.availabilitystatus === "buy" ? "Quantity" : "Rental Days"}
          </p>
          <button
            className="bg-[#c4c4c4] py-2 px-4 rounded-md"
            onClick={handleDecrease}>
            -
          </button>
          <p>{count}</p>
          <button
            className="text-white py-2 px-4 rounded-md bg-[#f46b5b]"
            onClick={handleIncrease}>
            +
          </button>
          <button
            className="text-white bg-[#f46b5b] p-2 rounded-md text-sm"
            onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

const ProductImage = function ({ image }) {
  console.log(image);
  return (
    <>
      <div
        className="flex-1 w-64 h-64 bg-cover bg-center rounded-lg"
        style={{
          backgroundImage: `url(/${image})`,
          height: "auto",
          width: "100%",
          aspectRatio: "4/3",
          backgroundSize:"cover"
        }}></div>
    </>
  );
};

const ProductDescription = ({ product }) => {
  console.log("Product received is", product);
  return (
    <>
      <div className="flex mt-20 p-10 justify-around items-center gap-10">
        <ProductImage image={product.imageurl} />
        <ProductDetails product={product} />
      </div>
      <div>
        <ReviewSection productId={product.equipmentid} />
      </div>
    </>
  );
};

export default ProductDescription;
