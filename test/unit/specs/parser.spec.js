import { parse } from '@/parser'

const goodTicketString = '011722475204365360702637497481233455758302154058881928446789061241507324334876840738576186051132437816395663800818206590104559628214294664710935667287132130687703253151692742547985'

describe('parser.js', () => {
  describe('parse function', () => {
    it('should throw an error if a non-string is passed in', () => {
      expect(() => parse(123)).to.throw('Ticket string must be a string')
    })

    it('should throw an error if a string that is not 180 characters is passed', () => {
      expect(() => parse('010203040506070809')).to.throw('Ticket string must be 180 characters')
    })

    it('should remove the 0 from 01 and only add the number 1 to the array', () => {
      expect(parse(goodTicketString)[0][0].number).to.equal(1)
    })

    it('should return 6 arrays', () => {
      expect(parse(goodTicketString).length).to.equal(6)
    })

    it('should return an array of arrays, which contain exactly 15 items each', () => {
      parse(goodTicketString).forEach((item) => {
        expect(item.length).to.equal(15)
      })
    })
  })
})
