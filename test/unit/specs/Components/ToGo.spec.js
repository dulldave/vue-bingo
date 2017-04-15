import Vue from 'vue'
import ToGo from '@/components/ToGo'

describe('ToGo.vue', () => {
  it('should render correct default contents', () => {
    const Constructor = Vue.extend(ToGo)
    const vm = new Constructor({
      propsData: {
        remaining: 15
      }
    }).$mount()

    expect(vm.$el.querySelector('.number').textContent)
      .to.equal('15')
    expect(vm.$el.querySelector('.text').textContent)
      .to.equal('to go')
  })

  describe('updates the number remaining', () => {
    it('should update the number remaining to 13', () => {
      const Constructor = Vue.extend(ToGo)
      const vm = new Constructor({
        propsData: {
          remaining: 13
        }
      }).$mount()

      expect(vm.$el.querySelector('.number').textContent)
        .to.equal('13')
    })

    it('should update the number remaining to 10', () => {
      const Constructor = Vue.extend(ToGo)
      const vm = new Constructor({
        propsData: {
          remaining: 10
        }
      }).$mount()

      expect(vm.$el.querySelector('.number').textContent)
        .to.equal('10')
    })
  })
})
