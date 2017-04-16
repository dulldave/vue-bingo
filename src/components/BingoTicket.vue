<template>
  <div class="bingo-ticket">
    <div
      class="winner"
      v-show="remaining === 0">
      WINNER
    </div>
    <table>
      <tbody>
        <tr v-for="row in rows">
          <BingoTicketCell
            v-for="(cell, index) in row"
            :cell="cell"
            :key="index">
          </BingoTicketCell>
        </tr>
      </tbody>
    </table>
    <toGo :remaining="remaining"></toGo>
  </div>
</template>

<script>
  import _ from 'lodash'
  import ToGo from './ToGo'
  import BingoTicketCell from './BingoTicketCell'

  export default {

    name: 'bingoTicket',

    props: {
      ticket: {
        type: Array,
        required: true
      }
    },

    components: {
      ToGo,
      BingoTicketCell
    },

    computed: {
     /**
      * The rows() method computes the rows for a bingo ticket
      * and sets the numbers to the correct columns.
      */
      rows () {
        // Create a slice, we don't want to mutate the parent data
        const ticket = this.ticket.slice()

        const rows = []

        // We know we've got three rows, so we will only loop three times
        for (let row = 0; row < 3; row++) {
          // For each row, create an "empty data" array
          rows[row] = [0, 0, 0, 0, 0, 0, 0, 0, 0]

          // We know that we have only 5 numbers per row, so we can loop
          // only 5 times. In this loop, we shift the first item off the
          // array, we then check if the number value is 90 and set the
          // column index to '8'.
          //
          // As defined in the spec, 80-90 must go last.
          //
          // We then divide the number by 10 and use Math.floor() to give
          // the correct column index in th array.
          //
          // We then set the number and called boolean to the correct column
          for (let i = 0; i < 5; i++) {
            const value = ticket.shift()
            const col = value.number === 90 ? 8 : Math.floor(value.number / 10)
            rows[row][col] = {number: value.number, called: value.called}
          }
        }

        // Return the columns
        return rows
      },

     /**
      * The remaining() methos computed how many numbers are
      * left to be called for a bingo ticket.
      */
      remaining () {
        return 15 - _.filter(this.ticket, { called: true }).length
      }
    }
  }
</script>

<style lang="scss" scoped>
  .bingo-ticket {
    display: flex;
    position: relative;
    margin-bottom: 1rem;
    background: #fff;
    border-radius: .5rem;
    padding: 1.5rem;
  }

  .winner {
    position: absolute;
    background: rgba(0,0,0,.6);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: .5rem;
    color: #fff;
    font-size: 5rem;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
</style>
