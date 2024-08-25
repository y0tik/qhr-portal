import { describe, test, it, expect } from "vitest";
import { extractModuleName } from "./utils";

describe("func: extractModuleNameFromURL", () => {
  test("When module is at the start", () => {
    const url = "/m/jobs/user/1d34da3das/files";
    expect(extractModuleName(url)).toBe("jobs");
  });

  test("When module is at the start with double /", () => {
    const url = "//m//jobs/user/1d34da3das/files";
    expect(extractModuleName(url)).toBe("jobs");
  });

  test("Future proofing, When module is in between with double ////", () => {
    const url = "///qhr////m///jobs/user/1d34da3das/files";
    expect(extractModuleName(url)).toBe("jobs");
  });

  test("With full url, and triple slashes", () => {
    const url = "https:qhr.com/app/m///jobs/user/1d34da3das/files";
    expect(extractModuleName(url)).toBe("jobs");
  });

  test("Ending in module", () => {
    const url = "https:qhr.com/app/m///jobs";
    expect(extractModuleName(url)).toBe("jobs");
  });

  test("Ending in module with slash at end", () => {
    const url = "https:qhr.com/app/m///jobs/";
    expect(extractModuleName(url)).toBe("jobs");
  });

  test("Ending in module with multiple slash at end", () => {
    const url = "https:qhr.com/app/m///jobs////";
    expect(extractModuleName(url)).toBe("jobs");
  });
});
