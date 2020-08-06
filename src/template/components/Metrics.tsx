import * as React from "react";
import { SubHeader } from "./SubHeader";
import { MetricsData, Config, MetricConfig } from "../../model";
import { Statistics } from "./Statistics";

export const Metrics: React.FC<{
  config: Config;
  graphics: Map<
    string,
    { img: string; config: MetricConfig; data: MetricsData }
  >;
}> = ({ graphics, config }) => (
  <div>
    <SubHeader header="Metrics" />
    {Object.entries(config.groups).map(([groupKey, groupAtts]) => (
      <div key={`group-${groupKey}`}>
        <h4 className="text-lg mb-2 mt-8 font-bold">{groupAtts.name}</h4>
        <p className="mb-2">{groupAtts.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {groupAtts.metrics
            .map((n) => graphics.get(n))
            .filter((n) => !!n)
            .map(({ data, img, config: { description } }) => {
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
                      <div className="mb-2">
                        <p>{description}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    ))}
  </div>
);
