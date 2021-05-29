<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <form-group>
      <dropdown-button
        title="Тип"
        :options="$options.agendaItemTypes"
        v-model="localAgendaItem.type"
      />
    </form-group>

    <div class="form__row">
      <div class="form__col">
        <form-group label="Начало">
          <app-input type="time" placeholder="00:00" v-model="localAgendaItem.startsAt"/>
        </form-group>
      </div>
      <div class="form__col">
        <form-group label="Окончание">
          <app-input type="time" placeholder="00:00" v-model="localAgendaItem.endsAt"/>
        </form-group>
      </div>
    </div>
    <form-group
      v-for="itemField in $options.fieldSpecifications[localAgendaItem.type]"
      :key="itemField.field"
      :label="itemField.title"
    >
      <component
        :is="itemField.component"
        v-model="localAgendaItem[itemField.field]"
        v-bind="itemField.props"
      />
    </form-group>
  </div>
</template>

<script>
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import FormGroup from './FormGroup';
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
} from '../meetup-service';

export default {
  name: 'MeetupAgendaItemForm',

  components: { AppInput, DropdownButton, FormGroup },

  agendaItemTypes: getAgendaItemTypes(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),

  props: {
    agendaItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localAgendaItem: { ...this.agendaItem }
    }
  },
  watch: {
    localAgendaItem: {
      deep: true,
      handler(val) {
        this.$emit('update:agendaItem', { ...val });
      }
    },
    'localAgendaItem.startsAt'(newVal, oldVal) {
      const [hourEnd, minEnd] = this.localAgendaItem.endsAt.split(':');
      const [newHourStart, newMinStart] = newVal.split(':');
      const [oldHourStart, oldMinStart] = oldVal.split(':');
      const offsetHours = newHourStart - oldHourStart;
      const offsetMins = newMinStart - oldMinStart;
      const date = new Date().setHours(+hourEnd + offsetHours, +minEnd + offsetMins);
      this.localAgendaItem.endsAt = new Date(date).toTimeString().slice(0, 5);
    }
  }
};
</script>

<style></style>
