import { ChartConfiguration } from "chart.js";
import { MetricsData, ReleaseMap } from "../../model";

export const generateLineChart = (
  data: MetricsData,
  releasesMap: ReleaseMap
): ChartConfiguration => {
  const displayedValues = data.values.sort((a, b) => a.timestamp - b.timestamp);

  return {
    type: "line",
    data: {
      labels: displayedValues.map((n) => releasesMap.get(n.releaseId) || "-"),
      datasets: [
        {
          label: data.key,
          data: displayedValues.map((n) => n.value),
          backgroundColor: ["rgba(255, 99, 132, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)"],
          borderWidth: 1,
          lineTension: 0,
        },
      ],
    },
    options: {
      devicePixelRatio: 2,
      legend: { display: false },
      scales: {
        xAxes: [
          {
            ticks: { fontFamily: "sans-serif" },
          },
        ],
        yAxes: [
          {
            ticks: { fontFamily: "sans-serif" },
          },
        ],
      },
    },
  };
};
