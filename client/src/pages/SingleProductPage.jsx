import HeaderCommon from "../components/common/HeaderCommon";
import NewsletterBar from "../components/common/NewsletterBar";
import Footer from "./../components/common/Footer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import ProductDescription from "../components/product/ProductDescription";

const SingleProductPage = function () {
  const { id } = useParams();
  const productId = Number(id);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/api/equipment/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, productId]);

  console.log(product);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading product</div>;
  if (!product) return <div>No product found</div>;

  return (
    <>
      <HeaderCommon />
      <ProductDescription product={product} />
      <NewsletterBar />
      <Footer />
    </>
  );
};

export default SingleProductPage;
