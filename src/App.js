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
import Dashboard from "./pages/Dashboard";
import DashAddWriter from "./components/dashboard/DashAddWriter";
import DashAllNews from "./components/dashboard/DashAllNews";
import DashProfile from "./components/dashboard/DashProfile";
import DashAllWriters from "./components/dashboard/DashAllWriters";
import DashAddNews from "./components/dashboard/DashAddNews";
import DashGalleryAdd from "./components/dashboard/DashGalleryAdd";
import DashVideos from "./components/dashboard/DashVideos";
import DashEditNews from "./components/dashboard/DashEditNews";
import DashCR from "./components/dashboard/DashCR";
import DashGalleryAll from "./components/dashboard/DashGalleryAll";
import DashEditGallery from "./components/dashboard/DashEditGallery";
import DashAdsPosters from "./components/dashboard/DashAdsPosters";
import DashUserProfile from "./components/dashboard/DashUserProfile";
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

        <Route path="/:uid/dashboard" element={<Dashboard />} />
        <Route path="/:uid/dashboard/news" element={<DashAllNews />} />
        <Route path="/:uid/dashboard/add-news" element={<DashAddNews />} />
        <Route
          path="/:uid/dashboard/edit-news/:newsId"
          element={<DashEditNews />}
        />
        <Route
          path="/:uid/dashboard/add-gallery"
          element={<DashGalleryAdd />}
        />
        <Route
          path="/:uid/dashboard/all-gallery"
          element={<DashGalleryAll />}
        />
        <Route
          path="/:uid/dashboard/edit-gallery/:gid"
          element={<DashEditGallery />}
        />
        <Route path="/:uid/dashboard/add-account" element={<DashAddWriter />} />
        <Route path="/:uid/dashboard/add-videos" element={<DashVideos />} />
        <Route
          path="/:uid/dashboard/collections-releases"
          element={<DashCR />}
        />
        <Route
          path="/:uid/dashboard/posters-ads"
          element={<DashAdsPosters />}
        />
        <Route path="/:uid/dashboard/writers" element={<DashAllWriters />} />
        <Route path="/:uid/dashboard/profile" element={<DashProfile />} />
        <Route
          path="/:uid/dashboard/update-profile/:userId"
          element={<DashUserProfile />}
        />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
