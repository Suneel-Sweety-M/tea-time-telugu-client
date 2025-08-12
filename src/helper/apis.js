import axios from "axios";
import { logout } from "../redux/userSlice";

const API_URL = process.env.REACT_APP_API_URL;

export const API = axios.create({
  baseURL: API_URL,
  responseType: "json",
  withCredentials: true,
});

export const apiRequest = async ({ url, data, method }) => {
  try {
    const result = await API(url, {
      method: method || "GET",
      data: data || {},
    });

    if (
      result?.data?.message === "No token provided!" ||
      result?.data?.message === "Invalid or expired token!"
    ) {
      localStorage.removeItem("eetnewsuser");
    }

    return result?.data;
  } catch (error) {
    const err = error.response.data;
    console.log(err);
    return { status: "fail", message: err.message };
  }
};

/*========= API REQUESTES ===========*/

export const logoutUser = async (dispatch, navigate) => {
  try {
    dispatch(logout());
    const res = await apiRequest({
      url: "/auth/logout",
      method: "POST",
    });
    navigate("/");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getLoggedinUser = async () => {
  try {
    const uri = "/user/me";
    const res = await apiRequest({
      url: uri,
      method: "GET",
    });

    return res;
  } catch (error) {
    const err = error?.response?.data;
    console.log(error);
    return { status: "fail", message: err.message };
  }
};

export const registerUserByAdmin = async (data) => {
  try {
    const res = await apiRequest({
      url: "/auth/register-by-admin",
      data: data,
      method: "POST",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (data) => {
  try {
    const res = await apiRequest({
      url: "/auth/login",
      data: data,
      method: "POST",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = async (id) => {
  try {
    const res = await apiRequest({
      url: `/user/${id}`,
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addUserProfile = async (data) => {
  try {
    const res = await apiRequest({
      url: `/user/add-profile-pic`,
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editUserPic = async (data, id) => {
  try {
    const res = await apiRequest({
      url: `/user/edit-profile-pic/${id}`,
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserDetails = async (id, data) => {
  try {
    const res = await apiRequest({
      url: `/user/${id}/update-details`,
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editUserDetails = async (id, data) => {
  try {
    const res = await apiRequest({
      url: `/user/${id}/update-user-details`,
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserPassword = async (data) => {
  try {
    const res = await apiRequest({
      url: `/auth/change-password`,
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editUserPassword = async (data, id) => {
  try {
    const res = await apiRequest({
      url: `/auth/change-password/${id}`,
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getWritersAndAdmins = async () => {
  try {
    const res = await apiRequest({
      url: "/user/admins-and-writers",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateActiveStatus = async (id) => {
  try {
    const res = await apiRequest({
      url: `/user/${id}/update-active`,
      method: "POST",
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addGalleryPosts = async (data) => {
  try {
    const res = await apiRequest({
      url: "/gallery/add-gallery",
      method: "POST",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getGalleryPosts = async () => {
  try {
    const res = await apiRequest({
      url: "/gallery",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const loadGalleryPosts = async (page = 1, limit = 12) => {
  try {
    const query = new URLSearchParams();
    query.append("page", page);
    query.append("limit", limit);

    const res = await apiRequest({
      url: `/gallery/posts?${query.toString()}`,
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getFilteredGallery = async (category, time, searchText) => {
  const url =
    category || time || searchText
      ? `/gallery/search?searchText=${searchText}&category=${category}&postedTime=${time}`
      : "/gallery/search";
  try {
    const res = await apiRequest({
      url,
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleGallery = async (id) => {
  try {
    const res = await apiRequest({
      url: `/gallery/${id}`,
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleGalleryByNewsId = async (newsId) => {
  try {
    const res = await apiRequest({
      url: `/gallery/g/${newsId}`,
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const updateGallery = async (id, data) => {
  try {
    const res = await apiRequest({
      url: `/gallery/${id}/edit`,
      method: "PUT",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteGallery = async (id) => {
  try {
    const res = await apiRequest({
      url: `/gallery/${id}/delete`,
      method: "DELETE",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getNewsPosts = async () => {
  try {
    const res = await apiRequest({
      url: "/news",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getTrendingNews = async () => {
  try {
    const res = await apiRequest({
      url: "/news/trending",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}; 

export const getLatestNews = async () => {
  try {
    const res = await apiRequest({
      url: "/news/latest",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}; 

export const getHomeNewsPosts = async () => {
  try {
    const res = await apiRequest({
      url: "/news/home",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}; 

export const getFilteredNews = async (category, time, searchText, writer) => {
  const url =
    category || time || searchText || writer
      ? `/news/filtered?searchText=${searchText}&category=${category}&time=${time}&writer=${writer}`
      : "/news/filtered";
  try {
    const res = await apiRequest({
      url,
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

// export const getSearchNews = async (q) => {
//   try {
//     const res = await apiRequest({
//       url: `/news/search?q=${q}`,
//       method: "GET",
//     });

//     return res;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const getSearchNews = async (q, skip = 0, limit = 9) => {
  try {
    const res = await apiRequest({
      url: `/news/search?q=${encodeURIComponent(
        q
      )}&skip=${skip}&limit=${limit}`,
      method: "GET",
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};

export const getFilteredNewsPosts = async (category, subcategory) => {
  try {
    const url = `/news?category=${category}${
      subcategory ? `&subcategory=${subcategory}` : ""
    }`;

    const res = await apiRequest({
      url,
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryNewsPosts = async (
  category,
  subcategory,
  currentPage,
  POSTS_PER_PAGE
) => {
  try {
    const query = new URLSearchParams();

    if (category) query.append("category", category);
    if (subcategory) query.append("subcategory", subcategory);
    if (currentPage) query.append("page", currentPage);
    if (POSTS_PER_PAGE) query.append("limit", POSTS_PER_PAGE);

    const url = `/news/category?${query.toString()}`;

    const res = await apiRequest({
      url,
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addNewsPost = async (data) => {
  try {
    const res = await apiRequest({
      url: "/news/add-news",
      method: "POST",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editNewsPost = async (data, newsId) => {
  try {
    const res = await apiRequest({
      url: `/news/${newsId}/edit-news`,
      method: "POST",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteNewsPost = async (newsId) => {
  try {
    const res = await apiRequest({
      url: `/news/${newsId}/delete-news`,
      method: "POST",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleNews = async (id) => {
  try {
    const res = await apiRequest({
      url: `/news/${id}`,
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getSingleNewsByNewsId = async (newsId) => {
  try {
    const res = await apiRequest({
      url: `/news/n/${newsId}`,
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addFileForLink = async (data) => {
  try {
    const res = await apiRequest({
      url: "/dashboard/set-files-links",
      method: "POST",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getFileLink = async () => {
  try {
    const res = await apiRequest({
      url: "/dashboard/get-files-links",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addHomeGridPosts = async (data) => {
  try {
    const res = await apiRequest({
      url: "/dashboard/set-home-grid",
      method: "POST",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getDashData = async () => {
  try {
    const res = await apiRequest({
      url: "/dashboard/data",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getHomeGridPosts = async () => {
  try {
    const res = await apiRequest({
      url: "/dashboard/get-home-grid",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addTopNinePosts = async (data) => {
  try {
    const res = await apiRequest({
      url: "/dashboard/set-top-nine",
      method: "POST",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getTopNinePosts = async () => {
  try {
    const res = await apiRequest({
      url: "/dashboard/get-top-nine",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addTrendsPosts = async (data) => {
  try {
    const res = await apiRequest({
      url: "/dashboard/set-trends",
      method: "POST",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getTrendsPosts = async () => {
  try {
    const res = await apiRequest({
      url: "/dashboard/get-trends",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addHotTopics = async (data) => {
  try {
    const res = await apiRequest({
      url: "/dashboard/set-hot-topics",
      method: "POST",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getHotTopics = async () => {
  try {
    const res = await apiRequest({
      url: "/dashboard/get-hot-topics",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieReleases = async () => {
  try {
    const res = await apiRequest({
      url: "/dashboard/get-movie-releases",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMovieCollections = async () => {
  try {
    const res = await apiRequest({
      url: "/dashboard/get-movie-collections",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addMovieReleases = async (data) => {
  try {
    const res = await apiRequest({
      url: "/dashboard/add-movie-releases",
      method: "POST",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editMovieRelease = async (data) => {
  try {
    const res = await apiRequest({
      url: "/dashboard/edit-movie-release",
      method: "PUT",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMovieRelease = async (id) => {
  try {
    const res = await apiRequest({
      url: `/dashboard/delete-movie-release/${id}`,
      method: "DELETE",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addMovieCollections = async (data) => {
  try {
    const res = await apiRequest({
      url: "/dashboard/add-movie-collections",
      method: "POST",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const editMovieCollection = async (data) => {
  try {
    const res = await apiRequest({
      url: "/dashboard/edit-movie-collection",
      method: "PUT",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteMovieCollection = async (id) => {
  try {
    const res = await apiRequest({
      url: `/dashboard/delete-movie-collection/${id}`,
      method: "DELETE",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addNewsReaction = async (id, data) => {
  try {
    const res = await apiRequest({
      url: `/comments/${id}/add-reaction`,
      method: "POST",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addGalleryReaction = async (id, data) => {
  try {
    const res = await apiRequest({
      url: `/comments/${id}/add-gallery-reaction`,
      method: "POST",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getNewsComments = async (id) => {
  try {
    const res = await apiRequest({
      url: `/comments/${id}`,
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

// apis.js
export const loadNewsComments = async (
  id,
  directCommentsLimit,
  replyCommentsLimit,
  directCommentsSkip
) => {
  try {
    const res = await apiRequest({
      url: `/comments/${id}/news-comments`,
      method: "GET",
      params: {
        directCommentsLimit,
        replyCommentsLimit,
        directCommentsSkip,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addNewsComment = async (id, data) => {
  try {
    const res = await apiRequest({
      url: `/comments/${id}/add-comment`,
      method: "POST",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addNewsReplyComment = async (id, data) => {
  try {
    const res = await apiRequest({
      url: `/comments/${id}/add-reply-comment`,
      method: "POST",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteNewsComment = async (id) => {
  try {
    const res = await apiRequest({
      url: `/comments/${id}`,
      method: "DELETE",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const likeNewsComment = async (id) => {
  try {
    const res = await apiRequest({
      url: `/comments/${id}/like-comment`,
      method: "POST",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const dislikeNewsComment = async (id) => {
  try {
    const res = await apiRequest({
      url: `/comments/${id}/dislike-comment`,
      method: "POST",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addVideoPost = async (data) => {
  try {
    const res = await apiRequest({
      url: "/videos/add-video",
      method: "POST",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategoryVideos = async () => {
  try {
    const res = await apiRequest({
      url: "/videos/all",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getHomeVideos = async (subCategory, limit) => {
  try {
    const res = await apiRequest({
      url: "/videos/home",
      method: "GET",
      params: { 
        subCategory,
        limit,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}; 

export const getPaginatedCategoryVideos = async (params) => {
  try {
    const res = await apiRequest({
      url: `/videos/category?${new URLSearchParams(params).toString()}`,
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getVideo = async (id) => {
  try {
    const res = await apiRequest({
      url: `/videos/${id}`,
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getVideoByNewsId = async (newsId) => {
  try {
    const res = await apiRequest({
      url: `/videos/v/${newsId}`,
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteVideo = async (id) => {
  try {
    const res = await apiRequest({
      url: `/videos/delete/${id}`,
      method: "DELETE",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllVideos = async () => {
  try {
    const res = await apiRequest({
      url: `/videos/`,
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getQueryVideos = async (category, time, searchText) => {
  try {
    const url =
      category || time || searchText
        ? `/videos/query?searchText=${searchText}&category=${category}&postedTime=${time}`
        : "/videos/query";
    const res = await apiRequest({
      url: url,
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

/*=== Home Page === */

export const getTopScrollPosts = async () => {
  try {
    const res = await apiRequest({
      url: "/auth/news/home-scrolls",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getTopFivePosts = async () => {
  try {
    const res = await apiRequest({
      url: "/auth/news/top-five",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const contactUsEmail = async (data) => {
  try {
    const res = await apiRequest({
      url: "/user/contact-mail",
      method: "POST",
      data: data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const adWithUsEmail = async (data) => {
  try {
    const res = await apiRequest({
      url: "/user/ad-mail",
      method: "POST",
      data: data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getPopupPoster = async () => {
  try {
    const res = await apiRequest({
      url: "/dashboard/get-popup-poster",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const setPopupPoster = async (data) => {
  try {
    const res = await apiRequest({
      url: "/dashboard/set-popup-poster",
      method: "POST",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMoviePoster = async () => {
  try {
    const res = await apiRequest({
      url: "/dashboard/get-movie-poster",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const setMoviePoster = async (data) => {
  try {
    const res = await apiRequest({
      url: "/dashboard/set-movie-poster",
      method: "POST",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getNavbarAd = async () => {
  try {
    const res = await apiRequest({
      url: "/dashboard/get-navbar-ad",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const setNavbarAd = async (data) => {
  try {
    const res = await apiRequest({
      url: "/dashboard/set-navbar-ad",
      method: "POST",
      data,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

// Home Ads
export const getHomeLongAd = async () => {
  try {
    const res = await apiRequest({
      url: "/dashboard/get-home-long-ad",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("Error getting home long ad:", error);
    throw error;
  }
};

export const setHomeLongAd = async (data) => {
  try {
    const res = await apiRequest({
      url: "/dashboard/set-home-long-ad",
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.error("Error setting home long ad:", error);
    throw error;
  }
};

export const getHomeShortAd = async () => {
  try {
    const res = await apiRequest({
      url: "/dashboard/get-home-short-ad",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("Error getting home short ad:", error);
    throw error;
  }
};

export const setHomeShortAd = async (data) => {
  try {
    const res = await apiRequest({
      url: "/dashboard/set-home-short-ad",
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.error("Error setting home short ad:", error);
    throw error;
  }
};

// Category Ads
export const getCategoryLongAd = async () => {
  try {
    const res = await apiRequest({
      url: "/dashboard/get-category-long-ad",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("Error getting category long ad:", error);
    throw error;
  }
};

export const setCategoryLongAd = async (data) => {
  try {
    const res = await apiRequest({
      url: "/dashboard/set-category-long-ad",
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.error("Error setting category long ad:", error);
    throw error;
  }
};

export const getCategoryShortAd = async () => {
  try {
    const res = await apiRequest({
      url: "/dashboard/get-category-short-ad",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("Error getting category short ad:", error);
    throw error;
  }
};

export const setCategoryShortAd = async (data) => {
  try {
    const res = await apiRequest({
      url: "/dashboard/set-category-short-ad",
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.error("Error setting category short ad:", error);
    throw error;
  }
};

// News Ads
export const getNewsLongAd = async () => {
  try {
    const res = await apiRequest({
      url: "/dashboard/get-news-long-ad",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("Error getting news long ad:", error);
    throw error;
  }
};

export const setNewsLongAd = async (data) => {
  try {
    const res = await apiRequest({
      url: "/dashboard/set-news-long-ad",
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.error("Error setting news long ad:", error);
    throw error;
  }
};

export const getNewsShortAd = async () => {
  try {
    const res = await apiRequest({
      url: "/dashboard/get-news-short-ad",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("Error getting news short ad:", error);
    throw error;
  }
};

export const setNewsShortAd = async (data) => {
  try {
    const res = await apiRequest({
      url: "/dashboard/set-news-short-ad",
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.error("Error setting news short ad:", error);
    throw error;
  }
};

export const sendAdminForgotPassword = async (data) => {
  try {
    const res = await apiRequest({
      url: "/auth/admin/forgot-password",
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.error("Error sending admin forgot password:", error);
    throw error;
  }
};

export const sendWriterForgotPassword = async (data) => {
  try {
    const res = await apiRequest({
      url: "/auth/writer/forgot-password",
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.error("Error sending writer forgot password:", error);
    throw error;
  }
};

export const resetAdminPassword = async (token, data) => {
  try {
    const res = await apiRequest({
      url: `/auth/admin/reset-password/${token}`,
      method: "POST",
      data,
    });
    return res;
  } catch (error) {
    console.error("Error resetting admin password:", error);
    throw error;
  }
};
