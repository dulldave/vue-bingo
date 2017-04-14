import Vue from 'vue'
import BingoTicket from '@/components/BingoTicket'

describe('BingoTicket.vue', () => {
  describe('Options computed', () => {
    it('should compute the correct rows based on ticket prop', () => {
      const ticket = [
        { number: 1, called: false },
        { number: 17, called: false },
        { number: 22, called: false },
        { number: 47, called: false },
        { number: 52, called: false },
        { number: 4, called: false },
        { number: 36, called: false },
        { number: 53, called: false },
        { number: 60, called: false },
        { number: 70, called: false },
        { number: 26, called: false },
        { number: 37, called: false },
        { number: 49, called: false },
        { number: 74, called: false },
        { number: 81, called: false }
      ]

      const Constructor = Vue.extend(BingoTicket)
      const vm = new Constructor({
        propsData: {
          ticket: ticket
        }
      })

      console.log(vm.getRows)

      expect(vm.getRows.length).to.equal(3)
    })
  })
})
