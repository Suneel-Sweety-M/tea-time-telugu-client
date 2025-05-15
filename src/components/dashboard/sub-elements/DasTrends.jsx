import React, { useEffect, useState } from "react";
import {
  addTrendsPosts,
  getNewsPosts,
  getTrendsPosts,
} from "../../../helper/apis";
import { toast } from "react-toastify";
import moment from "moment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DasTrends = () => {
  const { user } = useSelector((state) => state.user); 
  const navigate = useNavigate();

  const [popupNews, setPopupNews] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [news, setNews] = useState([]);
  const [topNineNews, setTopNineNews] = useState([]);
  const [selected, setSelected] = useState([]);

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

  const handleCheckboxChange = (id) => {
    if (selected.includes(id)) {
      setSelected((prevSelected) => prevSelected.filter((item) => item !== id));
    } else {
      if (selected?.length === 11) {
        toast.info("You have reached max limit.");
        return;
      }
      setSelected((prevSelected) => [...prevSelected, id]);
    }
  };

  const allNews = async () => {
    try {
      const res = await getNewsPosts();
      if (res?.status === "success") {
        setNews(res?.news);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const allTopNinePosts = async () => {
    setIsLoading(true);
    try {
      const res = await getTrendsPosts();
      if (res?.status === "success") {
        setTopNineNews(res?.news);
        const ids = res?.news.map((newsItem) => newsItem._id);
        setSelected(ids);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (selected?.length < 5) {
      toast.info("Select 5 posts");
      return;
    }
    setIsUploading(true);
    try {
      const res = await addTrendsPosts({ items: selected });
      if (res?.status === "success") {
        toast.success(res?.message);
        setPopupNews(false);
        allTopNinePosts();
      } else {
        toast.error(res?.message);
      }
      setIsUploading(false);
    } catch (error) {
      console.log(error);
      setIsUploading(false);
    }
  };

  const handleLink = (id) => {
    navigate(`/${user?._id}/dashboard/edit-news/${id}`);
  };

  const handleView = (news) => {
    navigate(`/${news?.category}/${news?._id}`);
  };

  useEffect(() => {
    allTopNinePosts();
    allNews();
  }, []);
  return (
    <>
      <div className="das-news-container">
        <i
          className="fa fa-pen-to-square das-float-right cp"
          onClick={() => setPopupNews(true)}
        ></i>
        <div className="das-news-container-title">Trends</div>

        {!isLoading ? (
          <table className="das-all-news-section">
            <thead>
              <tr>
                <th className="table-sn">S.No.</th>
                <th className="table-title">Title</th>
                <th className="table-image">Image</th>
                <th className="table-category">Category</th>
                <th className="table-date">Date</th>
                <th className="table-status">Writer</th>
                <th className="table-action">Action</th>
              </tr>
            </thead>
            {topNineNews?.length > 0 ? (
              <tbody>
                {topNineNews?.map((item, index) => (
                  <tr key={index}>
                    <td className="table-sn">{index + 1}</td>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <p className="m10 dfc w100">No posts</p>
            )}
          </table>
        ) : (
          <div>
            <div className="snlc-text"></div>
            <div className="snlc-text"></div>
            <div className="snlc-text"></div>
            <div className="snlc-text"></div>
            <div className="snlc-text"></div>
            <div className="snlc-text"></div>
          </div>
        )}
      </div>

      {popupNews && (
        <div className="popup-news-container popup-container">
          <div className="br5 popup-img p10">
            <div className="das-news-container">
              <div className="popup-news-top das-d-flex das-jcsb">
                <div className="das-news-container-title">Select Trends</div>
                <span className="popup-news-top-x das-mx20">
                  <i
                    className="fa fa-xmark"
                    onClick={() => setPopupNews(false)}
                  ></i>
                </span>
              </div>

              {!isLoading ? (
                <table className="das-all-news-section">
                  <thead>
                    <tr>
                      <th className="table-checkbox"></th>
                      <th className="table-sn">S.No.</th>
                      <th className="table-title">Title</th>
                      <th className="table-image">Image</th>
                      <th className="table-category">Category</th>
                      <th className="table-date">Date</th>
                      <th className="table-status">Writer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentNews?.map((item, index) => (
                      <tr key={index}>
                        <td className="table-checkbox">
                          <input
                            type="checkbox"
                            checked={selected.includes(item?._id)}
                            onChange={() => handleCheckboxChange(item?._id)}
                          />
                        </td>
                        <td className="table-sn">
                          {indexOfFirstItem + index + 1}
                        </td>
                        <td className="table-title">{item?.title}</td>
                        <td className="table-image">
                          <img src={item?.mainUrl} alt="pic" />
                        </td>
                        <td className="table-category">{item?.category}</td>
                        <td className="table-date">
                          {moment(item?.createdAt).format(
                            "h:mm a, D MMMM YYYY"
                          )}
                        </td>
                        <td className="table-status">
                          <span>{item?.postedBy?.fullName}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>
                  <div className="snlc-text"></div>
                  <div className="snlc-text"></div>
                  <div className="snlc-text"></div>
                  <div className="snlc-text"></div>
                  <div className="snlc-text"></div>
                  <div className="snlc-text"></div>
                </div>
              )}

              <div className="das-all-news-bottom">
                <div className="news-popup-btns das-mx10">
                  {!isUploading ? (
                    <button className="btn save-btn" onClick={handleSave}>
                      Save
                    </button>
                  ) : (
                    <button className="btn is-sending-btn">Saving...</button>
                  )}
                </div>

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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DasTrends;
