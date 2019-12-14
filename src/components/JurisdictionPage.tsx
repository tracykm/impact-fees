import React from "react";
import { useParams } from "react-router-dom";
import nestedData from "../data/cleaned/nestedData.json";
import { DetailPage } from "./DetailPage";
import { JurisdictionData } from "../types";

export const JurisdictionPage = ({ myData }: { myData?: JurisdictionData }) => {
  const { name } = useParams();
  // @ts-ignore
  const data: JurisdictionData = myData
    ? myData
    : nestedData[name as keyof typeof nestedData];

  return (
    <DetailPage
      data={data}
      headerText={
        <div>
          <h1>{name}</h1>
          <div style={{ opacity: 0.5, marginTop: "-.5em" }}>
            {data.County}, {data.State}
          </div>
        </div>
      }
    />
  );
};
