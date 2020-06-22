import React from 'react'

export const Dropdown = ({
  options,
  onChange,
  value,
  className,
}: {
  options: Array<{ name: string; value: string | number }>
  onChange: (val: any) => void
  value: string | number
  className?: string
}) => {
  return (
    <select
      style={{ width: 'initial' }}
      className={'custom-select' + ' ' + className}
      value={value}
      onChange={(e) => {
        onChange(e.target.value)
      }}
    >
      {options.map((d) => (
        <option key={d.value} value={d.value}>
          {d.name}
        </option>
      ))}
    </select>
  )
}
