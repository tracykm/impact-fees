import {nestData} from './nestData';

it('nestData', () => {
  const data = [
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
  ];
  const data2 = [
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
  ];
  expect(nestData([data, data2])).toEqual({
    Lowell: {
      State: 'AR',
      County: 'Benton',
      Jurisdiction: 'Lowell',
      DataEntries: [
        {
          Updated: 1200000000000,
          SingleFamily: {
            Total: 1754,
            NonUtil: 504,
          },
        },
        {
          Updated: 1100000000000,
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
  });
});
