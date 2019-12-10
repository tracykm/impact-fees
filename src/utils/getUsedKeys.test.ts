import { getUsedKeys } from "./getUsedKeys";

it("getUsedKeys", () => {
  expect(getUsedKeys([])).toEqual({});
});

it("getUsedKeys", () => {
  expect(
    getUsedKeys([
      {
        Updated: 1550556000000,
        SingleFamily: {
          Total: 3234
        },
        MultiFamily: {
          Police: 546
        }
      },
      {
        Updated: 3550556000000,
        SingleFamily: {
          Library: 178
        }
      }
    ])
  ).toEqual({ SingleFamily: ["Total", "Library"], MultiFamily: ["Police"] });
});
