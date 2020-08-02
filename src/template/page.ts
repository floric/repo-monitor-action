import { ReleaseYear } from "../model";

export const generatePage = (
  releases: ReleaseYear,
  repo: { repo: string; owner: string }
) => `<!DOCTYPE html>
<html>
  <head>
    <title>Metrics</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/tailwindcss@1.6.0/dist/tailwind.min.css"
      integrity="sha256-Y4vGjLmrpriLD3X1h1YdyzE2icdiBsJHBXORYXlyDwM="
      crossorigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/dayjs@1.8.31/dayjs.min.js"
      integrity="sha256-ORgF0pKrTKxau29bikHxGniNlpQtd9Ku1vbl5/m+mJE="
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/dayjs@1.8.31/plugin/relativeTime.js"
      integrity="sha256-tMJ/JI74gvcd/JCL4zekEwHfyHfT2XKUd5GAZn6fJOU="
      crossorigin="anonymous"
    ></script>
    <script
      src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"
      integrity="sha256-R4pqcOYV8lt7snxMQO/HSbVCFRPMdrhAFMH+vr9giYI="
      crossorigin="anonymous"
    ></script>
    <script>
      dayjs.extend(window.dayjs_plugin_relativeTime);

      const displayReleases = async (url) => {
        const parsed = ${JSON.stringify(releases)};
        const releasesMap = new Map();
        parsed.releases
          .sort((a, b) => b.timestamp - a.timestamp)
          .forEach((r, i) => {
            releasesMap.set(r.id, parsed.releases.length - i);
          });
        document.getElementById("header-year").innerText = \`\${parsed.year}\`;
        document.getElementById("tbl-releases-body").innerHTML = parsed.releases
          .map(
            (n, i) =>
            \`<tr class="\${i % 2 == 0 ? "bg-gray-200" : "bg-gray-300"}">
              <td class="px-4 py-2">\${releasesMap.get(n.id)}</td>
              <td class="px-4 py-2">\${dayjs(n.timestamp).fromNow()}</td>
              <td class="px-4 py-2">\${n.id}</td>
            </tr>\`
          )
          .reduce((a, b) => a + b);
        return releasesMap;
      };

      displayReleases();
    </script>
  </head>
  <body class="bg-gray-100 text-gray-900">
    <div class="flex m-4 justify-center">
      <div class="w-full max-w-6xl">
        <h1 id="header-year" class="text-6xl mb-2">-</h1>
        <div>
          <h2 class="text-xl mb-2 mt-8 font-bold">Releases</h2>
          <ul id="releases"></ul>
          <table class="table-auto w-full text-left">
            <thead>
              <tr class="bg-gray-800 text-gray-100">
                <th class="px-4 py-2">#</th>
                <th class="px-4 py-2">Date</th>
                <th class="px-4 py-2">Commit</th>
              </tr>
            </thead>
            <tbody id="tbl-releases-body"></tbody>
          </table>
        </div>
        <div>
          <h2 class="text-xl mb-2 mt-8 font-bold">Values</h2>
        </div>
        <div>
          <p class="text-center">Generated ${new Date().toLocaleString()} for ${
  repo.owner
}/${repo.repo}</p>
        </div>
      </div>
    </div>
  </body>
</html>`;
