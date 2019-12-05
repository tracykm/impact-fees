import {cleanData} from './cleanData';

it ('cleans data', () => {
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
  ];
  expect (cleanData (data)).toEqual ([
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
  ]);
});
