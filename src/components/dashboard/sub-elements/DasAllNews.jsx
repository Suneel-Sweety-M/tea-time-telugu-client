import React, { useCallback, useEffect, useState } from "react";
import {
  deleteNewsPost,
  getFilteredNews,
  getWritersAndAdmins,
} from "../../../helper/apis";
import { toast } from "react-toastify";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DasAllNews = () => {
  const { user } = useSelector((state) => state.user); 
  const navigate = useNavigate();

  const [news, setNews] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [time, setTime] = useState("");
  const [category, setCategory] = useState("");
  const [writer, setWriter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [deletePopup, setDeletePopup] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(allUsers);
  


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const totalItems = news?.length;

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentNews = news?.slice(indexOfFirstItem, indexOfLastItem);

  const fetchData = async () => {
    try {
      const res = await getWritersAndAdmins();
      if (res?.status === "success") {
        setAllUsers(res?.users);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filteredNews = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getFilteredNews(category, time, searchText, writer);
      if (res?.status === "success") {
        setNews(res?.news);
      } else {
        toast.error(res?.message);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }, [time, category, searchText, writer]);

  const handleLink = (id) => {
    navigate(`/${user?._id}/dashboard/edit-news/${id}`);
  };

  const handleView = (news) => {
    navigate(`/${news?.category}/${news?._id}`);
  };

  const handleDeletePopup = async (id) => {
    setDeleteId(id);
    setDeletePopup(true);
  };

  const handleDeleteCancel = async () => {
    setDeleteId("");
    setDeletePopup(false);
  };

  const handleDelete = async () => {
    try {
      setIsUploading(true);
      const res = await deleteNewsPost(deleteId);
      if (res?.status === "success") {
        toast.success(res?.message);
        setDeleteId("");
        setDeletePopup(false);
        filteredNews();
      } else {
        toast.error(res?.message);
      }
      setIsUploading(false);
    } catch (error) {
      setIsUploading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    filteredNews();
    fetchData();
  }, [filteredNews]);

  return (
    <>
      <div className="das-mt20">
        <div className="das-news-container">
          <div className="das-news-container-title">All News</div>
          <div className="das-news-filter-container">
            <div className="nfc-left das-d-flex">
              <select
                className="nfc-filter mr10"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="news">News</option>
                <option value="politics">Politics</option>
                <option value="movies">Movies</option>
                <option value="gossips">Gossips</option>
                <option value="show">Show</option>
                <option value="collections">Collections</option>
                <option value="reviews">Reviews</option>
                <option value="ott">OTT</option>
              </select>
              <div className="nfc-search">
                <input
                  type="input"
                  name=""
                  id=""
                  placeholder="Search here..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <i className="fa fa-search"></i>
              </div>
            </div>
            <div className="nfc-right das-d-flex">
              <div className="nfc-filters mr10">
                <select
                  className="nfc-filter"
                  value={writer}
                  onChange={(e) => setWriter(e.target.value)}
                >
                  <option value="">Selecte Writer</option>
                  <option value={user?._id}>{user?.fullName}</option>
                  {allUsers?.map((user, index) => (
                    <option value={user?._id} key={index}>
                      {user?.fullName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="nfc-filters">
                <select
                  className="nfc-filter"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="">Selecte Time</option>
                  <option value="1day">Last 24h</option>
                  <option value="1week">Last week</option>
                  <option value="1month">Last 1 month</option>
                  <option value="6month">Last 6 month</option>
                  <option value="older">Above 6 month</option>
                </select>
              </div>
            </div>
          </div>

          <table className="das-all-news-section">
            <thead>
              <tr>
                <th className="table-sn">Index</th>
                <th className="table-title">Title</th>
                <th className="table-image">Image</th>
                <th className="table-category">Category</th>
                <th className="table-date">Date</th>
                <th className="table-status">Writer</th>
                <th className="table-action">Action</th>
              </tr>
            </thead>
            {!isLoading ? (
              <tbody>
                {currentNews?.length > 0 ? (
                  currentNews?.map((item, index) => (
                    <tr key={index}>
                      <td className="table-sn">
                        {indexOfFirstItem + index + 1}
                      </td>
                      <td className="table-title">{item?.title}</td>
                      <td className="table-image">
                        <img src={item?.mainUrl} alt="pic" />
                      </td>
                      <td className="table-category">{item?.category}</td>
                      <td className="table-date">
                        {moment(item?.createdAt).format("h:mm a, D MMMM YYYY")}
                      </td>
                      <td className="table-status">
                        <span>{item?.postedBy?.fullName}</span>
                      </td>
                      <td className="table-action">
                        <i
                          className="fa fa-eye cp color-green"
                          onClick={() => handleView(item)}
                        ></i>
                        <i
                          className="fa fa-pen-to-square cp"
                          onClick={() => handleLink(item?._id)}
                        ></i>
                        <i
                          className="fa fa-trash cp"
                          onClick={() => handleDeletePopup(item?._id)}
                        ></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <p>No posts available</p>
                )}
              </tbody>
            ) : (
              <h3 className="text-center">Loading...</h3>
            )}
          </table>

          {!isLoading && (
            <div className="das-all-news-pagenation">
              <div className="dan-pagenation-sec">
                <span>News per page: </span>
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="cp"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                </select>
                <div className="page-now">
                  {currentPage} / {Math.ceil(totalItems / itemsPerPage)} of{" "}
                  {totalItems} items
                </div>
                <div className="page-arrows">
                  <i
                    className="fa fa-angle-left cp"
                    onClick={handlePreviousPage}
                  ></i>
                  <i
                    className="fa fa-angle-right cp"
                    onClick={handleNextPage}
                  ></i>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {deletePopup && (
        <div className="popup-news-container popup-container">
          <div className="br5 popup-img p10">
            <div className="das-news-container">
              <div className="popup-news-top das-d-flex das-jcsb">
                <div className="das-news-container-title">
                  Are you sure want to delete ?
                </div>
                <span className="popup-news-top-x das-mx20">
                  <i
                    className="fa fa-xmark"
                    onClick={() => setDeletePopup(false)}
                  ></i>
                </span>
              </div>
              <div className="das-all-news-bottom das-mt20">
                <div className="news-popup-btns das-mx10">
                  <button className="btn" onClick={handleDeleteCancel}>
                    Cancel
                  </button>
                </div>

                <div className="news-popup-btns">
                  {!isUploading ? (
                    <button className="btn save-btn" onClick={handleDelete}>
                      Delete
                    </button>
                  ) : (
                    <button className="btn is-sending-btn">Deleting...</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DasAllNews;
