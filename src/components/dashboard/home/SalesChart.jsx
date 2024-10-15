import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = ({ data, totalAmountSold }) => {
  const [timeframe, setTimeframe] = useState("daily");
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Group data by the selected timeframe (daily, weekly, monthly)
    let tokensSoldPerDay = [];
    let labels = [];

    if (timeframe === "daily") {
      tokensSoldPerDay = uniqueDates?.map(
        (date) => createdDates?.filter((d) => d === date)?.length * 250
      );
      labels = uniqueDates;
    } else if (timeframe === "weekly") {
      // Implement logic to aggregate data weekly
      tokensSoldPerDay = aggregateByWeek(createdDates, uniqueDates);
      labels = getWeekLabels(uniqueDates);
    } else if (timeframe === "monthly") {
      // Implement logic to aggregate data monthly
      tokensSoldPerDay = aggregateByMonth(createdDates, uniqueDates);
      labels = getMonthLabels(uniqueDates);
    }

    setChartData({
      labels: labels,
      datasets: [
        {
          label: `Token Sales in GMD \n Total Sold: GMD${totalAmountSold}`,
          data: tokensSoldPerDay,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  }, [timeframe, data, totalAmountSold]);

  return (
    <div>
      <select onChange={(e) => setTimeframe(e.target.value)} value={timeframe}>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>

      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Token Sales Chart",
            },
          },
        }}
      />
    </div>
  );
};

// Helper functions to aggregate data by week and month
const aggregateByWeek = (createdDates, uniqueDates) => {
  // Logic for weekly aggregation
};

const aggregateByMonth = (createdDates, uniqueDates) => {
  // Logic for monthly aggregation
};

const getWeekLabels = (uniqueDates) => {
  // Logic for generating weekly labels
};

const getMonthLabels = (uniqueDates) => {
  // Logic for generating monthly labels
};

export default SalesChart;
