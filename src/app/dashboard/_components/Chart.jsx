
'use client';
import Chart from 'react-apexcharts'
import { useEffect, useState } from 'react';


const Skeleton = () => {
  return (
    
      <div role="status" className="max-w-md p-4  rounded animate-pulse md:p-6 dark:border-gray-700 h-96">
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
        <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="flex items-baseline mt-4">
          <div className="w-full bg-gray-200 rounded-t-lg h-64 dark:bg-gray-700"></div>
          <div className="w-full h-48 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-56 ms-6 dark:bg-gray-700"></div>
          <div className="w-full h-64 ms-6 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-64 ms-6 dark:bg-gray-700"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-56 ms-6 dark:bg-gray-700"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-64 ms-6 dark:bg-gray-700"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>

  )
};

const ChartComponent = ({color, data}) => {
  const [loading, setLoading] = useState(true);
  const [series, setSeries] = useState(null);



  

  const options = {
      chart: {
        type: "bar",
        fontFamily: "Inter, sans-serif",
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      legend: {
        show: true
      },
      fill: {
        type: "fill",
        opacity: 0.8,
        colors: [color],
      },
      stroke: {
        width: 3,
      },
     
      dataLabels: {
        enabled: false,
        // offsetX: 10,
        style: {
          cssClass: 'text-xs text-white font-medium'
        },
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 16,
          right: 16,
          top: -16,
          bottom: 0,
        },
      }

      ,
        series: [{
          name: 'band',
          data: series ? series.values : [],
          color: color,
        }],
        xaxis: {
          categories: series ? series.cat : [],
          labels: {
            show: false,
          },
          axisBorder: {
            show: true,
          },
          axisTicks: {
            show: false,
          }
        },
        yaxis: {
          min: 0,
          max: 9,
          labels: {
            style: {
              colors: '#FF5733' // specify the color you want
            }
          }
        }
      };

      useEffect(() => {
        if (data) {
          const time = data.map(item => item.createdAt);
          const value = data.map(item => item.overall);
          setSeries({values: value, cat: time});
          setLoading(false);
        }
        
      }, [data]);

      if (loading) {
        return <Skeleton />
      };

      
      
    return <Chart options={options} series={options.series} type="bar" width={"100%"} height={"100%"} />
    
}


export default ChartComponent;