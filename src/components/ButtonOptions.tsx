import React from "react";
import { ButtonGroup, Button } from "reactstrap";

export const ButtonOptions = ({
  options,
  onChange,
  value
}: {
  options: Array<{ name: string; value: string | number }>;
  onChange: (val: any) => void;
  value: string | number;
}) => {
  return (
    <ButtonGroup>
      {options.map(d => (
        <Button
          key={d.value}
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
