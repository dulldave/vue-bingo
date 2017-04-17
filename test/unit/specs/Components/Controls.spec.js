import Vue from 'vue'
import Controls from '@/components/Controls'

const env = {}

describe('Controls.vue', () => {
  beforeEach(() => {
    env.clock = sinon.useFakeTimers()
    const Constructor = Vue.extend(Controls)
    env.vm = new Constructor({
      propsData: {
        tickets: []
      }
    }).$mount()
  })

  afterEach(() => {
    env.clock.restore()
  })

  describe('getNumbers method', () => {
    it('should return an array of numbers of length 90', () => {
      expect(env.vm.getNumbers().length).to.equal(90)
    })
  })

  describe('startGame method', () => {
    it('should emit the resetGame event if the timer has stopped', () => {
      let stub = sinon.stub(env.vm, '$emit')

      env.vm.stopTimer = true

      env.vm.startGame()

      expect(stub.callCount).to.equal(1)
      expect(stub.args[0][0]).to.equal('resetGame')
    })

    it('should reset the stopTimer data attribute back to false', () => {
      env.vm.stopTimer = true

      env.vm.startGame()

      expect(env.vm.stopTimer).to.equal(false)
    })

    it('should set the numbersCalled property', function () {
      env.vm.tickets = [234]

      sinon.stub(env.vm, 'getNumbers').returns([123, 456])

      env.vm.startGame()
      env.clock.tick(500)

      expect(env.vm.numberCalled).to.equal(123)
    })

    it('should emit the updateCalled event if number found', function () {
      let emitStub = sinon.stub(env.vm, '$emit')

      env.vm.tickets = [
        [{ number: 1 }]
      ]

      sinon.stub(env.vm, 'getNumbers').returns([1])

      env.vm.startGame()
      env.clock.tick(1000)

      expect(emitStub.callCount).to.equal(1)
    })
  })

  describe('property change', () => {
    describe('stopTimer property', () => {
      it('should reset started data attribute when the stopTimer data attribute is changed to true', (done) => {
        // Set started to true.
        env.vm.started = true

        // Calling this attribute will set off a "watcher"
        // that will do some extrat leg work for us
        env.vm.stopTimer = true

        Vue.nextTick(() => {
          expect(env.vm.started).to.equal(false)
          done()
        })
      })

      it('should not reset started data attribute when the stopTimer data attribute is changed to false', (done) => {
        // Set started to true.
        env.vm.started = true

        // Calling this attribute will set off a "watcher"
        // that will do some extrat leg work for us
        env.vm.stopTimer = false

        Vue.nextTick(() => {
          expect(env.vm.started).to.equal(true)
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
        env.vm.tickets = [tickets]

        Vue.nextTick(() => {
          expect(env.vm.stopTimer).to.equal(true)
          done()
        })
      })

      it('should keep stopTimer set to false if a bingo ticket has less than 15 called numbers', (done) => {
        tickets[0].called = false

        env.vm.tickets = [tickets]

        Vue.nextTick(() => {
          expect(env.vm.stopTimer).to.equal(false)
          done()
        })
      })
    })
  })
})
