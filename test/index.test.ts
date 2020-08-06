import * as core from "@actions/core";
import { runAction } from "../src";
import "jest-canvas-mock";
describe("Main", () => {
  it("Should run full process", async () => {
    // given

    // when
    await runAction();

    // then
    expect((core.setFailed as any).mock.calls.length).toBe(0);
    expect((core.error as any).mock.calls.length).toBe(0);
    expect((core.info as any).mock.calls.length).toBeTruthy();
  });
});
