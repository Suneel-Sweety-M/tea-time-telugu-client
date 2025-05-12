import React, { useEffect, useState } from "react";
import HomeFiveGallery from "./HomeFiveGallery";
import DasTopNine from "./DasTopNine";
import DasTrends from "./DasTrends";
import { getDashData } from "../../../helper/apis";

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
    fetchData()
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

      <HomeFiveGallery />
      <DasTopNine />
      <DasTrends />
    </div>
  );
};

export default DasHome;
