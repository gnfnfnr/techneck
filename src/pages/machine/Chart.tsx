import { ResponsiveLine, Serie } from "@nivo/line";

export type Props = {};

const data: any = [
  {
    id: "tech neck",
    data: [
      {
        x: 0,
        y: 1,
      },
      {
        x: 0,
        y: 2,
      },
    ],
  },
];

export function LineChart() {
  return (
    <div style={{ height: 420, maxWidth: "100%" }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
        animate={true}
        enableSlices={"x"}
        yScale={{
          type: "linear",
          stacked: true,
          min: 0,
          max: 1000,
        }}
        lineWidth={3}
        curve="linear"
        colors={["#028ee6", "#774dd7"]}
        enableGridX={false}
        pointSize={12}
        pointColor="white"
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        layers={[
          "grid",
          "markers",
          "areas",
          "lines",
          "slices",
          "axes",
          "points",
          "legends",
        ]}
        theme={{
          crosshair: {
            line: {
              strokeWidth: 2,
              stroke: "#774dd7",
              strokeOpacity: 1,
            },
          },
        }}
      />
    </div>
  );
}
