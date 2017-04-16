<template>
  <td 
    v-bind:class="[cell.called ? 'called' : '']">
    <span v-if="cell !== 0">{{cell.number}}</span>
  </td>
</template>

<script>
  export default {
    name: 'bingoTicketCell',
    props: {
      cell: {
        type: [Object, Number],
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  table td {
    border: .1rem solid #efefef;
    padding: .5rem;
    width: 1.5rem;
    height: 1.5rem;
    text-align: center;
    font-weight: bold;
    
    &.called {
      background: #ff0000;
      color: #fff;
      font-weight: bold;
    }
  }
</style>
