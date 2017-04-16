<template>
  <div class="togo">
    <div class="number">{{remaining}}</div>
    <div class="text">to go</div>
  </div>
</template>

<script>
  export default {
    name: 'toGo',
    props: ['remaining']
  }
</script>

<style scoped>
  .togo {
    background: green;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    text-transform: uppercase;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    border-radius: 5px;
    margin-left: 10px;
  }

  .togo .number {
    font-size: 30px;
  }
</style>
