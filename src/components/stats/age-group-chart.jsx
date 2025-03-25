"use client"

import { useEffect, useRef } from "react"
import ApexCharts from "apexcharts"

export function AgeGroupChart({ data }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    // Format data for the chart
    const chartData = data.map((item) => ({
      x: item.name,
      y: item.value,
    }))

    const options = {
      series: [
        {
          name: "Users",
          data: chartData.map((item) => item.y),
        },
      ],
      chart: {
        type: "bar",
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
          dynamicAnimation: {
            enabled: true,
            speed: 350,
          },
        },
      },
      colors: ["#8b5cf6"],
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 4,
          columnWidth: "60%",
          dataLabels: {
            position: "top",
          },
        },
      },
      dataLabels: {
        enabled: false,
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
        categories: chartData.map((item) => item.x),
        labels: {
          style: {
            colors: "#9ca3af",
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
          formatter: (value) => value + " users",
        },
      },
    }

    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    chartInstance.current = new ApexCharts(chartRef.current, options)
    chartInstance.current.render()

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return <div className="h-full w-full" ref={chartRef} />
}

