import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './context/ProtectedRoute';
import ScrollToTop from './componments/ScrollToTop';
import Header from './componments/Header.jsx';
import Footer from './componments/Footer.jsx';
import Sidebar from './componments/Sidebar.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OfferPopUp from './componments/OfferPopUp';
import EthylAlcohol from './pages/EthylAlcohol';
import Brand from './pages/Brand';
import Error from './pages/Error';
//const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);
import { useLoader } from './context/LoaderContext';
import FallbackLoader from './componments/FallbackLoader.jsx';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Forgot = lazy(() => import('./pages/Forgot'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const Signup = lazy(() => import('./pages/Signup'));
const Verify = lazy(() => import('./pages/Verify'));
const SearchResult = lazy(() => import('./pages/SearchResult'));
const About = lazy(() => import('./pages/About'));
const GetQuote = lazy(() => import('./pages/GetQuote'));
const JoinUs = lazy(() => import('./pages/JoinUs'));
const Literature = lazy(() => import('./pages/Literature'));
const Faq = lazy(() => import('./pages/Faq'));
const Career = lazy(() => import('./pages/Career'));
const Contact = lazy(() => import('./pages/Contact'));
const Cart = lazy(() => import('./pages/Cart'));
const CheckoutWrapper = lazy(() => import("./pages/CheckoutWrapper"));
const Thankyou = lazy(() => import('./pages/Thankyou'));
const Category = lazy(() => import('./pages/Category'));
const Product = lazy(() => import('./pages/Product'));
const Account = lazy(() => import('./pages/Account'));
const Profile = lazy(() => import('./pages/Profile'));
const Orders = lazy(() => import('./pages/Orders'));
const OrderDetail = lazy(() => import('./pages/OrderDetail'));
const Addresses = lazy(() => import('./pages/Addresses'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Terms = lazy(() => import('./pages/Terms'));
const Refund = lazy(() => import('./pages/Refund'));
const BillingTerms = lazy(() => import('./pages/BillingTerms'));
const WbenceCertificate = lazy(() => import('./pages/WbenceCertificate'));
const IsoCertificate = lazy(() => import('./pages/IsoCertificate'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogArchive = lazy(() => import('./pages/BlogArchive'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const UsefulLinks = lazy(() => import('./pages/UsefulLinks'));
const Supplier = lazy(() => import('./pages/Supplier'));
const Industrie = lazy(() => import('./pages/Industrie'));
const Applications = lazy(() => import('./pages/Applications'));
const ChromatographySupplies = lazy(() => import('./pages/ChromatographySupplies'));
const Cryogenic = lazy(() => import('./pages/Cryogenic'));
const Liquidhandling = lazy(() => import('./pages/Liquidhandling'));
const Microbiological = lazy(() => import('./pages/Microbiological'));
const Safety = lazy(() => import('./pages/Safety'));
const SamplePreparation = lazy(() => import('./pages/SamplePreparation'));
const AnalyticalLab = lazy(() => import('./pages/AnalyticalLab'));
const EnvironmentalChemistry = lazy(() => import('./pages/EnvironmentalChemistry'));
const MicrobiologyLab = lazy(() => import('./pages/MicrobiologyLab'));
const CannabisOilExtraction = lazy(() => import('./pages/CannabisOilExtraction'));
const FoodBeverageTesting = lazy(() => import('./pages/FoodBeverageTesting'));
const Botanical = lazy(() => import('./pages/Botanical'));
const RDLaboratory = lazy(() => import('./pages/RDLaboratory'));
const Petroleum = lazy(() => import('./pages/Petroleum'));
const Educational = lazy(() => import('./pages/Educational'));
const Biotechnology = lazy(() => import('./pages/Biotechnology'));
const Pharmaceutical = lazy(() => import('./pages/Pharmaceutical'));
const Alcohols = lazy(() => import('./pages/Alcohols'));
const WishList = lazy(() => import('./pages/WishList'));
const Company = lazy(() => import('./pages/Company'));


function BodyClassController() {
  const { loader, startLoading, stopLoading } = useLoader();
  const location = useLocation();

  useEffect(() => {
    const isHome = location.pathname === "/";
    document.body.classList.toggle("inner-page", !isHome);

    document.body.classList.add("disable-hover");
    const timer = setTimeout(() => {
      document.body.classList.remove("disable-hover");
    }, 300); 
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return null;
}

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOverlay, setIsOverlay] = useState(false);

  const toggleCart = () => {
    document.documentElement.style.overflow = "hidden";
    setIsCartOpen(prev => !prev);
    setIsOverlay(prev => !prev);
  };
  const closeCart = () => {
    document.documentElement.style.overflow = "auto";
    setIsCartOpen(false);
    setIsOverlay(false);
  };

  return (
    <>
      <OfferPopUp />
      <Suspense fallback={null}>
        <Header onToggleCart={toggleCart} isOverlay={isOverlay} isCart={isCartOpen} />
      </Suspense>
      <BodyClassController />
      <Suspense fallback={null}>
        <Sidebar isActive={isCartOpen} onClose={closeCart} />
      </Suspense>
      <ScrollToTop />
      <ToastContainer position="top-right" autoClose={3000} />
      <Suspense fallback={
          <FallbackLoader />
      }>  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<Forgot />} />
          <Route path="/reset-password/:key" element={<ResetPassword />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/verify-email" element={<Verify />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/about" element={<About />} />
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/join-us" element={<JoinUs />} />
          <Route path="/literature" element={<Literature />} />
          <Route path="/faqs" element={<Faq />} />
          <Route path="/career" element={<Career />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product-category/:category?/:subCategory?/:childrenCat?/:child?" element={<Category />} />
          <Route path="/brand/:slug?" element={<Brand />} />
          <Route path="/product/:slug" element={<Product onToggleCart={toggleCart} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="/refund-and-returns-policy" element={<Refund />} />
          <Route path="/view-wbence-certificate" element={<WbenceCertificate />} />
          <Route path="/view-iso-certificate" element={<IsoCertificate />} />
          <Route path="/billing-terms-and-conditions" element={<BillingTerms />} />
          <Route path="/useful-links" element={<UsefulLinks />} />
          <Route path="/suppliers" element={<Supplier />} />
          <Route path="/industrie" element={<Industrie />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/application_chromatography-supplies" element={<ChromatographySupplies />} />
          <Route path="/application_cryogenic" element={<Cryogenic />} />
          <Route path="/application_liquid-handling" element={<Liquidhandling />} />
          <Route path="/application_microbiological" element={<Microbiological />} />
          <Route path="/application_safety" element={<Safety />} />
          <Route path="/application_sample-preparation" element={<SamplePreparation />} />
          <Route path="/analytical-lab" element={<AnalyticalLab />} />
          <Route path="/environmental-chemistry" element={<EnvironmentalChemistry />} />
          <Route path="/microbiology-lab" element={<MicrobiologyLab />} />
          <Route path="/cannabis-oil-extraction" element={<CannabisOilExtraction />} />
          <Route path="/food-beverage-testing" element={<FoodBeverageTesting />} />
          <Route path="/botanical" element={<Botanical />} />
          <Route path="/rd-laboratory" element={<RDLaboratory />} />
          <Route path="/petroleum" element={<Petroleum />} />
          <Route path="/educational" element={<Educational />} />
          <Route path="/biotechnology" element={<Biotechnology />} />
          <Route path="/pharmaceutical" element={<Pharmaceutical />} />
          <Route path="/alcohols" element={<Alcohols />} />
          <Route path="/ethyl-alcohol" element={<EthylAlcohol />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogArchive />} />
          <Route path="/blog/detail/:slug" element={<BlogDetail />} />
          <Route
            path="/checkout"
            element={
              <Suspense fallback={<div className="full_page_loader"></div>}>
                <CheckoutWrapper />
              </Suspense>
            }
          />          
          <Route path="/user/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/user/company" element={<ProtectedRoute><Company /></ProtectedRoute>} />
          <Route path="/user/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/user/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/user/order/:id" element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
          <Route path="/user/addresses" element={<ProtectedRoute><Addresses /></ProtectedRoute>} />
          <Route path="/user/wishlist" element={<ProtectedRoute><WishList /></ProtectedRoute>} />
          <Route path="/thankyou" element={<Thankyou />} />
          <Route path="*" element={<Error /> }/>
        </Routes>
        </Suspense>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>    
      </>
  );
}

export default App;
