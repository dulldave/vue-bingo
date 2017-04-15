import Vue from 'vue'
import App from '@/App'

describe('App.vue', () => {
  describe('updateCalled method', () => {
    it('should set called to true on an object', () => {
      const vm = new Vue(App).$mount()

      const numberObject = { called: false }

      vm.updateCalled(numberObject)

      expect(numberObject.called).to.equal(true)
    })
  })

  describe('resetGame method', () => {
    it('should reset all called attributes on all tickets to false', () => {
      const tickets = [
        [
          {number: 1, called: true},
          {number: 1, called: true},
          {number: 1, called: true}
        ],
        [
          {number: 1, called: true},
          {number: 1, called: true},
          {number: 1, called: true}
        ],
        [
          {number: 1, called: true},
          {number: 1, called: true},
          {number: 1, called: true}
        ]
      ]

      const Constructor = Vue.extend(App)
      const vm = new Constructor({
        propsData: {
          tickets: tickets
        }
      })

      vm.tickets = tickets
      vm.resetGame()

      tickets.forEach((ticket) => {
        ticket.forEach((number) => {
          expect(number.called).to.equal(false)
        })
      })
    })
  })
})
