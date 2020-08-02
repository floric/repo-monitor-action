import { generatePage } from "./template/page";

export const runDev = async () => {
  const source = generatePage(
    {
      year: 1993,
      releases: [{ id: "abc", timestamp: new Date().getTime() }],
    },
    { owner: "test", repo: "sources" }
  );
  console.log(source);
};

runDev();
