import * as React from "react";
import { SubHeader } from "./SubHeader";
import { Doughnut } from "react-chartjs-2";

export const Values: React.FC<{}> = () => (
  <div>
    <SubHeader header="Values" />
    <Doughnut data={[1, 5]} />
  </div>
);
