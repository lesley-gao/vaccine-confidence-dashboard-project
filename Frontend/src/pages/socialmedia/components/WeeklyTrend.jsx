/**
 * This component visualizes weekly sentiment trends for vaccine-related discussions on social media platforms.
 * It is used on the SocialMedia page.
 */
import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const WeeklyTrend = ({ sentimentData }) => {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

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
      <h2 className="text-xl font-bold mt-4 mb-2 text-center text-black dark:text-white">Weekly Sentiment Trends</h2>

      {!sentimentData || sentimentData.length === 0 ? (
        <div className="w-full">
          <div className="flex items-center justify-center text-center">
            <p className="text-gray-500 dark:text-gray-400 mt-10">
              No weekly sentiment trends data available, please check back later.
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <p className="text-sm text-center text-gray-600 dark:text-gray-300">
            * Hover over a point to see its exact value. *
          </p>
          <p className="text-sm text-center mb-2 text-gray-600 dark:text-gray-300">
            * Click the legend to toggle visibility of specific data. *
          </p>

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
                tickvals: Array.isArray(sentimentData) ? sentimentData.map((item) => item.gsmssTimeCreated) : [],
                color: isDark ? '#ffffff' : '#000000',
                tickfont: { color: isDark ? '#ffffff' : '#000000' },
                gridcolor: isDark ? 'rgba(255, 255, 255, 0.2)' : '#e5e5e5'
              },
              yaxis: {
                title: "Percentage (%)",
                color: isDark ? '#ffffff' : '#000000',
                tickfont: { color: isDark ? '#ffffff' : '#000000' },
                gridcolor: isDark ? 'rgba(255, 255, 255, 0.2)' : '#e5e5e5'
              },
              legend: {
                orientation: "h",
                x: 0.5,
                y: -0.15,
                xanchor: "center",
                yanchor: "top",
                font: { color: isDark ? '#ffffff' : '#000000' }
              },
              margin: {
                l: 50,
                r: 10,
                t: 0,
                b: 0,
              },
              paper_bgcolor: "rgba(0, 0, 0, 0)",
              plot_bgcolor: "rgba(0, 0, 0, 0)",
            }}
            config={{
              displayModeBar: false,
            }}
            style={{ width: "100%", height: "250px" }}
          />
        </div>
      )}
    </div>
  );
};

export default WeeklyTrend;