import React from 'react'
import styled from 'styled-components'
import { JurisdictionTable } from './JurisdictionTable'
import { HistoryLineChart } from './HistoryLineChart'
import { UtilPieChart } from './UtilPieChart'
import { getUsedKeys } from '../utils/getUsedKeys'
import { JurisdictionData } from '../types'
const Wrapper = styled.div`
  margin: 1rem;
  width: 100%;
  overflow-x: auto;
`

const ChartsWrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  text-align: center;
  > div {
    margin: 1em 0;
  }
`

export const DetailPage = ({
  data,
  headerText,
}: {
  data: JurisdictionData
  headerText?: string | JSX.Element
}) => {
  const usedKeys = getUsedKeys(data.DataEntries)
  return (
    <>
      <ChartsWrapper>
        {headerText}
        <UtilPieChart DataEntries={data.DataEntries} usedKeys={usedKeys} />
        <HistoryLineChart
          // @ts-ignore
          DataEntries={data.DataEntries}
          usedKeys={usedKeys}
        />
      </ChartsWrapper>
      <div className="m-4" />

      <Wrapper>
        <JurisdictionTable
          //@ts-ignore
          usedKeys={usedKeys}
          //@ts-ignore
          data={data}
        />
      </Wrapper>
    </>
  )
}
