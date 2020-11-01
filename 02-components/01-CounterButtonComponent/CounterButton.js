export const CounterButton = {
  // Шаблон потребуется отредактировать
  template: `<button type="button" @click="handleClick">{{localCount}}</button>`,
  props: {
    count: Number,
    required: true,
    default: 0,
  },
  model: {
    prop: 'count',
    event: 'increment',
  },
  computed: {
    localCount() {
      if (!!this.count) {
        return this.count;
      }
      return 0;
    }
  },
  methods: {
    handleClick() {
      this.$emit('increment', this.localCount + 1)
    }
  }

  // Компонент должен иметь входной параметр

  // Компонент должен иметь модель

  // Шаблон лучше держать максимально простым, а логику выносить в методы
};
