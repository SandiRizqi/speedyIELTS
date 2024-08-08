"use client";
import dynamic from "next/dynamic";
import React from "react";
import { useState, useEffect } from "react";
import { FirebaseFunction } from "@/service/firebase";
import AllSkillChart from "../Charts/AllSkillChart";
import OneSkillChart from "../Charts/OneSkillChart";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import withUser from "@/hooks/withUser";
import { useUser } from "@/service/user";
import { httpsCallable } from "firebase/functions";


const MapOne = dynamic(() => import("@/components/Maps/MapOne"), {
  ssr: false,
});

const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
  ssr: false,
});

const MyDashboard: React.FC = () => {
  const user = useUser();
  const functions = FirebaseFunction();
  const [chartData, setChartData] = useState(null);


  const getChartData = async () => {
    const getData = httpsCallable(functions, 'getChartData');
    await getData({ id: user.uid }).then((result: any) => {
      setChartData(result.data);
    });
  };


  useEffect(() => {
    getChartData();
  }, [])

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Highest Listening" total="Band 6" rate="0.43%" levelUp>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" width="24px" height="24px" className="fill-primary dark:fill-white">
            <path d="M12 3C7.03 3 3 7.03 3 12v7c0 1.1.9 2 2 2h1v-9H5v-1c0-3.86 3.14-7 7-7s7 3.14 7 7v1h-1v9h1c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9zm-3 11v7H8v-7h1zm8 7v-7h1v7h-1z" />
          </svg>
        </CardDataStats>
        <CardDataStats title="Highest Reading" total="Band 7" rate="4.35%" levelUp>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" width="24px" height="24px" className="fill-primary dark:fill-white">
            <path d="M17 3H7c-1.1 0-2 .9-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V5c0-1.1-.9-2-2-2zm0 16H7V5h10v14z" />
          </svg>
        </CardDataStats>
        <CardDataStats title="Highest Writing" total="Band 6.5" rate="2.59%" levelUp>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" width="24px" height="24px" className="fill-primary dark:fill-white">
            <path d="M14 2l-4 4 8 8 4-4-8-8zm-9 14v5h5l12-12-5-5-12 12zm2-3l3-3 2 2-3 3-2-2zm-1 6v-3h3l2 2h-5z" />
          </svg>
        </CardDataStats>
        <CardDataStats title="Highest Speaking" total="Band 7" rate="0.95%" levelUp>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" width="24px" height="24px" className="fill-primary dark:fill-white">
            <path d="M12 2C10.35 2 9 3.35 9 5v6c0 1.65 1.35 3 3 3s3-1.35 3-3V5c0-1.65-1.35-3-3-3zm0 12c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2s2 .9 2 2v7c0 1.1-.9 2-2 2zm-7-5v2c0 3.87 3.13 7 7 7s7-3.13 7-7v-2h2v2c0 4.41-3.59 8-8 8s-8-3.59-8-8v-2h2zm7 10h-2v-2h2v2z" />
          </svg>
        </CardDataStats>
      </div>

      {chartData && (
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <OneSkillChart seriesdata={chartData['writing']} title="Listening Scores" />
          <OneSkillChart seriesdata={chartData['writing']} title="Reading Scores" />
          <OneSkillChart seriesdata={chartData['writing']} title="Writing Scores" />
          <OneSkillChart seriesdata={chartData['writing']} title="Speaking Scores" />
          <AllSkillChart />
        </div>
      )}
    </>
  );
};

export default withUser(MyDashboard);
