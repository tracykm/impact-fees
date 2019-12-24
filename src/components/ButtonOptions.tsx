import React from "react";
import { ButtonGroup, Button } from "reactstrap";
import styled from "styled-components";

interface ButtonOptionProps {
  selected: boolean;
}

const ButtonOption = styled(Button)`
  z-index: ${(props: ButtonOptionProps) => (props.selected ? 1 : 0)};
`;

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
        <ButtonOption
          selected={d.value === value}
          key={d.value}
          onClick={() => onChange(d.value)}
          className={
            value === d.value ? "btn-outline-primary" : "btn-outline-secondary"
          }
        >
          {d.name}
        </ButtonOption>
      ))}
    </ButtonGroup>
  );
};
