"use client";
import dynamic from "next/dynamic";
import React from "react";
import { useState, useEffect } from "react";
import { FirebaseFunction } from "@/service/firebase";
import AllSkillChart from "../Charts/AllSkillChart";
import OneSkillChart from "../Charts/OneSkillChart";
import CardDataStats from "../CardDataStats";
import withUser from "@/hooks/withUser";
import { useUser } from "@/service/user";
import { httpsCallable } from "firebase/functions";



const SkeletonCard: React.FC = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4 animate-pulse">
      <div className="flex justify-between items-center mt-4 mb-4">
        <div className="h-6 bg-slate-200 rounded w-1/3"></div>
        <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
      </div>
      <div className="h-48 bg-slate-200 rounded"></div>
      <div className="h-48 bg-slate-200 rounded"></div>
    </div>
  );
};

const SkeletonBarChart: React.FC = () => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex justify-between items-center mt-4 mb-4">
        <div className="h-6 bg-slate-200 rounded w-1/3"></div>
        <div className="h-8 w-8 bg-slate-200 rounded-full"></div>
      </div>
      <div className="h-48 bg-slate-200 rounded"></div>
      <div className="h-48 bg-slate-200 rounded"></div>
    </div>
  );
};

const DashboardSkeleton: React.FC = () => {
  return (
    <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonBarChart />
    </div>
  );
};


const MyDashboard: React.FC = () => {
  const user = useUser();
  const {userState} = user;
  const functions = FirebaseFunction();
  const [chartData, setChartData] = useState(null);


  const getChartData = async () => {
    const getData = httpsCallable(functions, 'getChartDataPG');
    await getData({ id: userState.uid }).then((result: any) => {
      setChartData(result.data);
    });
  };


  useEffect(() => {
    getChartData();
  }, [])

  type Score = {
    overall: number;
    // other properties...
  };
  function getHighest(numbers: Score[]): string {
    const ListScore: number[] = numbers.map((obj) => obj['overall']) || [];
    if (numbers.length === 0) return `Band 0`;
    return `Band ${Math.max(...ListScore)}`;
  }

  return (
    <>
      {chartData ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <CardDataStats title="Highest Listening" total={getHighest(chartData['listening'])} rate="0%" levelUp>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" width="24px" height="24px" className="fill-blue-600 dark:fill-white">
              <path d="M12 3C7.03 3 3 7.03 3 12v7c0 1.1.9 2 2 2h1v-9H5v-1c0-3.86 3.14-7 7-7s7 3.14 7 7v1h-1v9h1c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9zm-3 11v7H8v-7h1zm8 7v-7h1v7h-1z" />
            </svg>
          </CardDataStats>
          <CardDataStats title="Highest Reading" total={getHighest(chartData['reading'])} rate="0%" levelUp>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-blue-600 dark:fill-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M19 2H9C7.897 2 7 2.897 7 4V18C7 19.103 7.897 20 9 20H19C20.103 20 21 19.103 21 18V4C21 2.897 20.103 2 19 2ZM19 18H9V4H19V18Z"
              />
              <path
                d="M5 4H4C2.897 4 2 4.897 2 6V20C2 21.103 2.897 22 4 22H14C15.103 22 16 21.103 16 20V19H6C4.897 19 4 18.103 4 17V6C4 4.897 4.897 4 6 4H5V4Z"
              />
            </svg>
          </CardDataStats>
          <CardDataStats title="Highest Writing" total={getHighest(chartData['writing'])} rate="0%" levelUp>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-blue-600 dark:fill-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                d="M21 4.85l-1.17-1.17a2.5 2.5 0 00-3.54 0L3.5 16.5V20h3.5L20.85 7.35a2.5 2.5 0 000-3.54L21 4.85zM9 18H6v-3L17.85 3.15l3 3L9 18z"
              />
            </svg>
          </CardDataStats>
          <CardDataStats title="Highest Speaking" total={getHighest(chartData['speaking'])} rate="0%" levelUp>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" width="24px" height="24px" className="fill-blue-600 dark:fill-white">
              <path d="M12 2C10.35 2 9 3.35 9 5v6c0 1.65 1.35 3 3 3s3-1.35 3-3V5c0-1.65-1.35-3-3-3zm0 12c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2s2 .9 2 2v7c0 1.1-.9 2-2 2zm-7-5v2c0 3.87 3.13 7 7 7s7-3.13 7-7v-2h2v2c0 4.41-3.59 8-8 8s-8-3.59-8-8v-2h2zm7 10h-2v-2h2v2z" />
            </svg>
          </CardDataStats>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} >
              <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="h-8 w-8 bg-slate-200 rounded-full mb-2"></div>
                <div className="h-10 bg-slate-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>)}

      {chartData ? (
        <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
          <OneSkillChart seriesdata={chartData['listening']} title="Listening Scores" url="dashboard/listening/academic-listening"/>
          <OneSkillChart seriesdata={chartData['reading']} title="Reading Scores" url="dashboard/reading/academic-reading"/>
          <OneSkillChart seriesdata={chartData['writing']} title="Writing Scores" url="dashboard/writing"/>
          <OneSkillChart seriesdata={chartData['speaking']} title="Speaking Scores" url="dashboard/speaking"/>
          <AllSkillChart seriesdata={chartData['full']}title="Full Skill Scores" url="dashboard" />
        </div>
      ) : (<DashboardSkeleton />)}
    </>
  );
};

export default withUser(MyDashboard);
