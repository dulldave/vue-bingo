<template>
  <td 
    v-bind:class="[col.called ? 'called' : '']">
    <span v-if="col !== 0">{{col.number}}</span>
  </td>
</template>

<script>
  export default {
    name: 'bingoTicketCell',
    props: ['col']
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
