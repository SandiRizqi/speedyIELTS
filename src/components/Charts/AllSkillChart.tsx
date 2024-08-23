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




interface AllSkillChartState {
  seriesdata: {
      createdAt: number;
      overall: number;
  }[];
}


interface ScoreCategoryProps {
  title: string;
  score: number;
  size: string;
}

interface CircularProps {
  score: number;
  size: string;
}


function roundScore(score:number) {
  const integerPart = Math.floor(score);
  const fractionalPart = score - integerPart;

  if (fractionalPart < 0.25) {
      return integerPart;
  } else if (fractionalPart >= 0.25 && fractionalPart < 0.75) {
      return integerPart + 0.5;
  } else {
      return integerPart + 1;
  }
};

function calculateAverage(numbers: number[]): number {
  // Ensure the array is not empty
  if (numbers.length === 0) return 0;

  // Sum all numbers in the array
  const sum: number = numbers.reduce((acc: number, curr: number) => acc + curr, 0);

  // Calculate the average
  const average: number = sum / numbers.length;

  return average;
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

const AllSkillChart: React.FC<AllSkillChartState> = ({seriesdata}) => {
  const data = [
    {
      name: "score",
      data: seriesdata.map((obj) => obj.overall) || [],
    },
  ];

  const options: ApexOptions = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#00adb3"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1,
      },
  
      toolbar: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: true,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#3056D3", "#80CAEE"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: seriesdata?.map((obj) => timestampToShortDate(obj.createdAt)),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      max: 9,
    },
  };

  const ListScore:number[] = seriesdata.map((obj) => obj.overall);
  const Avg:number = calculateAverage(ListScore);
  const AverageScore = roundScore(Avg)


  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <div className="w-full">
              <p className="font-semibold text-black dark:text-white">Full Skill Scores</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
        <ScoreDisplay title="average" score={AverageScore} size="medium"/>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={data}
            type="bar"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
};

export default AllSkillChart;
