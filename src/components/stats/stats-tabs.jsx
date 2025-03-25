"use client"

import { useState } from "react"
import { Suspense } from "react"
import { StatsLoading } from "./stats-loading"

export function StatsTabs({ tabs, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  return (
    <div>
      <div className="bg-gray-900 rounded-lg overflow-hidden">
        <div className="flex border-b border-gray-800">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id ? "text-white border-b-2 border-indigo-600" : "text-gray-400 hover:text-gray-300"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pt-3">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`transition-opacity duration-300 ${activeTab === tab.id ? "block opacity-100" : "hidden opacity-0"}`}
            >
              <Suspense fallback={<StatsLoading />}>{tab.content}</Suspense>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

