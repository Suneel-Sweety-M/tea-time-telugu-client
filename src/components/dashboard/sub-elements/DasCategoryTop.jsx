import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addCategoryTopPosts,
  getCategoryTopPosts,
  getCategoryPosts,
} from "../../../helper/apis";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const categories = ["movies", "news", "gossips", "ott", "politics", "reviews"];

const DasCategoryTop = () => {
  const { user } = useSelector((state) => state.teatimetelugu);
  const navigate = useNavigate();

  const [popupNews, setPopupNews] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [news, setNews] = useState([]);
  const [categoryTopNews, setCategoryTopNews] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("news");

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
    const exists = selected.find((s) => s.id === id);
    if (exists) {
      setSelected((prev) => prev.filter((s) => s.id !== id));
    } else {
      if (selected.length === 9) {
        toast.info("You have reached max limit of 9.");
        return;
      }
      setSelected((prev) => [...prev, { id, position: null }]);
    }
  };

  const handlePositionChange = (id, position) => {
    if (selected.some((s) => s.position === position)) {
      toast.error("Position already selected!");
      return;
    }
    setSelected((prev) =>
      prev.map((s) => (s.id === id ? { ...s, position } : s))
    );
  };

  const allNews = useCallback(async () => {
    try {
      const res = await getCategoryPosts(selectedCategory, "");
      if (res?.status === "success") {
        setNews(res?.news);
      }
    } catch (error) {
      console.log(error);
    }
  }, [selectedCategory]);

  const allCategoryTopPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getCategoryTopPosts(selectedCategory);
      if (res?.status === "success") {
        setCategoryTopNews(res?.posts);
        const formatted = res.posts.map((item) => ({
          id: item._id,
          position: item.position,
        }));
        setSelected(formatted);
      } else {
        setCategoryTopNews([]);
        setSelected([]);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, [selectedCategory]);

  const handleSave = async () => {
    if (selected.length !== 9) {
      toast.info("Select exactly 9 posts.");
      return;
    }
    const incomplete = selected.some((s) => !s.position);
    if (incomplete) {
      toast.error("Assign all positions (1–9).");
      return;
    }

    const posts = selected.map((s) => ({ news: s.id, position: s.position }));
    setIsUploading(true);
    try {
      const res = await addCategoryTopPosts({
        category: selectedCategory,
        posts,
      });
      if (res?.status === "success") {
        toast.success(res?.message);
        allCategoryTopPosts();
        setPopupNews(false);
      } else {
        toast.error(res?.message);
      }
    } catch (error) {
      console.log(error);
    }
    setIsUploading(false);
  };

  const handleLink = (id) => {
    navigate(`/${user?._id}/dashboard/edit-news/${id}`);
  };

  const handleView = (news) => {
    navigate(`/${news?.category}/${news?.newsId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([allCategoryTopPosts(), allNews()]);
    };
    fetchData();
  }, [selectedCategory, allCategoryTopPosts, allNews]);

  return (
    <>
      <div className="das-news-container">
        <div className="das-d-flex das-jcsb">
          <div className="das-news-container-title">Category Top Posts</div>
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="cp nfc-filter mr10"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
            <i
              className="fa fa-pen-to-square das-ml10 cp"
              onClick={() => setPopupNews(true)}
            ></i>
          </div>
        </div>

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
            {categoryTopNews?.length > 0 ? (
              <tbody>
                {categoryTopNews?.map((item, index) => (
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
          </div>
        )}
      </div>

      {popupNews && (
        <div className="popup-news-container popup-container">
          <div className="br5 popup-img p10">
            <div className="das-news-container">
              <div className="popup-news-top das-d-flex das-jcsb">
                <div className="das-news-container-title">
                  Select Top 9 for {selectedCategory}
                </div>
                <span className="popup-news-top-x das-mx20">
                  <i
                    className="fa fa-xmark"
                    onClick={() => setPopupNews(false)}
                  ></i>
                </span>
              </div>

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
                    <th>Position</th>
                  </tr>
                </thead>
                <tbody>
                  {currentNews?.map((item, index) => (
                    <tr key={index}>
                      <td className="table-checkbox">
                        <input
                          type="checkbox"
                          checked={selected.some((s) => s.id === item._id)}
                          onChange={() => handleCheckboxChange(item._id)}
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
                        {moment(item?.createdAt).format("h:mm a, D MMMM YYYY")}
                      </td>
                      <td className="table-status">
                        <span>{item?.postedBy?.fullName}</span>
                      </td>
                      <td>
                        <select
                          className="ml10"
                          disabled={!selected.some((s) => s.id === item._id)}
                          value={
                            selected.find((s) => s.id === item._id)?.position ||
                            ""
                          }
                          onChange={(e) =>
                            handlePositionChange(
                              item._id,
                              parseInt(e.target.value)
                            )
                          }
                        >
                          <option value="">Pos</option>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((pos) => (
                            <option key={pos} value={pos}>
                              {pos}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

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

export default DasCategoryTop;
