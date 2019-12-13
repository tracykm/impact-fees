import React, { useState } from "react";
import { ButtonGroup, Button } from "reactstrap";

export const ButtonOptions = ({
  options
}: {
  options: Array<{ name: string; value: string }>;
}) => {
  const [selected, setSelected] = useState("");
  return (
    <ButtonGroup>
      {options.map(d => (
        <Button
          onClick={() => setSelected(d.value)}
          className={
            selected === d.value
              ? "btn-outline-primary"
              : "btn-outline-secondary"
          }
        >
          {d.name}
        </Button>
      ))}
    </ButtonGroup>
  );
};
