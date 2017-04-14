import Vue from 'vue'
import ToGo from '@/components/ToGo'

let ticket = []

describe('ToGo.vue', () => {
  it('should render correct default contents', () => {
    const Constructor = Vue.extend(ToGo)
    const vm = new Constructor({
      propsData: {
        ticket: ticket
      }
    }).$mount()

    expect(vm.$el.querySelector('.number').textContent)
      .to.equal('15')
    expect(vm.$el.querySelector('.text').textContent)
      .to.equal('to go')
  })

  describe('updates the number remaining', () => {
    beforeEach(() => {
      ticket = [
        { number: 1, called: false },
        { number: 2, called: false },
        { number: 3, called: false },
        { number: 4, called: false },
        { number: 5, called: false },
        { number: 6, called: false },
        { number: 7, called: false }
      ]
    })

    it('should update the number remaining to 13 as 2 numbers have been called', () => {
      ticket[0]['called'] = true
      ticket[1]['called'] = true

      const Constructor = Vue.extend(ToGo)
      const vm = new Constructor({
        propsData: {
          ticket: ticket
        }
      }).$mount()

      expect(vm.$el.querySelector('.number').textContent)
        .to.equal('13')
    })

    it('should update the number remaining to 10 as 5 numbers have been called', () => {
      ticket[0]['called'] = true
      ticket[1]['called'] = true
      ticket[2]['called'] = true
      ticket[3]['called'] = true
      ticket[4]['called'] = true

      const Constructor = Vue.extend(ToGo)
      const vm = new Constructor({
        propsData: {
          ticket: ticket
        }
      }).$mount()

      expect(vm.$el.querySelector('.number').textContent)
        .to.equal('10')
    })
  })
})
