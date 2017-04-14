<template>
  <div class="bingo-ticket">
    <table>
      <tbody>
        <tr v-for="row in getRows">
          <BingoTicketCell
            v-for="(col, index) in row"
            :col="col"
            :key="index">
          </BingoTicketCell>
        </tr>
      </tbody>
    </table>
    <toGo :ticket="ticket"></toGo>
  </div>
</template>

<script>
import ToGo from './ToGo'
import BingoTicketCell from './BingoTicketCell'

export default {
  /**
   * ...
   */
  name: 'bingoTicket',

  /**
   * ...
   */
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

  /**
   * ...
   */
  computed: {
    getRows () {
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
    }
  }
}
</script>

<style scoped>
  .bingo-ticket {
    display: flex;
    margin-bottom: 10px;
    background: #fff;
    border-radius: 5px;
    padding: 20px;
  }
</style>
