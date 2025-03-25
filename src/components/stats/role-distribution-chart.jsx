"use client"

import { useEffect, useRef } from "react"
import Chart from "chart.js/auto"

export function RoleDistributionChart({ data }) {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")

    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: data.map((item) => item.name),
        datasets: [
          {
            data: data.map((item) => item.value),
            backgroundColor: ["#6366f1", "#8b5cf6", "#ec4899"],
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
          duration: 2000,
          easing: "easeOutQuart",
          delay: (context) => {
            return context.dataIndex * 100
          },
        },
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              color: "#e5e7eb",
              font: {
                size: 12,
              },
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
        cutout: "60%",
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

