import * as React from "react";
import * as dayjs from "dayjs";

export const Footer: React.FC<{ repo: string; owner: string }> = ({
  owner,
  repo,
}) => (
  <div className="mt-8">
    <p className="text-center">
      Generated {dayjs().format("lll")} for {owner}/{repo}
    </p>
  </div>
);
