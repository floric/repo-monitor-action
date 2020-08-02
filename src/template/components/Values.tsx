import * as React from "react";
import { SubHeader } from "./SubHeader";

export const Values: React.FC<{
  img: string;
}> = ({ img }) => {
  return (
    <div>
      <SubHeader header="Values" />
      <img src={`data:image/png;base64, ${img}`} />
    </div>
  );
};
