"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export function SchoolDistributionChart({ data }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: data.map((item) => item.name),
        datasets: [
          {
            data: data.map((item) => item.value),
            backgroundColor: ["#6366f1", "#8b5cf6", "#ec4899", "#10b981", "#f43f5e", "#f59e0b"],
            borderColor: "#1f2937",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          animateScale: true,
          animateRotate: true,
          duration: 1800,
          easing: "easeOutQuart",
          delay: (context) => {
            return context.dataIndex * 150
          },
        },
        plugins: {
          legend: {
            position: "right",
            labels: {
              color: "#e5e7eb",
              font: {
                size: 12,
              },
              padding: 20,
            },
          },
          tooltip: {
            backgroundColor: "#374151",
            titleColor: "#f9fafb",
            bodyColor: "#f9fafb",
            borderColor: "#4b5563",
            borderWidth: 1,
            padding: 10,
            displayColors: true,
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.raw || 0
                const total = context.dataset.data.reduce((acc, val) => acc + val, 0)
                const percentage = Math.round((value / total) * 100)
                return `${label}: ${value} (${percentage}%)`
              },
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [data])

  return (
    <div className="h-full w-full">
      <canvas ref={chartRef} />
    </div>
  )
}

