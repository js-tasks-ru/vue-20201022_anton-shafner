<template>
  <AppInput
    :value="date"
    :type="type"
    v-bind="$attrs"
    v-on="$listeners"
    @input.native="handleInput"
  >
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',

  components: { AppInput },

  props: {
    value: {},
    valueAsNumber: {
      type: Number
    },
    valueAsDate: {
      type: Date,
    },
    type: {
      type: String,
      default: 'date',
      validate: (type) => {
        return ['date', 'time', 'datetime-local'].indexOf(type) !== -1;
      }
    }
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  methods: {
    handleInput(event) {
      this.$emit('update:valueAsNumber', event.target.valueAsNumber);
      this.$emit('update:valueAsDate', event.target.valueAsDate || new Date(event.target.valueAsNumber));
    },
    getDate(date) {
      return date.toISOString().split('T')[0];
    },
    getTime(date) {
      const fullTime = date.toISOString().split('T')[1].split('.')[0];
      const step = this.$attrs.step;

      if (step > 0 && step < 60) {
        return fullTime;
      } else {
        return fullTime.slice(0, 5);
      }
    }
  },
  computed: {
    date() {
      if (!this.valueAsNumber && !this.valueAsDate) {
        return this.value;
      }
      let newDate = null;
      if (this.valueAsDate) {
        newDate = this.valueAsDate;
      }
      if (this.valueAsNumber) {
        newDate = new Date(this.valueAsNumber);
      }
      if (this.type === 'time') {
        return this.getTime(newDate);
      }
      if (this.type === 'datetime-local') {
        return `${this.getDate(newDate)}T${this.getTime(newDate)}`
      }

      return this.getDate(newDate);
    },
  },
};
</script>

<style scoped></style>
