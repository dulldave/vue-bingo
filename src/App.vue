<template>
  <div id="app">
    <bingoStrip :tickets="tickets"></bingoStrip>
    <controls
      v-on:updateCalled="updateCalled"
      v-on:resetGame="resetGame"
      :tickets="tickets">
    </controls>
  </div>
</template>

<script>
  import BingoStrip from './components/BingoStrip'
  import Controls from './components/Controls'
  import { createBingoTickets } from './ticketParser'

  const ticketString = '011722475204365360702637497481233455758302154058881928446789061241507324334876840738576186051132437816395663800818206590104559628214294664710935667287132130687703253151692742547985'

  export default {

    name: 'app',

    /**
     * An empty array of tickets. This will be updated initially,
     * when the parser parses the ticket string.
     */
    data () {
      return {
        tickets: []
      }
    },

    components: {
      BingoStrip,
      Controls
    },

    methods: {
      /**
       * updateCalled is handled when the "updateCalled" event
       * is triggered on the "controls" component.
       *
       * This method simply updates the found number and sets its
       * called attribute to true, which will update it visually
       * on the bingo ticket.
       */
      updateCalled (number) {
        number.called = true
      },

      /**
       * resetGame is handled when the "resetGame" event is triggered
       * it loops over each number, in each ticket, and resets its
       * "called" attribute back to false. This will update the bingo
       * tickets to show no called items and will let the user replay.
       */
      resetGame () {
        this.tickets.forEach((ticket) => {
          ticket.forEach((number) => {
            number.called = false
          })
        })
      }
    },

    /**
     * The created lifecycle method in this case, simply runs
     * the ticket string through a parser and sets the data
     * attribute to its output.
     *
     * Created is called on object initialization.
     */
    created () {
      this.tickets = createBingoTickets(ticketString)
    }
  }
</script>

<style>
  body {
    background: #a4b357;
    background: radial-gradient(ellipse at center, #a4b357 0%,#75890c 100%);
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
