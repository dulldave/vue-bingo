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
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    text-transform: uppercase;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }

  .togo .number {
    font-size: 30px;
  }
</style>
