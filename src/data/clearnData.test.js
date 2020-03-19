import { cleanData } from './cleanData'

it('cleans data', () => {
  const data = [
    {
      State: 'AR',
      County: 'Benton',
      Jurisdiction: 'Lowell',
      Updated: '4/16/07',
      '': '',
      Total: '$1,754',
      'Non-Util': '$504',
      Water__1: '$116',
      Sewer__1: '$68',
      Drain__1: '',
      Parks__1: '$568',
      Library__1: '',
    },
  ]
  expect(cleanData(data)).toEqual([
    {
      State: 'AR',
      County: 'Benton',
      Jurisdiction: 'Lowell',
      Updated: 1176699600000,
      SingleFamily: {
        Total: 1754,
        NonUtil: 504,
      },
      MultiFamily: {
        Parks: 568,
        Sewer: 68,
        Water: 116,
      },
      Office: {},
      Retail: {},
      Industrial: {},
    },
  ])
})

it('empty row', () => {
  const data = [
    {
      State: '',
      County: '',
      Jurisdiction: '',
      SingleFamily: {},
      MultiFamily: {},
      Retail: {},
      Office: {},
      Industrial: {},
    },
  ]
  expect(cleanData(data)).toEqual([])
})

it('header', () => {
  const data = [
    {
      State: 'State',
      County: 'County',
      Jurisdiction: 'Jurisdiction',
      UpdatedNotes: 'Updated',
      SingleFamily: {
        TotalNotes: 'Total',
        NonUtilNotes: 'Non-Util',
        RoadsNotes: 'Roads',
        WaterNotes: 'Water',
        SewerNotes: 'Sewer',
        DrainNotes: 'Drain',
        ParksNotes: 'Parks',
        LibraryNotes: 'Library',
        FireNotes: 'Fire',
        PoliceNotes: 'Police',
        GenGovNotes: 'GenGov',
        SchoolsNotes: 'Schools',
        OtherNotes: 'Other',
      },
      MultiFamily: {
        TotalNotes: 'Total',
      },
    },
  ]
  expect(cleanData(data)).toEqual([])
})

it('empty key', () => {
  const data = [{ '': 'Single-Family Unit' }]
  expect(cleanData(data)).toEqual([])
})

it('extra header', () => {
  const data = [
    {
      State: 'Total with some fees',
      County: '',
      Jurisdiction: 275,
    },
  ]
  expect(cleanData(data)).toEqual([])
})

it('sub total', () => {
  const data = [
    {
      State: 'NV',
      County: '',
      Jurisdiction: 5,
      SingleFamily: {
        Total: 5604,
        NonUtil: 4772,
      },
    },
  ]
  expect(cleanData(data)).toEqual([])
})

it('zero', () => {
  const data = [
    {
      State: 'AR',
      County: 'Benton',
      Jurisdiction: 'Lowell',
      Updated: '4/16/07',
      Total: '$5604',
      'Non-Util': '$0',
      Water: '0',
    },
  ]
  expect(cleanData(data)).toEqual([
    {
      State: 'AR',
      County: 'Benton',
      Jurisdiction: 'Lowell',
      Updated: 1176699600000,
      SingleFamily: {
        Total: 5604,
      },
      MultiFamily: {},
      Office: {},
      Retail: {},
      Industrial: {},
    },
  ])
})
