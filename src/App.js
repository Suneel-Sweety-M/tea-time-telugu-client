import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Gallery from "./pages/Gallery";
import Videos from "./pages/Videos";
import SingleVideo from "./pages/SingleVideo";
import SingleNews from "./pages/SingleNews";
import PageNotFound from "./pages/PageNotFound";
import GalleryShow from "./pages/GalleryShow";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import AdWithUs from "./pages/AdWithUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoggedinUser } from "./helper/apis";
import { login } from "./redux/userSlice";
import Search from "./pages/Search";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await getLoggedinUser();

        if (res) {
          dispatch(login(res));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
    window.scrollTo(0, 0);
  }, [dispatch, location]);
  return (
    <>
      <ToastContainer /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/adwithus" element={<AdWithUs />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/videos/v/:vid" element={<SingleVideo />} />
        <Route path="/gallery/:id" element={<GalleryShow />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:category" element={<Category />} />
        <Route path="/:category/:id" element={<SingleNews />} />
        <Route path="/:category/:subcategory/:id" element={<SingleNews />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
