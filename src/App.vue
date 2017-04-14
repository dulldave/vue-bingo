<template>
<div id="app">
  <bingoStrip :tickets="tickets"></bingoStrip>
  <div class="controls">
    <div class="number-called">{{numberCalled}}</div>
    <button v-on:click="startGame">Start Game</button>      
  </div>
</div>
</template>

<script>
import BingoStrip from './components/BingoStrip'
import { createBingoTickets } from './ticketParser'
import _ from 'lodash'

const ticketString = '011722475204365360702637497481233455758302154058881928446789061241507324334876840738576186051132437816395663800818206590104559628214294664710935667287132130687703253151692742547985'

let timer = ''

export default {

  /**
   * ...
   */
  name: 'app',

  /**
   * ...
   */
  data () {
    return {
      tickets: [],
      numberCalled: 0
    }
  },

  methods: {
    /**
     * ...
     */
    startGame () {
      timer = setInterval(() => {
        // This will be used to output to both the user
        // what the score is and to update the coresponding ticket.
        this.numberCalled = Math.floor(Math.random() * (90 - 1 + 1)) + 1

        // We now loop over each ticket item attempting to find
        // the object in the array with the number matching the
        // called number. If it's found, we simply update the
        // called property to be true, which using Vue's reactive
        // nature will cause the number on the cell to rerender
        // and show that it has been called.
        this.tickets.forEach((ticket) => {
          const found = _.find(ticket, { number: this.numberCalled })
          if (found) {
            found.called = true
          }
        })
        // this.$set(this.tickets[Math.floor(Math.random() * (5 - 0 + 1)) + 0][Math.floor(Math.random() * (14 - 0 + 1)) + 0], 'called', true)
      }, 100)
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
  },

  watch: {
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
        tickets.forEach((ticket, index) => {
          // Check if the length of the 'called' object is 15.
          // If it is, we alert and clear the timer.
          if (_.filter(ticket, { called: true }).length === 15) {
            alert(`Ticket ${index + 1} wins!`)
            clearInterval(timer)
          }
        })
      },
      deep: true
    }
  },

  /**
   * Components simply gives us access to nested components
   * in the App template.
   */
  components: {
    BingoStrip
  }
}
</script>

<style>
body {
  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#a4b357+0,75890c+100;Olive+3D+%233 */
  background: #a4b357; /* Old browsers */
  background: -moz-radial-gradient(center, ellipse cover, #a4b357 0%, #75890c 100%); /* FF3.6-15 */
  background: -webkit-radial-gradient(center, ellipse cover, #a4b357 0%,#75890c 100%); /* Chrome10-25,Safari5.1-6 */
  background: radial-gradient(ellipse at center, #a4b357 0%,#75890c 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a4b357', endColorstr='#75890c',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
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

.controls {
  width: 200px;
  height: 200px;
  margin-left: 20px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.number-called {
  font-size: 90px;
}
</style>
