<template>
  <div>
    <slot v-for="item in renderedItems" :item="item"></slot>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    page: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 5,
    },
    items: {
      type: Array,
      required: true,
    }
  },
  computed: {
    renderedItems() {
      const startIndex = (this.page - 1) * this.perPage;
      return this.items.slice(startIndex, startIndex + this.perPage);
    }
  }
};
</script>

<style></style>
