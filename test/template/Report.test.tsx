import * as React from "react";
import * as renderer from "react-test-renderer";
import { Report } from "../../src/template/Report";

describe("Report", () => {
  it("Renders correctly", () => {
    const tree = renderer.create(
      <Report
        config={{ groups: {}, metrics: {} }}
        context={{
          branch: "master",
          releaseId: "rel-a",
          owner: "floric",
          repo: "repo",
          token: "token",
        }}
        graphics={new Map()}
        releases={{ releases: [], year: 2020 }}
        releasesMap={new Map()}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
