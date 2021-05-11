<script>
export default {
  name: 'NodesPagination',
  props: {
    page: {
      type: Number,
    },
    perPage: {
      type: Number,
    }
  },
  render: function(createElement) {
    const startIndex = this.perPage * (this.page - 1);
    const endIndex = startIndex + this.perPage;
    const defaultSlots = this.$slots.default;
    const renderedContent =  defaultSlots ? defaultSlots.slice(startIndex, endIndex) : [];
    return createElement('div', renderedContent);
  }
};
</script>

<style scoped></style>
