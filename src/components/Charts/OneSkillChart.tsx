"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function timestampToShortDate(timestamp:any) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // getMonth() returns month from 0 to 11
    const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year
    
    // Adjust the month and day to always have two digits
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;
    
    // Return the formatted date in MM/DD/YY format
    return `${formattedMonth}/${formattedDay}/${year}`;
  }



interface OneSkillChartState {
    title: string;
    seriesdata: {
        createdAt: number[];
        overall: number[];
    }[];
}

// Define the props type
interface ScoreCategoryProps {
  title: string;
  score: number;
  size: string;
}

interface CircularProps {
  score: number;
  size: string;
}

const CircularScore: React.FC<CircularProps> = ({ score, size = 'small' }) => {
  const radius = size === 'large' ? 40 : size === 'medium' ? 20 : 16;
  const strokeWidth = size === 'large' ? 8 : size === 'medium' ? 6 : 3;
  const viewBox = size === 'large' ? '0 0 100 100' : '0 0 50 50';
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 9) * circumference;

  // Determine the color based on the score
  const getColor = () => {
    if (score < 4) return 'text-danger';
    if (score >= 4 && score <= 6) return 'text-yellow-500';
    return 'text-green-500';
  };

  const centerPoint = size === 'large' ? 50 : 25;

  return (
    <div className={`relative ${size === 'large' ? 'w-24 h-24' : 'w-12 h-12'}`}>
      <svg className="w-full h-full" viewBox={viewBox}>
        <circle
          className="text-gray-300"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={centerPoint}
          cy={centerPoint}
        />
        <circle
          className={getColor()}
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={centerPoint}
          cy={centerPoint}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform={`rotate(-90 ${centerPoint} ${centerPoint})`}
        />
      </svg>
      <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${size === 'large' ? 'text-2xl' : 'text-base'} font-bold`}>
        {score}
      </span>
    </div>
  )
}

const ScoreDisplay: React.FC<ScoreCategoryProps> = ({ title, score, size }) => {
  
  return (
    <div className="rounded-lg p-2 sm:p-3 flex-1 min-w-0">
      <div className="flex flex-col justify-between items-center">
        <CircularScore score={score} size={size}/>
        <h3 className="text-xs sm:text-sm mt-1">{title}</h3>
      </div>
    </div>
  );
};


const OneSkillChart: React.FC<OneSkillChartState> = ({
    title,
    seriesdata
}) => {
  const data = [
    {
      name: "score",
      data: seriesdata.map((obj) => obj.overall),
    },
  ];

  const options: ApexOptions = {
    colors: ["#3C50E0", "#80CAEE"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: seriesdata.length > 10 ? "area": "bar",
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
  
    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: "25%",
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: "25%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: true,
    },
  
    xaxis: {
      categories: seriesdata?.map((obj) => timestampToShortDate(obj.createdAt)),
      labels: {
        show: seriesdata.length > 10 ? false : true,// This disables only the x-axis labels
    }
    },
    yaxis: {
        min: 0,
        max: 9,
      },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "14px",
  
      markers: {
        radius: 99,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-2 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black dark:text-white">
            {title}
          </h4>
        </div>
        <div>
          <div className="relative">
            <ScoreDisplay title="average" score={5} size="medium"/>
          </div>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-mb-9 -ml-5">
          <ReactApexChart
            options={options}
            series={data}
            type={seriesdata.length > 10 ? "area": "bar"}
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default OneSkillChart;
