import { JurisdictionData, Details } from "../types";
export function getUsedKeys(data: JurisdictionData["DataEntries"]) {
  const usedKeys = {};
  data.forEach(pointInTime => {
    Object.keys(pointInTime).forEach(group => {
      Object.keys(pointInTime[group]).forEach(cat => {
        const val = pointInTime[group][cat];
        if (val) {
          usedKeys[group] = usedKeys[group] || [];
          usedKeys[group].push(cat);
        }
      });
    });
  });
  return usedKeys;
}
