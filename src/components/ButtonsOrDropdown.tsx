import React from 'react'
import { Dropdown } from './Dropdown'
import { ButtonOptions } from './ButtonOptions'

export const ButtonsOrDropdown = (props: {
  options: Array<{ name: string; value: string | number }>
  onChange: (val: any) => void
  value: string | number
  className?: string
}) => {
  if (props.options.length > 8) {
    return <Dropdown {...props} />
  } else {
    return <ButtonOptions {...props} />
  }
}
