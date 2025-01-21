  import NewsletterBar from "./../components/common/NewsletterBar";
import Footer from "./../components/common/Footer";
import { ProductCatalog } from "./../components/product/ProductCatalog";
import { HeaderHome } from "../components/common/HeaderHome";

const ProductListPage = function () {
  return (
    <>
      <HeaderHome />
      <ProductCatalog />
      <NewsletterBar />
      <Footer />
    </>
  );
};

export default ProductListPage;
