import { getUsedKeys } from './getUsedKeys'

describe('getUsedKeys', () => {
  it('simple', () => {
    expect(getUsedKeys([])).toEqual({})
  })

  it('complex', () => {
    expect(
      getUsedKeys([
        {
          Updated: 1550556000000,
          SingleFamily: {
            Total: 3234,
          },
          MultiFamily: {
            Police: 546,
          },
        },
        {
          Updated: 3550556000000,
          SingleFamily: {
            Total: 3234,
            Library: 178,
          },
        },
      ]),
    ).toEqual({ SingleFamily: ['Total', 'Library'], MultiFamily: ['Police'] })
  })
})
