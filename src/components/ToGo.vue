<template>
  <div class="togo">
    <div class="number">{{toGo}}</div>
    <div class="text">to go</div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  /**
   * Defines name for component
   */
  name: 'toGo',

  /**
   * Defines the expected props and the types.
   * Used to validate the code and make sure the
   * correct data is being passed
   */
  props: {
    ticket: {
      type: Array,
      required: true
    }
  },

  /**
   * ...
   */
  computed: {
    toGo () {
      return 15 - _.filter(this.ticket, { called: true }).length
    }
  }
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
