import * as React from "react";

export const Footer: React.FC<{ repo: string; owner: string }> = ({
  owner,
  repo,
}) => (
  <div>
    <p className="text-center">
      Generated ${new Date().toLocaleString()} for ${owner}/${repo}
    </p>
  </div>
);
