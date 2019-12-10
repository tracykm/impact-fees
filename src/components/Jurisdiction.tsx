import React, { useState } from "react";

import { useParams } from "react-router-dom";
export const Jurisdiction = () => {
  let { name } = useParams();
  return <div>asdf {name}</div>;
};
