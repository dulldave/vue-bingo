<template>
  <div class="togo">
    <div class="number">{{remaining}}</div>
    <div class="text">to go</div>
  </div>
</template>

<script>
  export default {
    name: 'toGo',
    props: {
      remaining: {
        type: Number,
        required: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .togo {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #008000;
    width: 4rem;
    color: #fff;
    text-transform: uppercase;
    font-size: 1.25rem;
    font-weight: bold;
    text-align: center;
    border-radius: .5rem;
    margin-left: 1rem;
    
    .number {
      font-size: 2rem;
    }
  }
</style>
