import { checkOverlaps } from "@/utils/checkOverlaps";
import { sessionsMock } from "@/mocks/sessionsMock";

test("detects overlapping sessions", () => {
  const overlaps = checkOverlaps(sessionsMock);
  expect(overlaps).toContain("1");
  expect(overlaps).toContain("2");
  expect(overlaps).toContain("3");
  expect(overlaps).toContain("4");

  expect(overlaps).not.toContain("5");
  expect(overlaps).not.toContain("6");
  expect(overlaps).not.toContain("7");
  expect(overlaps).not.toContain("8");
  expect(overlaps).not.toContain("9");
  expect(overlaps).not.toContain("10");
  expect(overlaps).not.toContain("11");
  expect(overlaps).not.toContain("12");
  expect(overlaps).not.toContain("13");
  expect(overlaps).not.toContain("14");
  expect(overlaps).not.toContain("15");
});
