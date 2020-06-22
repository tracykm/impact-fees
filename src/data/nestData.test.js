import { nestData } from './nestData'

it('nestData', () => {
  const s2011 = [
    {
      State: 'AR',
      County: 'Benton',
      Jurisdiction: 'Lowell',
      Updated: 1200000000000,
      SingleFamily: {
        Total: 1754,
        NonUtil: 504,
      },
    },
  ]
  const s2012 = [
    {
      State: 'AR',
      County: 'Benton',
      Jurisdiction: 'Lowell',
      Updated: 1100000000000,
      SingleFamily: {
        Total: 1354,
        NonUtil: 104,
      },
      MultiFamily: {
        Water: 16,
      },
    },
  ]

  const s2019 = [
    {
      State: 'AR',
      County: 'Benton',
      Jurisdiction: 'Bentonville',
      Updated: 1900000000000,
      SingleFamily: {
        Total: 3234,
        NonUtil: 3234,
      },
      MultiFamily: {},
      Retail: {},
      Office: {},
      Industrial: {},
    },
    {
      State: 'AR',
      County: 'Benton',
      Jurisdiction: 'Lowell',
      Updated: 1900000000000,
      SingleFamily: {
        Fire: 504,
      },
      MultiFamily: {},
      Retail: {},
      Office: {},
      Industrial: {},
    },
  ]
  expect(nestData({ s2011, s2012 })).toEqual({
    ARLowell: {
      State: 'AR',
      County: 'Benton',
      Jurisdiction: 'Lowell',
      DataEntries: [
        {
          Updated: 1200000000000,
          RecordedAt: 's2011',
          SingleFamily: {
            Total: 1754,
            NonUtil: 504,
          },
        },
        {
          Updated: 1100000000000,
          RecordedAt: 's2012',
          SingleFamily: {
            Total: 1354,
            NonUtil: 104,
          },
          MultiFamily: {
            Water: 16,
          },
        },
      ],
    },
  })
})
