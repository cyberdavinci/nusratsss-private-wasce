"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Pie, Line, Doughnut } from "react-chartjs-2";
import useSWR from "swr";
import {
  Spinner,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import SalesChart from "./SalesChart";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// const fetcher = (...args) =>
//   fetch(...args).then(async (res) => await res.json());

const StudentAnalytics = () => {
  const fetcher = (...args) =>
    fetch(...args).then(async (res) => await res.json());

  const { data, isLoading, error } = useSWR(`/api/others/students`, fetcher);
  console.log(error);
  const totalSales = React.useMemo(() => {
    return data?.length || 0;
  }, [data]);

  const totalAmountSold = React.useMemo(() => {
    return totalSales * 250;
  }, [totalSales]);

  const academiaSales = React.useMemo(() => {
    return Math.round(totalSales * 0.72);
  }, [totalSales]);

  const nusratSales = React.useMemo(() => {
    return totalSales - academiaSales;
  }, [totalSales, academiaSales]);

  const nusratStudents = React.useMemo(() => {
    return data?.filter((student) =>
      student.previousSchool?.includes("Nusrat")
    );
  }, [data]);

  const nonNusratStudents = React.useMemo(() => {
    return data?.filter((student) => student.previousSchool !== "Nusrat");
  }, [data]);

  const maleStudents = React.useMemo(() => {
    return data?.filter((student) => student.gender === "Male");
  }, [data]);

  const femaleStudents = React.useMemo(() => {
    return data?.filter((student) => student.gender === "Female");
  }, [data]);

  const gambianStudents = React.useMemo(() => {
    return data?.filter((student) => student.nationality === "Gambian");
  }, [data]);

  const nonGambianStudents = React.useMemo(() => {
    return data?.filter((student) => student.nationality !== "Gambian");
  }, [data]);

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
  }, [
    data,
    maleStudents,
    femaleStudents,
    nusratStudents,
    nonNusratStudents,
    gambianStudents,
    nonGambianStudents,
  ]);

  const tokenSalesData = React.useMemo(() => {
    const createdDates = data?.map(
      (student) => student.createdAt.split("T")[0]
    );
    const uniqueDates = [...new Set(createdDates)];

    const tokensSoldPerDay = uniqueDates?.map(
      (date) => createdDates?.filter((d) => d === date)?.length * 250
    );
    return {
      labels: uniqueDates,
      datasets: [
        {
          label: `Daily Tokens Sales in GMD \n Total Sold GMD${totalAmountSold}`,
          data: tokensSoldPerDay,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  }, [data, totalAmountSold]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className=" bg-slate-900">
          <CardHeader>
            <h1>Total Sales</h1>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{totalSales}</p>
          </CardBody>
        </Card>
        <Card className=" bg-slate-900">
          <CardHeader>
            <h1>Academia Sales (72%)</h1>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{academiaSales}</p>
          </CardBody>
        </Card>
        <Card className=" bg-slate-900">
          <CardHeader>
            <h1>Nusrat Sales (28%)</h1>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">{nusratSales}</p>
          </CardBody>
        </Card>
        <Card className=" bg-slate-900">
          <CardHeader>
            <h1>Overall Sales</h1>
          </CardHeader>
          <CardBody>
            <p className="text-3xl font-bold">
              GMD {totalAmountSold.toLocaleString()}
            </p>
          </CardBody>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className=" bg-slate-900">
          <CardHeader>
            <h1>Student Demographics</h1>
          </CardHeader>
          <CardBody className=" ">
            <Doughnut data={studentAnalytics} />
          </CardBody>
        </Card>
        <Card className=" bg-slate-900">
          <CardHeader>
            <h1>Daily Token Sales</h1>
          </CardHeader>
          <CardBody className=" h-full ">
            <Line data={tokenSalesData} className=" " />
            {/* <SalesChart data={data} totalAmountSold={totalAmountSold} /> */}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default StudentAnalytics;
