import React from "react";
import Plot from "react-plotly.js";

const WeeklyTrend = ({ sentimentData }) => {
  if (!sentimentData || sentimentData.length === 0) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 border-2 border-white rounded-xl">
        <div className="text-gray-500">No Weekly Sentiment Trends Data Available...</div>
      </div>
    );
  }

  const platforms = ["X", "Reddit"];

  const plotData = platforms.map((platform) => {
    const platformData = sentimentData.filter((item) => item.gsmssPlatform === platform);

    const x = platformData.map((item) => item.gsmssTimeCreated);
    
    const positive = platformData.map((item) => {
      const total = item.gsmssPositive + item.gsmssNeutral + item.gsmssNegative;
      return ((item.gsmssPositive / total) * 100).toFixed(2);
    });
    const neutral = platformData.map((item) => {
      const total = item.gsmssPositive + item.gsmssNeutral + item.gsmssNegative;
      return ((item.gsmssNeutral / total) * 100).toFixed(2);
    });
    const negative = platformData.map((item) => {
      const total = item.gsmssPositive + item.gsmssNeutral + item.gsmssNegative;
      return ((item.gsmssNegative / total) * 100).toFixed(2);
    });

    const lineStyle = platform === "X" ? "solid" : "dot";

    return [
      {
        x,
        y: positive,
        type: "scatter",
        mode: "lines",
        line: { dash: lineStyle, color: "green" },
        name: `${platform} Positive`,
        hovertemplate: `<b>Platform:</b> ${platform}<br><b>Attitude:</b> Positive<br><b>Percentage:</b> %{y}%<extra></extra>`,
      },
      {
        x,
        y: neutral,
        type: "scatter",
        mode: "lines",
        line: { dash: lineStyle, color: "orange" },
        name: `${platform} Neutral`,
        hovertemplate: `<b>Platform:</b> ${platform}<br><b>Attitude:</b> Neutral<br><b>Percentage:</b> %{y}%<extra></extra>`,
        
      },
      {
        x,
        y: negative,
        type: "scatter",
        mode: "lines",
        line: { dash: lineStyle, color: "red" },
        name: `${platform} Negative`,
        hovertemplate: `<b>Platform:</b> ${platform}<br><b>Attitude:</b> Negative<br><b>Percentage:</b> %{y}%<extra></extra>`,
      },
    ];
  });

  const plotDataFlat = plotData.flat();

  return (
    <div className="w-full h-full p-4 component-card">
      <h2 className="text-xl font-bold mt-4 mb-2 text-center">Weekly Sentiment Trends</h2>
      <p className="text-sm text-center">
        * Feel free to move the mouse to the point to view the specific value
      </p>
      <p className="text-sm text-center mb-2">
        And click the legend on the right to show or hide the corresponding information *
      </p>

      <div className="w-full">
        <Plot
      data={plotDataFlat.map((trace) => ({
        ...trace,
        mode: "lines+markers",
        marker: {
          size: 6,
        },
      }))}
      layout={{
        autosize: true,
        xaxis: {
          tickformat: "%Y-%m-%d",
          tickmode: "array",
          tickvals: sentimentData.map((item) => item.gsmssTimeCreated),
          tickangle: -20,
        },
        yaxis: {
          title: "Percentage (%)",
        },
        legend: {
          orientation: "v",
          x: 1.1,
          y: 1,
        },
        margin: {
          l: 50,
          r: 10,
          t: 10,
          b: 50, 
        },
        paper_bgcolor: "rgba(0, 0, 0, 0)",
        plot_bgcolor: "rgba(0, 0, 0, 0)",
      }}
      config={{
        displayModeBar: false,
        
      }}
      style={{ width: "full", height: "250px" }}
    />
      </div>
    </div>
  );
};

export default WeeklyTrend;
