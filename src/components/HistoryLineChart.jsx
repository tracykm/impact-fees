import React, { useState } from 'react'
import { LineChart, Tooltip, Line, XAxis, YAxis } from 'recharts'
import { formatMoney } from './Cell'
import {
  JurisdictionData,
  UtilityType,
  TypesOfPlaces,
  PropertyDict,
} from '../types'
import { UsedKeys } from '../utils/getUsedKeys'
import { ButtonsOrDropdown } from './ButtonsOrDropdown'

export const HistoryLineChart = ({ DataEntries, usedKeys }) => {
  const [utility, setUtility] = useState('Total')
  const opts = Object.keys(
    Object.values(usedKeys)
      .flat()
      .reduce((acc, k) => {
        acc[k] = k // remove duplicates
        return acc
      }, {}),
  )

  const data = DataEntries.map((d) => ({
    SingleFamily: d.SingleFamily[utility],
    MultiFamily: d.MultiFamily[utility],
    Retail: d.Retail[utility],
    Office: d.Office[utility],
    Industrial: d.Industrial[utility],
    Updated: d.Updated,
  }))
  // @ts-ignore-start
  return (
    <div className="d-inline-block">
      <LineChart
        width={600}
        height={400}
        data={data}
        margin={{
          bottom: 10,
        }}
      >
        <XAxis
          //@ts-ignore
          tickFormatter={(val) => {
            return new Date(val).getFullYear()
          }}
          dataKey="Updated"
          type="number"
          domain={['auto', 'auto']}
        />
        <YAxis tickFormatter={formatMoney} />
        <Tooltip
          labelFormatter={(val) => {
            return new Date(val).getFullYear()
          }}
          formatter={formatMoney}
        />
        {TypesOfPlaces.map((propertyType) => (
          <Line
            type="monotone"
            key={propertyType}
            dataKey={propertyType}
            stroke={PropertyDict[propertyType].color || ''}
          />
        ))}
      </LineChart>
      <div className="text-center">
        <ButtonsOrDropdown
          onChange={setUtility}
          value={utility}
          options={opts.map((d) => ({ name: d, value: d }))}
        />
      </div>
    </div>
  )
}
// @ts-ignore-end
