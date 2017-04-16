<template>
  <div class="controls">
    <div class="number-called">{{numberCalled}}</div>
    <button class="btn" v-on:click="startGame" v-bind:disabled="started">
      <span v-if="stopTimer">
        Restart Game
      </span>
      <span v-else>
        Start Game
      </span>
    </button>      
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    name: 'controls',

   /**
    * We use numberCalled to show the user the number being called.
    * We use stopTimer to determine when the game is finished and when to restart.
    */
    data () {
      return {
        numberCalled: 0,
        stopTimer: false,
        started: false
      }
    },

    props: ['tickets'],

    methods: {
     /**
      * The startGame() method is called when the click event occurs on the "start button".
      * The first thing it does is to check if the timer has been stopped. If it has, we can
      * assume that this is a click for a game restart and we need to reset the game.
      *
      * It then uses lodash to generate an array of numbers from 1-90,
      * then shuffles those numbers randomly.
      *
      * It then calls setInterval every X seconds, shifts a number off
      * the numbers array (so we don't call it more than once) and attempts
      * to find it in one of the tickets.
      *
      * Once found it emits an event to update that item in the parent and
      * set its "called" value to true, which will rerender the item on display
      * showing it to have been called.
      */
      startGame () {
        this.started = true

        if (this.stopTimer === true) {
          this.stopTimer = false
          this.$emit('resetGame')
        }

        const numbers = this.getNumbers()

        this.timer = setInterval(() => {
          // This will be used to output to both the user
          // what the score is and to update the coresponding ticket.
          this.numberCalled = numbers.shift()

          // We now loop over each ticket item attempting to find
          // the object in the array with the number matching the
          // called number. If it's found, we simply update the
          // called property to be true, which using Vue's reactive
          // nature will cause the number on the cell to rerender
          // and show that it has been called.
          this.tickets.forEach((ticket) => {
            const found = _.find(ticket, { number: this.numberCalled })
            if (found) {
              this.$emit('updateCalled', found)
            }
          })
        }, 1000)
      },

      /**
       * Returns a randomly shuffled array of numbers from 1 to 90.
       */
      getNumbers () {
        return _.shuffle(_.range(1, 91))
      }
    },

    watch: {
      /**
       * The stopTimer watcher listens for changes on the stopTimer data attribute
       * if it's updated to true, we clear the timer interval to stop the numbers
       * being generated.
       *
       * This is usually called when a ticket has had all of it's numbers called,
       * ending the game.
       */
      stopTimer (value) {
        if (value === true) {
          clearInterval(this.timer)
          this.started = false
        }
      },

     /**
      * We set a watcher on the 'tickets' data property and we check
      * make sure we watch 'deeply' meaning if a property is updated
      * on a nested object this should be called.
      *
      * The main thing this is doing is just waiting for a ticket to
      * be fully marked. As soon as that happens it clears the timer
      * and outputs an alert letting us know which ticket won.
      */
      tickets: {
        handler (tickets) {
          // Go through each individual bingo ticket
          tickets.forEach((ticket) => {
            // Check if the length of the 'called' object is 15.
            // If it is, we alert and clear the timer.
            if (_.filter(ticket, { called: true }).length === 15) {
              this.stopTimer = true
            }
          })
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .controls {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 12rem;
    background: #fff;
  }

  .number-called {
    font-size: 7rem;
    font-weight: bold;
  }

  .btn {
    border: none;
    background: #008000;
    padding: 1rem;
    color: #fff;
    font-size: 1rem;
    text-transform: uppercase;
    font-weight: bold;
    border-radius: .5rem;
    letter-spacing: -.1rem;

    &:hover {
      cursor: pointer;
    }

    &[disabled="disabled"] {
      background: #efefef;
      cursor: not-allowed;
    }
  }
</style>
