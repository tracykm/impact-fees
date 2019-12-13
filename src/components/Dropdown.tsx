import React from "react";

export const Dropdown = ({
  options,
  onChange,
  value
}: {
  options: Array<{ name: string; value: string | number }>;
  onChange: (val: any) => void;
  value: string | number;
}) => {
  return (
    <select
      className="custom-select"
      value={value}
      onChange={e => {
        onChange(e.target.value);
      }}
    >
      {options.map(d => (
        <option key={d.value} value={d.value}>
          {d.name}
        </option>
      ))}
    </select>
  );
};
