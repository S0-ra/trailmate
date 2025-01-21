
import NewsletterBar from "../components/common/NewsletterBar";
import Footer from "../components/common/Footer";
import CartBox from './../components/cart/CartBox';
import HeaderCommon from "../components/common/HeaderCommon";

const CartPage = function () {
  return (
    <>
      <HeaderCommon/>
      <CartBox/>
      <NewsletterBar />
      <Footer />
    </>
  );
};

export default CartPage;
