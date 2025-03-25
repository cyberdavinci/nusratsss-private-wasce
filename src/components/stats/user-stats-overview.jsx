"use client";

import { useState, useEffect } from "react";
import { Users, UserCheck, UserCog, GraduationCap } from "lucide-react";
import { RoleDistributionChart } from "./role-distribution-chart";
import { RegistrationStatusChart } from "./registration-status-chart";
import { GrowthTrendsChart } from "./growth-trends-chart";

export default function UserStatsOverview() {
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
          adminCount: 2,
          subscriberCount: 320,
          studentCount: 915,
          completedRegistrations: 1100,
          pendingRegistrations: 0,
          growthTrends: [
            { _id: { year: 2023, month: 10 }, count: 50 },
            { _id: { year: 2023, month: 11 }, count: 75 },
            { _id: { year: 2023, month: 12 }, count: 90 },
            { _id: { year: 2024, month: 1 }, count: 110 },
            { _id: { year: 2024, month: 2 }, count: 130 },
            { _id: { year: 2024, month: 3 }, count: 150 },
            { _id: { year: 2024, month: 4 }, count: 180 },
            { _id: { year: 2024, month: 5 }, count: 210 },
            { _id: { year: 2024, month: 6 }, count: 255 },
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

  // State for chart toggle
  const [activeChart, setActiveChart] = useState("roles");

  // Show loading state
  if (loading || !stats) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-lg p-4"
            >
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-sm font-medium text-gray-300">
                  Loading...
                </div>
              </div>
              <div className="h-8 w-20 bg-gray-800 animate-pulse rounded-lg"></div>
            </div>
          ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 h-full">
        {[
          {
            title: "Total Users",
            value: stats.totalUsers,
            subtitle: `${stats.completedRegistrations} completed registrations`,
            icon: <Users className="h-4 w-4 text-gray-400" />,
          },
          {
            title: "Students",
            value: stats.studentCount,
            subtitle: `${(
              (stats.studentCount / stats.totalUsers) *
              100
            ).toFixed(1)}% of total users`,
            icon: <GraduationCap className="h-4 w-4 text-gray-400" />,
          },
          // {
          //   title: "Subscribers",
          //   value: stats.subscriberCount,
          //   subtitle: `${((stats.subscriberCount / stats.totalUsers) * 100).toFixed(1)}% of total users`,
          //   icon: <UserCheck className="h-4 w-4 text-gray-400" />,
          // },
          {
            title: "Admins",
            value: stats.adminCount,
            subtitle: `${((stats.adminCount / stats.totalUsers) * 100).toFixed(
              1
            )}% of total users`,
            icon: <UserCog className="h-4 w-4 text-gray-400" />,
          },
        ].map((item, index) => (
          <div
            key={item.title}
            className="bg-gray-900 border border-gray-800 rounded-lg p-4 transform transition-all duration-500 hover:scale-105 hover:shadow-lg"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium text-gray-300">
                {item.title}
              </div>
              {item.icon}
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {item.value.toLocaleString()}
              </div>
              <p className="text-xs text-gray-400">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <div className="lg:col-span-4 bg-gray-900 border border-gray-800 rounded-lg p-4 transform transition-all duration-500 hover:shadow-lg">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-100">
              User Growth Trends
            </h3>
            <p className="text-sm text-gray-400">
              New user registrations over time
            </p>
          </div>
          <div className="h-[300px]">
            <GrowthTrendsChart data={stats.growthTrends} />
          </div>
        </div>

        <div className="lg:col-span-3 bg-gray-900 border border-gray-800 rounded-lg p-4 transform transition-all duration-500 hover:shadow-lg">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-100">
              User Distribution
            </h3>
            <p className="text-sm text-gray-400">
              Breakdown by role and registration status
            </p>
          </div>
          <div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-center gap-4 border-b border-gray-800 pb-2">
                <button
                  className={`px-4 py-2 transition-all duration-300 ${
                    activeChart === "roles"
                      ? "text-gray-100 border-b-2 border-indigo-600"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                  onClick={() => setActiveChart("roles")}
                >
                  Roles
                </button>
                <button
                  className={`px-4 py-2 transition-all duration-300 ${
                    activeChart === "status"
                      ? "text-gray-100 border-b-2 border-indigo-600"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                  onClick={() => setActiveChart("status")}
                >
                  Status
                </button>
              </div>

              {activeChart === "roles" && (
                <div className="h-[240px] animate-fadeIn">
                  <RoleDistributionChart
                    data={[
                      { name: "Students", value: stats.studentCount },
                      // { name: "Subscribers", value: stats.subscriberCount },
                      { name: "Admins", value: stats.adminCount },
                    ]}
                  />
                </div>
              )}

              {activeChart === "status" && (
                <div className="h-[240px] animate-fadeIn">
                  <RegistrationStatusChart
                    data={[
                      { name: "Complete", value: stats.completedRegistrations },
                      { name: "Incomplete", value: stats.pendingRegistrations },
                    ]}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
