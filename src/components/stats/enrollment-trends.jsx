"use client";

import { useState, useEffect } from "react";
import { MonthlyEnrollmentsChart } from "./monthly-enrollments-chart";
import { RegistrationCompletionRateChart } from "./registration-completion-rate-chart";

export default function EnrollmentTrends() {
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
          completedRegistrations: 1100,
          pendingRegistrations: 150,
          monthlyEnrollments: [
            { _id: { year: 2024, month: 1 }, count: 85 },
            { _id: { year: 2024, month: 2 }, count: 95 },
            { _id: { year: 2024, month: 3 }, count: 120 },
            { _id: { year: 2024, month: 4 }, count: 110 },
            { _id: { year: 2024, month: 5 }, count: 130 },
            { _id: { year: 2024, month: 6 }, count: 150 },
          ],
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

  // Format monthly enrollment data
  const monthlyData = stats.monthlyEnrollments
    .map((item) => {
      const date = new Date(Date.UTC(item._id.year, item._id.month - 1, 1));
      return {
        month: date.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        count: item.count,
      };
    })
    .sort((a, b) => new Date(a.month) - new Date(b.month));

  // Calculate completion rate over time
  const completionRate =
    (stats.completedRegistrations / stats.totalUsers) * 100;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-100">
              Monthly Enrollments
            </h3>
            <p className="text-sm text-gray-400">
              Number of registrations per month
            </p>
          </div>
          <div className="h-[400px]">
            <MonthlyEnrollmentsChart data={monthlyData} />
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-100">
              Registration Completion
            </h3>
            <p className="text-sm text-gray-400">
              Completed vs. pending registrations
            </p>
          </div>
          <div className="h-[400px]">
            <RegistrationCompletionRateChart
              data={[
                { name: "Complete", value: stats.completedRegistrations },
                { name: "Incomplete", value: stats.pendingRegistrations },
              ]}
              completionRate={completionRate.toFixed(1)}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 mt-4">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-100">
            User Growth Trends
          </h3>
          <p className="text-sm text-gray-400">
            New user registrations over time
          </p>
        </div>
        <div className="h-[400px]">
          <MonthlyEnrollmentsChart
            data={stats.growthTrends
              .map((item) => {
                const date = new Date(
                  Date.UTC(item._id.year, item._id.month - 1, 1)
                );
                return {
                  month: date.toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  }),
                  count: item.count,
                };
              })
              .sort((a, b) => new Date(a.month) - new Date(b.month))}
          />
        </div>
      </div>
    </>
  );
}
