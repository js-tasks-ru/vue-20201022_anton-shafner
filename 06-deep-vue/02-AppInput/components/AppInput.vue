<template>
  <div
    class="input-group"
    :class="iconClasses"
  >
    <slot name="left-icon"></slot>

    <component
      :is="inputComponent"
      class="form-control"
      :class="{ 'form-control_sm': small, 'form-control_rounded': rounded }"
      :value.prop="value"
      v-bind="$attrs"
      v-on="extendedListeners"
    />
    <slot name="right-icon"></slot>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'AppInput',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    small: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    multiline: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value);
    },
    handleChange(event) {
      this.$emit('change', event.target.value);
    },
  },
  computed: {
    inputComponent() {
      return this.multiline ? 'textarea': 'input'
    },
    extendedListeners() {
      return {
        ...this.$listeners,
        input: this.handleInput,
        change: this.handleChange,
      }

    },
    iconClasses() {
      const rightIconSlot = this.$slots['right-icon'];
      const leftIconSlot = this.$slots['left-icon'];
      return {
        'input-group_icon': leftIconSlot || rightIconSlot,
        'input-group_icon-right': rightIconSlot,
        'input-group_icon-left': leftIconSlot,
      }
    }
  }
};
</script>

<style scoped>
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s all;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon .icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .icon:first-child {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .icon:last-child {
  right: 16px;
}
</style>
