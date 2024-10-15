// "use client";
import React from "react";
import BarChart from "@/components/dashboard/home/Charts";
import StudentAnalytics from "@/components/dashboard/home/Analytics";
const Dashboard = () => {
  return (
    <div className="w-full h-full min-h-screen mb-3 pb-4 mx-[10px] pr-[20px]">
      {/* <BarChart /> */}
      <StudentAnalytics />
    </div>
  );
};

export default Dashboard;
