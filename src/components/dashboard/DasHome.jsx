import { useEffect, useState } from "react";
import HomeFiveGallery from "./sub-elements/HomeFiveGallery";
import DasTopNine from "./sub-elements/DasTopNine";
import DasTrends from "./sub-elements/DasTrends";
import { getDashData } from "../../helper/apis";
import DasHotTopics from "./sub-elements/DasHotTopics";
import DasCategoryTop from "./sub-elements/DasCategoryTop";
import DasBreakingNews from "./sub-elements/DasBreakingNews";

const DasHome = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDashData();
        if (res?.status === "success") {
          setData(res);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="das-home">
      <div className="das-home-cards">
        <div className="das-home-card">
          <span className="das-home-card-num">{data?.newsCount || "0"}</span>
          <span className="das-home-card-title">Total News</span>
        </div>
        <div className="das-home-card">
          <span className="das-home-card-num">{data?.usersCount || "0"}</span>
          <span className="das-home-card-title">Total Users</span>
        </div>
        {/* <div className="das-home-card">
          <span className="das-home-card-num">0</span>
          <span className="das-home-card-title">Active Users</span>
        </div> */}
        <div className="das-home-card">
          <span className="das-home-card-num">{data?.adminsCount || "0"}</span>
          <span className="das-home-card-title">Admins</span>
        </div>
        <div className="das-home-card">
          <span className="das-home-card-num">{data?.writersCount || "0"}</span>
          <span className="das-home-card-title">Writers</span>
        </div>
      </div>

      <DasBreakingNews />
      <HomeFiveGallery />
      <DasTopNine />
      <DasTrends />
      <DasHotTopics />
      <DasCategoryTop />
    </div>
  );
};

export default DasHome;
