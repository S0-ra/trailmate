import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import AboutPage from "./pages/AboutPage";
import BecomeSellerPage from "./pages/BecomeSellerPage";
import ContactPage from "./pages/ContactPage";
import CartPage from "./pages/CartPage";
import ProductListPage from "./pages/ProductListPage";
import SingleProductPage from "./pages/SingleProductPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentFailurePage from "./pages/PaymentFailurePage";
import CommunityPage from "./pages/CommunityPage";
import CommunityEventPage from "./pages/CommunityEventPage";
import VendorDashboard from "./components/dashboard/VendorDashboard";
import ListingPage from "./components/dashboard/VendorListingDashboard";
import OrdersPage from "./components/dashboard/VendorOrder";
import BlogPage from "./pages/BlogPage";
import Communities from "./components/community/Communities";
import TrailMateProfile from "./pages/Profile";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/auth" element={<AuthPage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/become-seller" element={<BecomeSellerPage />}></Route>
          <Route path="/category" element={<ProductListPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
          <Route path="/product/:id" element={<SingleProductPage />}></Route>
          <Route
            path="/dashboard-admin"
            element={<AdminDashboardPage />}></Route>
          <Route
            path="/paymentsuccess"
            element={<PaymentSuccessPage />}></Route>
          <Route
            path="/paymentfailure"
            element={<PaymentFailurePage />}></Route>
          <Route path="/community" element={<CommunityPage />}></Route>
          <Route path="/community/events" element={<CommunityEventPage />}></Route>
          <Route path="/vendor" element={<VendorDashboard/>}></Route>
          <Route path="/vendor/listing" element={<ListingPage/>}></Route>
          <Route path="/vendor/order" element={<OrdersPage/>}></Route>
          <Route path="/blog" element={<BlogPage/>}></Route>
          <Route path="/communities" element={<Communities/>}></Route>
          <Route path="/profile" element={<TrailMateProfile/>}></Route>
          
        </Routes>
      </Router>
    </>
  );
}
