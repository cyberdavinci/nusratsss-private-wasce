"use client"

import { useEffect, useRef } from "react"
import ApexCharts from "apexcharts"

export function GrowthTrendsChart({ data }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    // Format data for the chart
    const chartData = data
      .map((item) => {
        const date = new Date(Date.UTC(item._id.year, item._id.month - 1, 1))
        return {
          x: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
          y: item.count,
        }
      })
      .sort((a, b) => new Date(a.x) - new Date(b.x))

    const options = {
      series: [
        {
          name: "New Users",
          data: chartData,
        },
      ],
      chart: {
        type: "area",
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
          speed: 1000,
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
      colors: ["#6366f1"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.1,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
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
        type: "category",
        categories: chartData.map((item) => item.x),
        labels: {
          style: {
            colors: "#9ca3af",
          },
          formatter: (value) => {
            return value ? value.split(" ")[0] : ""
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
        x: {
          show: true,
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

