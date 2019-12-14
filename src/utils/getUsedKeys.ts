import {
  JurisdictionData,
  UtilityBreakDown,
  PropertyType,
  UtilityType
} from "../types";

export type UsedKeys = Partial<{ [k in PropertyType]: UtilityType[] }>;
export function getUsedKeys(data: JurisdictionData["DataEntries"]) {
  const usedKeys: UsedKeys = {};
  data.forEach(pointInTime => {
    Object.keys(pointInTime).forEach((group: keyof typeof pointInTime) => {
      const groupTime = pointInTime[group];
      if (typeof groupTime === "object") {
        Object.keys(groupTime).forEach((cat: keyof UtilityBreakDown) => {
          const val = pointInTime[group][cat];
          if (val) {
            usedKeys[group] = usedKeys[group] || [];

            if (!usedKeys[group].includes(cat)) {
              usedKeys[group].push(cat);
            }
          }
        });
      }
    });
  });
  return usedKeys;
}
