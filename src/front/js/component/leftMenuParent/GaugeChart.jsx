import React from "react";
import GaugeComponent from "react-gauge-component";

const ParentGaugeChart = ({ value = 50, min = 0, max = 100 }) => {
  let subArcs =
    max == 20
      ? [
        { limit: 4 },
        { limit: 8 },
        { limit: 12 },
        { limit: 15 },
        { limit: 18 },
        { limit: 20 },
      ]
      : [{}, {}, {}];

  return (
    <GaugeComponent
      type="semicircle"
      arc={{
        colorArray: ["#FF2121", "#00FF15"],
        padding: 0.02,
        subArcs: max == 10 ? [
          { limit: 2 },
          { limit: 4 },
          { limit: 6 },
          { limit: 8 },
          { limit: 10 },
        ] : subArcs,
      }}
      labels={{
        valueLabel: { formatTextValue: value => `${value}/${max}` },
        tickLabels: {
          type: "inner",
          defaultTickValueConfig: {
            formatTextValue: value => value,
            style: { fontSize: 8, fill: "#F0F6FC" },
          },
          defaultTickLineConfig: {
            color: "#F0F6FC",
          },
        },
      }}
      pointer={{ type: "blob", animationDelay: 0 }}
      value={value}
      maxValue={max}
      minValue={min}
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default ParentGaugeChart;
