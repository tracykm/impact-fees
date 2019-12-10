import { JurisdictionData, Details } from "../types";
export function getUsedKeys(data: JurisdictionData["DataEntries"]) {
  const usedKeys: { [k: string]: string[] } = {};
  data.forEach(pointInTime => {
    // @ts-ignore
    Object.keys(pointInTime).forEach((group: keyof typeof pointInTime) => {
      const groupTime = pointInTime[group];
      if (typeof groupTime === "object") {
        Object.keys(groupTime).forEach(
          // @ts-ignore
          (cat: keyof Details) => {
            // @ts-ignore
            const val = pointInTime[group][cat];
            if (val) {
              usedKeys[group] = usedKeys[group] || [];
              if (!usedKeys[group].includes(cat)) {
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
