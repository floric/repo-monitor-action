import * as React from "react";
import { SubHeader } from "./SubHeader";
import { MetricsData } from "../../model";
import {
  roundNumber,
  calcMax,
  calcMin,
  calcAvg,
  calcPercentile,
} from "../../util/math";

const StatsTable: React.FC<{}> = ({ children }) => (
  <div>
    <table className="table-auto w-full text-left">
      <tbody>{children}</tbody>
    </table>
  </div>
);

const StatsLine: React.FC<{ name: string; value: number }> = ({
  name,
  value,
}) => (
  <tr>
    <td className="w-1/3">{name}:</td>
    <td className="w-2/3">{roundNumber(value, 3)}</td>
  </tr>
);

export const Metrics: React.FC<{
  graphics: Array<{ data: MetricsData; img: string }>;
}> = ({ graphics }) => (
  <div>
    <SubHeader header="Metrics" />
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {graphics.map(({ data, img }) => {
        const plainValues = data.values.map((n) => n.value);
        return (
          <div key={`d-${data.key}`}>
            <h5 className="px-4 py-2 font-bold bg-gray-800 text-gray-100">
              {data.key}
            </h5>
            <div className="bg-gray-200 p-4">
              <img
                src={`data:image/png;base64, ${img}`}
                alt={`Change of ${data.key} throughout the releases`}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                <StatsTable>
                  <StatsLine name="Max" value={calcMax(plainValues)} />
                  <StatsLine name="Min" value={calcMin(plainValues)} />
                  <StatsLine name="Avg" value={calcAvg(plainValues)} />
                </StatsTable>
                <StatsTable>
                  <StatsLine
                    name="p10"
                    value={calcPercentile(plainValues, 10)}
                  />
                  <StatsLine
                    name="p25"
                    value={calcPercentile(plainValues, 25)}
                  />
                  <StatsLine
                    name="p50"
                    value={calcPercentile(plainValues, 50)}
                  />
                  <StatsLine
                    name="p75"
                    value={calcPercentile(plainValues, 75)}
                  />
                  <StatsLine
                    name="p90"
                    value={calcPercentile(plainValues, 90)}
                  />
                </StatsTable>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
