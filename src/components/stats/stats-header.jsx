"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Download, RefreshCw } from "lucide-react"

export function StatsHeader() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [enrollmentID, setEnrollmentID] = useState(searchParams.get("enrollmentID") || "")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleFilter = () => {
    const params = new URLSearchParams()
    if (enrollmentID) {
      params.set("enrollmentID", enrollmentID)
    }
    router.push(`/dashboard/stats?${params.toString()}`)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate refresh
    setTimeout(() => {
      router.refresh()
      setIsRefreshing(false)
    }, 1000)
  }

  const handleExport = () => {
    // This would be implemented to export data as CSV/Excel
    alert("Export functionality would be implemented here")
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">User Statistics</h1>
        <p className="text-gray-400">Comprehensive analytics and insights about your user base</p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Enrollment ID"
            value={enrollmentID}
            onChange={(e) => setEnrollmentID(e.target.value)}
            className="max-w-[180px] px-3 py-2 bg-gray-900 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
          >
            Filter
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-2 border border-gray-700 text-gray-300 rounded-md hover:bg-gray-800 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh</span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 border border-gray-700 text-gray-300 rounded-md hover:bg-gray-800 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  )
}

