"use client";

import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

export function MonthlyEnrollmentsChart({ data }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const options = {
      series: [
        {
          name: "Registrations",
          data: data.map((item) => item.count),
        },
      ],
      chart: {
        type: "line",
        height: "100%",
        fontFamily: "inherit",
        toolbar: {
          show: false,
        },
        background: "transparent",
        foreColor: "#9ca3af",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: {
            enabled: true,
            delay: 150,
          },
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      colors: ["#10b981"],
      stroke: {
        curve: "smooth",
        width: 3,
      },
      markers: {
        size: 5,
        colors: ["#10b981"],
        strokeColors: "#1f2937",
        strokeWidth: 2,
      },
      grid: {
        borderColor: "#374151",
        strokeDashArray: 3,
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      xaxis: {
        categories: data.map((item) => item.month),
        labels: {
          style: {
            colors: "#9ca3af",
          },
          formatter: (value) => {
            return value ? value.split(" ")[0] : "";
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#9ca3af",
          },
        },
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: (value) => value + " registrations",
        },
      },
    };

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new ApexCharts(chartRef.current, options);
    chartInstance.current.render();

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <div className="h-full w-full" ref={chartRef} />;
}
