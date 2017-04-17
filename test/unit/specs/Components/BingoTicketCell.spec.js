import Vue from 'vue'
import BingoTicketCell from '@/components/BingoTicketCell'

describe('BingoTicketCell.vue', () => {
  describe('rendering the correct number', () => {
    it('should render 99 based on the number 99 being passed in the object', () => {
      const Constructor = Vue.extend(BingoTicketCell)
      const vm = new Constructor({
        propsData: {
          cell: { number: 99, called: false }
        }
      }).$mount()

      expect(vm.$el.querySelector('td span').textContent)
        .to.equal('99')
    })

    it('should render 2 based on the number 2 being passed in the object', () => {
      const Constructor = Vue.extend(BingoTicketCell)
      const vm = new Constructor({
        propsData: {
          cell: { number: 2, called: false }
        }
      }).$mount()

      expect(vm.$el.querySelector('td span').textContent)
        .to.equal('2')
    })

    it('should render nothing based on the number 0 being passed', () => {
      const Constructor = Vue.extend(BingoTicketCell)
      const vm = new Constructor({
        propsData: {
          cell: 0
        }
      }).$mount()

      expect(vm.$el.querySelector('td span'))
        .to.equal(null)
    })
  })
  describe('rendering the correct class name', () => {
    it('should add the class "called" as the object passed has "called" set to true', () => {
      const Constructor = Vue.extend(BingoTicketCell)
      const vm = new Constructor({
        propsData: {
          cell: { number: 2, called: true }
        }
      }).$mount()

      expect(vm.$el.className)
        .to.equal('called')
    })

    it('should NOT add the class "called" as the object passed has "called" set to false', () => {
      const Constructor = Vue.extend(BingoTicketCell)
      const vm = new Constructor({
        propsData: {
          cell: { number: 2, called: false }
        }
      }).$mount()

      expect(vm.$el.className)
        .to.not.equal('called')
    })
  })
})
