<template>
  <button @click="$emit('increment', ++count_)">{{ count_ }}</button>
</template>

<script>
export default {
  name: 'CounterButton',
  model: {
    prop: 'count',
    event: 'increment'
  },
  data() {
    return {
      count_: 0
    }
  },
  props: {
    count: {
      type: Number,
      default: 0
    }
  },
  watch: {
    count: {
      immediate: true,
      handler(val) {
        this.count_ = val;
      }
    }
  }
};
</script>

<style>

</style>
