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

    return result?.data;
  } catch (error) {
    const err = error.response.data;
    console.log(err);
    return { status: "fail", message: err.message };
  }
};

/*///========= API REQUESTES ===========///*/

//=========== AUTHENTICATION ===========
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

//========== HOME NEWS ==========
export const getHomeGridPosts = async () => {
  try {
    const res = await apiRequest({
      url: "/home/get-featured-posts",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getTopNinePosts = async () => {
  try {
    const res = await apiRequest({
      url: "/home/get-top-nine",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getTrendsPosts = async () => {
  try {
    const res = await apiRequest({
      url: "/home/get-trends",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getHotTopics = async () => {
  try {
    const res = await apiRequest({
      url: "/home/get-hot-topics",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getBreakingNews = async () => {
  try {
    const res = await apiRequest({
      url: "/home/get-breaking-news",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryTopPosts = async (category) => {
  try {
    const res = await apiRequest({
      url: `/home/get-category-top?category=${category}`,
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
      url: "/home/get-movie-releases",
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
      url: "/home/get-movie-collections",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

//======== CONTACT AND AD ===========

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

//======= REACTIONS AND COMMENTS ====
export const addNewsReaction = async (id, data) => {
  try {
    const res = await apiRequest({
      url: `/news/${id}/add-reaction`,
      method: "PUT",
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
      url: `/gallery/${id}/add-reaction`,
      method: "PUT",
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
      url: `/comments/${id}?language=en`,
      method: "GET",
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
      method: "PUT",
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
      method: "PUT",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

//============ POSTERS AND ADS ============

export const getPopupPoster = async () => {
  try {
    const res = await apiRequest({
      url: "/home/get-popup-poster",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getMoviePoster = async () => {
  try {
    const res = await apiRequest({
      url: "/home/get-movie-poster",
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getNavbarAd = async () => {
  try {
    const res = await apiRequest({
      url: "/home/get-navbar-ad",
      method: "GET",
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
      url: "/home/get-home-long-ad",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("Error getting home long ad:", error);
    throw error;
  }
};

export const getHomeShortAd = async () => {
  try {
    const res = await apiRequest({
      url: "/home/get-home-short-ad",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("Error getting home short ad:", error);
    throw error;
  }
};
// Category Ads
export const getCategoryLongAd = async () => {
  try {
    const res = await apiRequest({
      url: "/home/get-category-long-ad",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("Error getting category long ad:", error);
    throw error;
  }
};

export const getCategoryShortAd = async () => {
  try {
    const res = await apiRequest({
      url: "/home/get-category-short-ad",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("Error getting category short ad:", error);
    throw error;
  }
};
// News Ads
export const getNewsLongAd = async () => {
  try {
    const res = await apiRequest({
      url: "/home/get-news-long-ad",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("Error getting news long ad:", error);
    throw error;
  }
};

export const getNewsShortAd = async () => {
  try {
    const res = await apiRequest({
      url: "/home/get-news-short-ad",
      method: "GET",
    });
    return res;
  } catch (error) {
    console.error("Error getting news short ad:", error);
    throw error;
  }
};

//======== NEWS ==========
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

export const getFilteredNews = async (
  category,
  time,
  searchText,
  writer,
  page,
  limit
) => {
  try {
    const params = new URLSearchParams({
      category: category || "",
      time: time || "",
      searchText: searchText || "",
      writer: writer || "",
      page: page || 1,
      limit: limit || 10,
    });

    const res = await apiRequest({
      url: `/news/filter?${params.toString()}`,
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

export const getSingleNews = async (id) => {
  try {
    const res = await apiRequest({
      url: `/news/n/${id}`,
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

//========= SEARCH ==============
export const getSearchNews = async (q, skip = 0, limit = 9) => {
  try {
    const res = await apiRequest({
      url: `/home/search?q=${encodeURIComponent(
        q
      )}&skip=${skip}&limit=${limit}`,
      method: "GET",
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};

//
export const getSpeech = async ({ text, newsId }) => {
  try {
    const res = await apiRequest({
      url: `/speech/text-to-speech`,
      method: "POST",
      data: {
        text,
        newsId,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

//========== GALLERY ==============
export const getFilteredGallery = async (
  category,
  time,
  searchText,
  page,
  limit
) => {
  try {
    const params = new URLSearchParams({
      category: category || "",
      time: time || "",
      searchText: searchText || "",
      page: page || 1,
      limit: limit || 8,
    });

    const res = await apiRequest({
      url: `/gallery/filter?${params.toString()}`,
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
      url: `/gallery/g/${id}`,
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

//========== VIDEOS ==============
export const getFilteredVideos = async (
  category,
  time,
  searchText,
  page,
  limit
) => {
  try {
    const params = new URLSearchParams({
      category: category || "",
      time: time || "",
      searchText: searchText || "",
      page: page || 1,
      limit: limit || 8,
    });

    const res = await apiRequest({
      url: `/videos/filter?${params.toString()}`,
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
      url: `/videos/v/${id}`,
      method: "GET",
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};
