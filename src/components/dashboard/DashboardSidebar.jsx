import React, { useCallback, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { logoutUser } from "../../helper/apis";
import { useDispatch, useSelector } from "react-redux";

const DashboardSidebar = ({ setBars }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const { uid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const basePath = `/${user?._id}/dashboard`;

  const handleLogout = useCallback(async () => {
    try {
      await logoutUser(dispatch, navigate);
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (!user || !uid) return; // Wait until user and uid are available
  
  if (String(uid) !== String(user._id)) {
    navigate("/");
  }
  }, [navigate, uid, user]);

  return (
    <div className="das-sidebar">
      <Link to="/" className="sidebar-logo">
        <img src="/assets/new-ttt-logo.jpg" alt="logo" />
      </Link>
      <div className="sidebar-tabs">
        <Link
          to={basePath}
          className={`sidebar-tab ${
            location.pathname === basePath ? "sb-active" : ""
          }`}
        >
          <i className="fa fa-home"></i>
          <span>Dashboard</span>
        </Link>
        <Link
          to={`${basePath}/news`}
          className={`sidebar-tab ${
            location.pathname === `${basePath}/news` ? "sb-active" : ""
          }`}
        >
          <i className="fa fa-newspaper"></i>
          <span>All News</span>
        </Link>
        <Link
          to={`${basePath}/add-news`}
          className={`sidebar-tab ${
            location.pathname === `${basePath}/add-news` ? "sb-active" : ""
          }`}
        >
          <i className="fa fa-plus"></i>
          <span>Add News</span>
        </Link>
        <Link
          to={`${basePath}/all-gallery`}
          className={`sidebar-tab ${
            location.pathname === `${basePath}/all-gallery` ||
            location.pathname === `${basePath}/add-gallery`
              ? "sb-active"
              : ""
          }`}
        >
          <i className="fa fa-image"></i>
          <span>Gallery</span>
        </Link>
        <Link
          to={`${basePath}/add-videos`}
          className={`sidebar-tab ${
            location.pathname === `${basePath}/add-videos` ? "sb-active" : ""
          }`}
        >
          <i className="fa fa-video"></i>
          <span>Videos</span>
        </Link>
        <Link
          to={`${basePath}/collections-releases`}
          className={`sidebar-tab ${
            location.pathname === `${basePath}/collections-releases`
              ? "sb-active"
              : ""
          }`}
        >
          <i className="fa fa-ticket"></i>
          <span>Collections & Releases</span>
        </Link>
        <Link
          to={`${basePath}/posters-ads`}
          className={`sidebar-tab ${
            location.pathname === `${basePath}/posters-ads` ? "sb-active" : ""
          }`}
        >
          <i className="fa-solid fa-rectangle-ad"></i>
          <span>Posters & Ads</span>
        </Link>
        {user?.role === "admin" && (
          <Link
            to={`${basePath}/add-account`}
            className={`sidebar-tab ${
              location.pathname === `${basePath}/add-account` ? "sb-active" : ""
            }`}
          >
            <i className="fa fa-user-plus"></i>
            <span>Add Account</span>
          </Link>
        )}
        {user?.role === "admin" && (
          <Link
            to={`${basePath}/writers`}
            className={`sidebar-tab ${
              location.pathname === `${basePath}/writers` ? "sb-active" : ""
            }`}
          >
            <i className="fa fa-users"></i>
            <span>Writers</span>
          </Link>
        )}
        <Link
          to={`${basePath}/profile`}
          className={`sidebar-tab ${
            location.pathname === `${basePath}/profile` ? "sb-active" : ""
          }`}
        >
          <i className="fa fa-user"></i>
          <span>Profile</span>
        </Link>
        <div className="sidebar-tab" onClick={handleLogout}>
          <i className="fa fa-right-from-bracket"></i>
          <span>Logout</span>
        </div>
        <div
          className="sidebar-tab sidebar-close-btn color-grey"
          onClick={() => setBars(false)}
        >
          <i className="fa fa-xmark"></i>
          <span>Close</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
