<template>
  <div class="bingo-strip">
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

    name: 'bingoStrip',

    props: ['tickets'],

    components: {
      BingoTicket
    }
  }
</script>

<style lang="scss" scoped>
  .bingo-strip {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-right: 12rem;
    align-items: center;
  }
</style>
