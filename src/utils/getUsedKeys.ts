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
    // @ts-ignore
    Object.keys(pointInTime).forEach((group: keyof typeof pointInTime) => {
      const groupTime = pointInTime[group];
      if (typeof groupTime === "object") {
        Object.keys(groupTime).forEach(
          // @ts-ignore
          (cat: keyof UtilityBreakDown) => {
            // @ts-ignore
            const val = pointInTime[group][cat];
            if (val) {
              // @ts-ignore
              usedKeys[group] = usedKeys[group] || [];
              // @ts-ignore
              if (!usedKeys[group].includes(cat)) {
                // @ts-ignore
                usedKeys[group].push(cat);
              }
            }
          }
        );
      }
    });
  });
  return usedKeys;
}
