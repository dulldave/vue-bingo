import Vue from 'vue'
import Controls from '@/components/Controls'

const env = {}

describe('Controls.vue', () => {
  beforeEach(() => {
    env.clock = sinon.useFakeTimers()
  })

  afterEach(() => {
    env.clock.restore()
  })

  describe('startGame method', () => {
    it('should emit the resetGame event if the timer has stopped', () => {
      const vm = new Vue(Controls).$mount()

      let stub = sinon.stub(vm, '$emit')

      vm.stopTimer = true

      vm.startGame()

      expect(stub.callCount).to.equal(1)
      expect(stub.args[0][0]).to.equal('resetGame')
    })

    it('should reset the stopTimer data attribute back to false', () => {
      const vm = new Vue(Controls).$mount()

      vm.stopTimer = true

      vm.startGame()

      expect(vm.stopTimer).to.equal(false)
    })

    it('should set the numbersCalled property', function () {
      const vm = new Vue(Controls).$mount()

      vm.tickets = [234]

      sinon.stub(vm, 'getNumbers').returns([123, 456])

      vm.startGame()
      env.clock.tick(1000)

      expect(vm.numberCalled).to.equal(123)
    })

    it('should emit the updateCalled event if number found', function () {
      const vm = new Vue(Controls).$mount()

      let emitStub = sinon.stub(vm, '$emit')

      vm.tickets = [
        [{ number: 1 }]
      ]

      sinon.stub(vm, 'getNumbers').returns([1])

      vm.startGame()
      env.clock.tick(1000)

      expect(emitStub.callCount).to.equal(1)
    })
  })

  describe('property change', () => {
    describe('stopTimer property', () => {
      it('should reset started data attribute when the stopTimer data attribute is changed to true', (done) => {
        const vm = new Vue(Controls).$mount()

        // Set started to true.
        vm.started = true

        // Calling this attribute will set off a "watcher"
        // that will do some extrat leg work for us
        vm.stopTimer = true

        Vue.nextTick(() => {
          expect(vm.started).to.equal(false)
          done()
        })
      })

      it('should not reset started data attribute when the stopTimer data attribute is changed to false', (done) => {
        const vm = new Vue(Controls).$mount()

        // Set started to true.
        vm.started = true

        // Calling this attribute will set off a "watcher"
        // that will do some extrat leg work for us
        vm.stopTimer = false

        Vue.nextTick(() => {
          expect(vm.started).to.equal(true)
          done()
        })
      })
    })
    describe('tickets property', () => {
      let tickets

      beforeEach(() => {
        tickets = [
          {number: 1, called: true},
          {number: 1, called: true},
          {number: 1, called: true},
          {number: 1, called: true},
          {number: 1, called: true},
          {number: 1, called: true},
          {number: 1, called: true},
          {number: 1, called: true},
          {number: 1, called: true},
          {number: 1, called: true},
          {number: 1, called: true},
          {number: 1, called: true},
          {number: 1, called: true},
          {number: 1, called: true},
          {number: 1, called: true}
        ]
      })

      it('should set stopTimer to true if a bingo ticket has 15 called numbers', (done) => {
        const vm = new Vue(Controls).$mount()

        vm.tickets = [tickets]

        Vue.nextTick(() => {
          expect(vm.stopTimer).to.equal(true)
          done()
        })
      })

      it('should keep stopTimer set to false if a bingo ticket has less than 15 called numbers', (done) => {
        const vm = new Vue(Controls).$mount()

        tickets[0].called = false

        vm.tickets = [tickets]

        Vue.nextTick(() => {
          expect(vm.stopTimer).to.equal(false)
          done()
        })
      })
    })
  })
})
