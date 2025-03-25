"use client";
import React, { useState } from "react";
import {
  Users,
  UserCheck,
  UserX,
  School,
  Briefcase,
  BarChart as ChartBar,
  PieChart,
  TrendingUp,
  Globe2,
  GraduationCap,
  Clock,
  Target,
  BookOpen,
  RotateCw,
  Download,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe"];

const mockStats = {
  totalUsers: 12458,
  completedRegistrations: 10234,
  pendingRegistrations: 2224,
  workingCount: 8756,
  maleCount: 7245,
  femaleCount: 5213,
  monthlyEnrollments: [
    { month: "Jan", count: 85 },
    { month: "Feb", count: 95 },
    { month: "Mar", count: 120 },
    { month: "Apr", count: 110 },
    { month: "May", count: 130 },
    { month: "Jun", count: 150 },
  ],
  ageGroups: [
    { range: "0-17", count: 150 },
    { range: "18-24", count: 300 },
    { range: "25-34", count: 450 },
    { range: "35-50", count: 280 },
    { range: "50+", count: 150 },
    { range: "Unknown", count: 50 },
  ],
  schools: [
    { name: "Nusrat SSS", students: 180, percentage: 14.4 },
    { name: "Bakoteh Upper", students: 150, percentage: 12.0 },
    { name: "Gambia High", students: 120, percentage: 9.6 },
    { name: "Charlse Jaw", students: 110, percentage: 8.8 },
    { name: "Daddy Jobe", students: 90, percentage: 7.2 },
    { name: "Methods", students: 85, percentage: 6.8 },
    // { name: "Yale University", students: 80, percentage: 6.4 },
    // { name: "Princeton University", students: 75, percentage: 6.0 },
    // { name: "Other", students: 360, percentage: 28.8 },
  ],
  topNationalities: [
    { country: "Bakoteh", count: 3567 },
    { country: "Serekunda", count: 1890 },
    { country: "Sukuta", count: 1456 },
    { country: "Kololi", count: 890 },
    { country: "Brikama", count: 765 },
  ],
};

function TabButton({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 text-sm font-medium transition-colors ${
        active
          ? "bg-gray-800 text-white"
          : "text-gray-400 hover:text-white hover:bg-gray-800/50"
      }`}
    >
      {children}
    </button>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl">
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <div className="text-2xl font-semibold text-white">{value}</div>
        {subtitle && (
          <div className="ml-2 text-sm text-gray-400">{subtitle}</div>
        )}
      </div>
    </div>
  );
}

const StatsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [enrollmentId, setEnrollmentId] = useState("");

  const { data, isLoading, mutate } = useSWR(`/api/others/stats`, fetcher);

  // console.log(data);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">User Statistics</h1>
            <p className="text-gray-400 mt-1">
              Comprehensive analytics and insights about your user base
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Enrollment ID"
                value={enrollmentId}
                onChange={(e) => setEnrollmentId(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
              <RotateCw className="w-4 h-4" />
              Filter
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gray-800/50 rounded-lg mb-8">
          <div className="flex">
            <TabButton
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </TabButton>
            <TabButton
              active={activeTab === "demographics"}
              onClick={() => setActiveTab("demographics")}
            >
              Demographics
            </TabButton>
            <TabButton
              active={activeTab === "enrollments"}
              onClick={() => setActiveTab("enrollments")}
            >
              Enrollments
            </TabButton>
            <TabButton
              active={activeTab === "schools"}
              onClick={() => setActiveTab("schools")}
            >
              Schools
            </TabButton>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Gender Distribution */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">Gender Distribution</h2>
            <p className="text-sm text-gray-400 mb-4">
              Breakdown of users by gender
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={[
                      { name: "Male", value: mockStats.maleCount },
                      { name: "Female", value: mockStats.femaleCount },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#3B82F6" />
                    <Cell fill="#EC4899" />
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                    }}
                    labelStyle={{ color: "#9CA3AF" }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-blue-500 font-semibold">54%</div>
                <div className="text-sm text-gray-400">Male</div>
              </div>
              <div>
                <div className="text-pink-500 font-semibold">46%</div>
                <div className="text-sm text-gray-400">Female</div>
              </div>
            </div>
          </div>

          {/* Age Groups */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">Age Groups</h2>
            <p className="text-sm text-gray-400 mb-4">
              Distribution of users by age range
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockStats.ageGroups}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="range" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                    }}
                    labelStyle={{ color: "#9CA3AF" }}
                  />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Employment Status */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">Employment Status</h2>
            <p className="text-sm text-gray-400 mb-4">
              Working vs. non-working users
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={[
                      { name: "Working", value: mockStats.workingCount },
                      {
                        name: "Not Working",
                        value: mockStats.totalUsers - mockStats.workingCount,
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#10B981" />
                    <Cell fill="#374151" />
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                    }}
                    labelStyle={{ color: "#9CA3AF" }}
                  />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-emerald-500 font-semibold">42%</div>
                <div className="text-sm text-gray-400">Working</div>
              </div>
              <div>
                <div className="text-gray-400 font-semibold">58%</div>
                <div className="text-sm text-gray-400">Not Working</div>
              </div>
            </div>
          </div>

          {/* Monthly Enrollments */}
          <div className="bg-gray-800 p-6 rounded-xl col-span-2">
            <h2 className="text-lg font-semibold mb-4">Monthly Enrollments</h2>
            <p className="text-sm text-gray-400 mb-4">
              Number of enrollments per month
            </p>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockStats.monthlyEnrollments}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "none",
                    }}
                    labelStyle={{ color: "#9CA3AF" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ fill: "#3B82F6", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* School Distribution */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-lg font-semibold mb-4">School Distribution</h2>
            <p className="text-sm text-gray-400 mb-4">
              Top schools by student count
            </p>
            <div className="space-y-4">
              {mockStats.schools.slice(0, 5).map((school, index) => (
                <div
                  key={school.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-gray-200">
                      {school.name}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {school.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
