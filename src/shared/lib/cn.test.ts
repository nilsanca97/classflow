import { expect, test } from "vitest";
import { cn } from "./cn";

test("joins class names", () => {
  expect(cn("flex", "items-center")).toBe("flex items-center");
});

test("skips falsy values and applies conditional classes", () => {
  expect(
    cn("flex", false, undefined, { hidden: false, "font-bold": true }),
  ).toBe("flex font-bold");
});

test("keeps the last class when two Tailwind classes conflict", () => {
  expect(cn("p-2", "p-4")).toBe("p-4");
});
