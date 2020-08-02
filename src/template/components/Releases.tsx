import * as React from "react";
import * as dayjs from "dayjs";
import * as relativeTimePlugin from "dayjs/plugin/relativeTime";

import { SubHeader } from "./SubHeader";
import { ReleaseYear } from "../../model";

dayjs.extend(relativeTimePlugin);

const MAX_ITEMS = 20;

export const Releases: React.FC<{ year: ReleaseYear }> = ({ year }) => {
  const newestReleases = year.releases
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, MAX_ITEMS);

  return (
    <div>
      <SubHeader header="Releases" />
      <table className="table-auto w-full text-left">
        <thead>
          <tr className="bg-gray-800 text-gray-100">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Commit</th>
          </tr>
        </thead>
        <tbody id="tbl-releases-body">
          {newestReleases.map((n, i) => (
            <tr className={i % 2 == 0 ? "bg-gray-200" : "bg-gray-300"}>
              <td className="px-4 py-2">{year.releases.length - i}</td>
              <td className="px-4 py-2">{dayjs(n.timestamp).fromNow()}</td>
              <td className="px-4 py-2">{n.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {MAX_ITEMS < year.releases.length ? (
        <p>Only last {MAX_ITEMS} items shown.</p>
      ) : null}
    </div>
  );
};
