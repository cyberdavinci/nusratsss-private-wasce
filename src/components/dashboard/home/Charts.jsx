"use client";
import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  //   Point,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import useSWR, { useSWRConfig } from "swr";
import Chart from "react-apexcharts";
import { Spinner } from "@nextui-org/react";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  //   Point,
  Title,
  Tooltip,
  Legend
);

//

const fetcher = (...args) =>
  fetch(...args).then(async (res) => await res.json());
const BarChart = () => {
  const { mutate } = useSWRConfig();
  const { data, isLoading, error } = useSWR(`/api/others/students`, fetcher);
  // console.log(error);
  //
  const totalAmountSold = React.useMemo(() => {
    return data?.length * 250;
  }, [data, isLoading]);
  //
  const nusratStudents = React.useMemo(() => {
    return data?.filter((student) =>
      student.previousSchool?.includes("Nusrat")
    );
  }, [data, isLoading]);
  //
  const nonNusratStudents = React.useMemo(() => {
    return data?.filter((student) => student.previousSchool !== "Nusrat");
  }, [data, isLoading]);
  //
  const maleStudents = React.useMemo(() => {
    return data?.filter((student) => student.gender === "Male");
  }, [data, isLoading]);
  //
  const femaleStudents = React.useMemo(() => {
    return data?.filter((student) => student.gender === "Female");
  }, [data, isLoading]);
  //
  const gambianStudents = React.useMemo(() => {
    return data?.filter((student) => student.nationality === "Gambian");
  }, [data, isLoading]);
  //
  const nonGambianStudents = React.useMemo(() => {
    return data?.filter((student) => student.nationality !== "Gambian");
  }, [data, isLoading]);
  let colorPalette = ["#00D8B6", "#008FFB", "#FEB019", "#FF4560", "#775DD0"];
  //
  const schoolData = {
    labels: ["Nusrat", "Non-Nusrat"],
    datasets: [
      {
        label: "Number of Students by Previous School",
        data: [nusratStudents?.length, nonNusratStudents?.length],
        backgroundColor: ["rgba(75,192,192,0.6)", "rgba(255,99,132,0.6)"],
      },
    ],
  };

  const genderData = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Number of Students by Gender",
        data: [maleStudents?.length, femaleStudents?.length],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  };

  const nationalityData = {
    labels: ["Gambian", "Non-Gambian"],
    datasets: [
      {
        label: "Number of Students by Nationality",
        data: [gambianStudents?.length, nonGambianStudents?.length],
        backgroundColor: ["rgba(75,192,192,0.6)", "rgba(255,99,132,0.6)"],
      },
    ],
  };
  // Extract relevant data from the array of students

  // Data for the line chart
  const tokenSalesData = React.useMemo(() => {
    const createdDates = data?.map(
      (student) => student.createdAt.split("T")[0]
    ); // Extract date only
    const uniqueDates = [...new Set(createdDates)];

    // Count the number of students created on each date
    const tokensSoldPerDay = uniqueDates?.map(
      (date) => createdDates?.filter((d) => d === date)?.length * 250
    );
    return {
      labels: uniqueDates,
      datasets: [
        {
          label: `Daily Tokens Sales in GMD \n Total Sold GMD${totalAmountSold}`,
          data: tokensSoldPerDay,
          // fill: true,
          backgroundColor: "green",
          borderColor: "rgba(75,192,192,0.6)",
        },
      ],
    };
  }, [data, isLoading]);
  const studentAnalytics = React.useMemo(() => {
    return {
      labels: [
        "Male",
        "Female",
        "Nusratarians",
        "Non-Nusratarians",
        "Gambians",
        "Non-Gambians",
      ],
      datasets: [
        {
          label: "Student Analytics",
          data: [
            maleStudents?.length,
            femaleStudents?.length,
            nusratStudents?.length,
            nonNusratStudents?.length,
            gambianStudents?.length,
            nonGambianStudents?.length,
          ],
          // fill: true,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [data, isLoading]);
  console.log(studentAnalytics);
  if (isLoading) {
    return (
      <div>
        <Spinner label="Loading..." />
      </div>
    );
  }
  return (
    <div className="">
      <div className=" w-full">
        <Line data={tokenSalesData} />
      </div>

      <br />
      <div className="w-full">
        <Doughnut data={studentAnalytics} />
      </div>
    </div>
  );
};

//
export default BarChart;
