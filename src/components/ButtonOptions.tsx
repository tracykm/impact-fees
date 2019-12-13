import React, { useState } from "react";
import { ButtonGroup, Button } from "reactstrap";

export const ButtonOptions = ({
  options,
  onChange,
  value
}: {
  options: Array<{ name: string; value: string }>;
  onChange: (val: any) => void;
  value: string;
}) => {
  const [selected, setSelected] = useState("");
  return (
    <ButtonGroup>
      {options.map(d => (
        <Button
          onClick={() => onChange(d.value)}
          className={
            value === d.value ? "btn-outline-primary" : "btn-outline-secondary"
          }
        >
          {d.name}
        </Button>
      ))}
    </ButtonGroup>
  );
};
