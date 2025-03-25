"use client";

import { useState, useEffect } from "react";
import { SchoolDistributionChart } from "./school-distribution-chart";

export default function SchoolDistribution() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch stats on component mount
  useEffect(() => {
    async function fetchData() {
      try {
        // In a real app, you'd fetch from your API
        // const response = await fetch('/api/stats')
        // const { data } = await response.json()

        // For demo, we'll use the mock data directly
        const mockStats = {
          totalUsers: 1250,
          schoolStats: [
            { _id: "Nusrat SSS", count: 180 },
            { _id: "Bakoteh Upper", count: 150 },
            { _id: "Gambia High", count: 120 },
            { _id: "Charlse Jaw", count: 110 },
            { _id: "Methodis High", count: 90 },
            { _id: "SOS High", count: 85 },
          ],
        };

        setStats(mockStats);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stats:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Show loading state
  if (loading || !stats) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-lg p-4"
            >
              <div className="mb-4">
                <div className="h-5 w-40 bg-gray-800 animate-pulse rounded-lg"></div>
              </div>
              <div className="h-[400px] w-full bg-gray-800 animate-pulse rounded-lg"></div>
            </div>
          ))}
      </div>
    );
  }

  // Format school data for the chart and table
  const schoolData = stats.schoolStats
    .filter((item) => item._id) // Filter out null/undefined schools
    .sort((a, b) => b.count - a.count) // Sort by count descending
    .map((item) => ({
      name: item._id,
      value: item.count,
      percentage: ((item.count / stats.totalUsers) * 100).toFixed(1),
    }));

  // Get top 5 schools for the chart
  const topSchools = schoolData.slice(0, 5);

  // If there are more than 5 schools, add an "Others" category
  if (schoolData.length > 5) {
    const othersCount = schoolData
      .slice(5)
      .reduce((sum, item) => sum + item.value, 0);
    topSchools.push({
      name: "Others",
      value: othersCount,
      percentage: ((othersCount / stats.totalUsers) * 100).toFixed(1),
    });
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-100">
              School Distribution
            </h3>
            <p className="text-sm text-gray-400">
              Top schools by student count
            </p>
          </div>
          <div className="h-[400px]">
            <SchoolDistributionChart data={topSchools} />
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-100">
              School Breakdown
            </h3>
            <p className="text-sm text-gray-400">
              Detailed list of schools and student counts
            </p>
          </div>
          <div className="max-h-[400px] overflow-auto">
            <table className="min-w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left text-gray-300">
                    School Name
                  </th>
                  <th className="px-4 py-2 text-right text-gray-300">
                    Students
                  </th>
                  <th className="px-4 py-2 text-right text-gray-300">
                    Percentage
                  </th>
                </tr>
              </thead>
              <tbody>
                {schoolData.slice(0, 10).map((school) => (
                  <tr key={school.name} className="border-t border-gray-800">
                    <td className="px-4 py-2 text-gray-200">{school.name}</td>
                    <td className="px-4 py-2 text-right text-gray-200">
                      {school.value}
                    </td>
                    <td className="px-4 py-2 text-right text-gray-200">
                      {school.percentage}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
