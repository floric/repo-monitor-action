import * as React from "react";
import { SubHeader } from "./SubHeader";
import { MetricsData } from "../../model";
import { Statistics } from "./Statistics";

export const Metrics: React.FC<{
  graphics: Array<{
    data: MetricsData;
    img: string;
    max?: number;
    min?: number;
    description?: string;
  }>;
}> = ({ graphics }) => (
  <div>
    <SubHeader header="Metrics" />
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {graphics.map(({ data, img, description }) => {
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
              <Statistics values={plainValues} />
              {description ? (
                <div>
                  <p>{description}</p>
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
