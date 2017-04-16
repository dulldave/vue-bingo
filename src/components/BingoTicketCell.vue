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

<style scoped>  
  table td {
    border: 1px solid #efefef;
    padding: 10px;
    width: 20px;
    height: 20px;
    text-align: center;
    font-weight: bold;
  }

  table td.called {
    background: red;
    color: #fff;
    font-weight: bold;
  }
</style>
