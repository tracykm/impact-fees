import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import data from "../data/cleaned/nestedData.json";

const Wrapper = styled.div`
  margin: 1rem;
`;

export const Jurisdiction = () => {
  const { name } = useParams();
  return (
    <Wrapper>
      <h1>{name}</h1>
      <pre>{JSON.stringify(data[name as keyof typeof data], null, 2)}</pre>
    </Wrapper>
  );
};
