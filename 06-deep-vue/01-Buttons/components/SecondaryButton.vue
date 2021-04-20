<template>
  <base-button class="button_secondary" v-bind="$attrs" v-on="$listeners">
    <slot></slot>
  </base-button>
</template>

<script>
import BaseButton from './BaseButton.vue';

export default {
  name: 'SecondaryButton',
  components: { BaseButton },
};
</script>

<style scoped>
.button_secondary {
  background-color: var(--white);
  border-color: var(--blue);
  color: var(--blue);
}

.button_secondary:hover {
  border-color: var(--blue-light);
}
</style>
