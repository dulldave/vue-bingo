import Vue from 'vue'
// import _ from 'lodash'
import BingoTicket from '@/components/BingoTicket'

const env = {}

describe('BingoTicket.vue', () => {
  beforeEach(() => {
    env.ticket = [
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
  })
  describe('Computed rows', () => {
    it('should compute the correct rows based on ticket prop', () => {
      const Constructor = Vue.extend(BingoTicket)
      const vm = new Constructor({
        propsData: {
          ticket: env.ticket
        }
      })

      // console.log(vm.rows[0])

      vm.rows.forEach((row) => {
        expect(row.length).to.equal(9)
        // expect(_.filter(row, 0)).to.equal(4)
      })

      expect(vm.rows.length).to.equal(3)
    })
  })
  describe('Computed remaining', () => {
    it('should compute the number remaining as 13 as 2 numbers have been called for this ticket', () => {
      env.ticket[0].called = true
      env.ticket[1].called = true

      const Constructor = Vue.extend(BingoTicket)
      const vm = new Constructor({
        propsData: {
          ticket: env.ticket
        }
      })

      expect(vm.remaining).to.equal(13)
    })

    it('should compute the number remaining as 0 as all numbers have been called for this ticket', () => {
      env.ticket.forEach((number) => {
        number.called = true
      })

      const Constructor = Vue.extend(BingoTicket)
      const vm = new Constructor({
        propsData: {
          ticket: env.ticket
        }
      })

      expect(vm.remaining).to.equal(0)
    })

    it('should compute the number remaining as 15 as no numbers have been called for this ticket', () => {
      const Constructor = Vue.extend(BingoTicket)
      const vm = new Constructor({
        propsData: {
          ticket: env.ticket
        }
      })

      expect(vm.remaining).to.equal(15)
    })
  })
})
