import { ResponsivePie } from "@nivo/pie";

import React from "react";

const PieChart = (props) => {
  const { gold, silver, platinum, palladium, gesamt } = props;

  const data = [
    {
      id: "Gold",
      label: "Gold",
      value: Math.round((gold / gesamt) * 100),
      color: "#fcba03",
    },
    {
      id: "Silber",
      label: "Silber",
      value: Math.round((silver / gesamt) * 100),
      color: "#c2c2c2",
    },
    {
      id: "Platin",
      label: "Platin",
      value: Math.round((platinum / gesamt) * 100),
      color: "#ccfcf5",
    },
    {
      id: "Palladium",
      label: "Palladium",
      value: Math.round((palladium / gesamt) * 100),
      color: "#cda6f7",
    },
  ];

  return (
    <div style={{ width: "100%", height: "300px", margin: "0 auto" }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        colors={(d) => d.color}
        borderWidth={1}
        tooltipFormat={(value) => `${value}%`}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextXOffset={6}
        radialLabelsTextColor="#333333"
        radialLabelsLinkOffset={0}
        radialLabelsLinkDiagonalLength={16}
        radialLabelsLinkHorizontalLength={24}
        radialLabelsLinkStrokeWidth={1}
        radialLabelsLinkColor={{ from: "color" }}
        slicesLabelsSkipAngle={10}
        slicesLabelsTextColor="#333333"
        slicesLabelsFormat={(value) => `${value}%`}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            translateY: 56,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default PieChart;
