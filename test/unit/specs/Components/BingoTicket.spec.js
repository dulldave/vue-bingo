import Vue from 'vue'
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

    const Constructor = Vue.extend(BingoTicket)
    env.vm = new Constructor({
      propsData: {
        ticket: env.ticket
      }
    }).$mount()
  })

  it('should render the right amount of cells in the table', () => {
    expect(env.vm.$el.querySelectorAll('td').length).to.equal(27)
  })

  it('should render the right amount of numbers', () => {
    expect(env.vm.$el.querySelectorAll('td span').length).to.equal(15)
  })

  describe('Computed rows', () => {
    it('should compute the correct rows based on ticket prop', () => {
      env.vm.rows.forEach((row) => {
        expect(row.length).to.equal(9)
      })

      expect(env.vm.rows.length).to.equal(3)
    })
  })
  describe('Computed remaining', () => {
    it('should compute the number remaining as 13 as 2 numbers have been called for this ticket', () => {
      env.ticket[0].called = true
      env.ticket[1].called = true
      expect(env.vm.remaining).to.equal(13)
    })

    it('should compute the number remaining as 0 as all numbers have been called for this ticket', () => {
      env.ticket.forEach((number) => {
        number.called = true
      })
      expect(env.vm.remaining).to.equal(0)
    })

    it('should compute the number remaining as 15 as no numbers have been called for this ticket', () => {
      expect(env.vm.remaining).to.equal(15)
    })
  })
})
