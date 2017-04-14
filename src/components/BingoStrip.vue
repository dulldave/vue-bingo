<template>
  <div>
    <bingoTicket
      v-for="(ticket, index) in tickets"
      :ticket="ticket"
      :key="index">
    </bingoTicket>
  </div>
</template>

<script>
import BingoTicket from './BingoTicket'

export default {

  /**
   * ...
   */
  name: 'bingoStrip',

  /**
   * ...
   */
  props: ['tickets'],

  /**
   * ...
   */
  components: {
    BingoTicket
  }
}
</script>
