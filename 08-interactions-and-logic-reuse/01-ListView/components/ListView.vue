<template>
  <div class="meetups-list">
    <!-- Требуется scoped-slot для каждого элемента списка -->
    <div v-for="listItem in items">
      <slot :listItem="listItem">
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListView',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.meetups-list {
}
</style>
