"use client";

import { useState, useEffect } from "react";
import { NationalityChart } from "./nationality-chart";
import { GenderChart } from "./gender-chart";
import { AgeGroupChart } from "./age-group-chart";

export default function UserDemographics() {
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
          maleCount: 680,
          femaleCount: 570,
          workingCount: 520,
          nationalityStats: [
            { _id: "United States", count: 450 },
            { _id: "United Kingdom", count: 200 },
            { _id: "Canada", count: 150 },
            { _id: "Australia", count: 120 },
            { _id: "Germany", count: 100 },
            { _id: "France", count: 80 },
            { _id: "India", count: 70 },
            { _id: "Other", count: 80 },
          ],
          ageGroups: [
            { _id: 0, count: 0 },
            { _id: 18, count: 320 },
            { _id: 25, count: 450 },
            { _id: 35, count: 280 },
            { _id: 50, count: 150 },
            { _id: "Unknown", count: 50 },
          ],
          topNationalities: [
            { _id: "United States", count: 450 },
            { _id: "United Kingdom", count: 200 },
            { _id: "Canada", count: 150 },
            { _id: "Australia", count: 120 },
            { _id: "Germany", count: 100 },
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-lg p-4"
            >
              <div className="mb-4">
                <div className="h-5 w-40 bg-gray-800 animate-pulse rounded-lg"></div>
              </div>
              <div className="h-[300px] w-full bg-gray-800 animate-pulse rounded-lg"></div>
            </div>
          ))}
      </div>
    );
  }

  // Format nationality data for the chart
  const nationalityData = stats.nationalityStats.map((item) => ({
    name: item._id || "Unknown",
    value: item.count,
  }));

  // Format age group data for the chart
  const ageGroupData = stats.ageGroups.map((group) => {
    let label = "Unknown";
    if (group._id !== "Unknown") {
      const boundaries = [0, 18, 25, 35, 50, 100];
      const index = boundaries.indexOf(group._id);
      if (index < boundaries.length - 1) {
        label = `${group._id}-${boundaries[index + 1] - 1}`;
      }
    }
    return { name: label, value: group.count };
  });

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-100">
              Gender Distribution
            </h3>
            <p className="text-sm text-gray-400">
              Breakdown of users by gender
            </p>
          </div>
          <div className="h-[300px]">
            <GenderChart
              data={[
                { name: "Male", value: stats.maleCount },
                { name: "Female", value: stats.femaleCount },
              ]}
            />
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-100">Age Groups</h3>
            <p className="text-sm text-gray-400">
              Distribution of users by age range
            </p>
          </div>
          <div className="h-[300px]">
            <AgeGroupChart data={ageGroupData} />
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-100">
              Employment Status
            </h3>
            <p className="text-sm text-gray-400">
              Working vs. non-working users
            </p>
          </div>
          <div className="h-[300px]">
            <GenderChart
              data={[
                { name: "Working", value: stats.workingCount },
                {
                  name: "Not Working",
                  value: stats.totalUsers - stats.workingCount,
                },
              ]}
            />
          </div>
        </div>
      </div>

      {/* <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mt-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-100">Top Nationalities</h3>
          <p className="text-sm text-gray-400">Most common nationalities among users</p>
        </div>
        <div className="h-[400px]">
          <NationalityChart
            data={stats.topNationalities.map((item) => ({
              name: item._id || "Unknown",
              value: item.count,
            }))}
          />
        </div>
      </div> */}
    </>
  );
}
