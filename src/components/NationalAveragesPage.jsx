import React from "react";
import data from "../data/cleaned/nestedData.json";
import { TypesOfUtilities, TypesOfPlaces, UtilityDict } from "../types";
import { JurisdictionPage } from "./JurisdictionPage";

const objectMap = (obj, fn) =>
  Object.fromEntries(Object.entries(obj).map(([k, v], i) => [k, fn(v, k, i)]));

export const NationalAveragesPage = () => {
  const averagesForUtils = Object.values(data).reduce((acc, d) => {
    d.DataEntries.forEach(entry => {
      if (!entry.Updated) return;
      const year = String(new Date(entry.Updated).getFullYear());
      acc[year] = acc[year] || {};
      TypesOfPlaces.forEach(property => {
        acc[year][property] = acc[year][property] || {};
        TypesOfUtilities.forEach(utilityName => {
          // debugger;
          acc[year][property][utilityName] = acc[year][property][
            utilityName
          ] || {
            total: 0,
            num: 0
          };
          if (entry[property][utilityName]) {
            acc[year][property][utilityName].total +=
              entry[property][utilityName];
            acc[year][property][utilityName].num += 1;
          }
        });
      });
    });
    return acc;
  }, {});

  const DataEntries = [];

  Object.keys(averagesForUtils).map(year => {
    if (averagesForUtils[year].SingleFamily.Total.num < 20) {
      return;
    }
    DataEntries.push({
      Updated: Number(new Date(`June ${year}`)),
      SingleFamily: objectMap(
        averagesForUtils[year].SingleFamily,
        d => d.total / d.num
      ),
      MultiFamily: objectMap(
        averagesForUtils[year].MultiFamily,
        d => d.total / d.num
      ),
      Retail: objectMap(averagesForUtils[year].Retail, d => d.total / d.num),
      Office: objectMap(averagesForUtils[year].Office, d => d.total / d.num),
      Industrial: objectMap(
        averagesForUtils[year].Industrial,
        d => d.total / d.num
      )
    });
  });
  const myData = { DataEntries, Jurisdiction: "Averages" };
  return <JurisdictionPage myData={myData} />;
};
