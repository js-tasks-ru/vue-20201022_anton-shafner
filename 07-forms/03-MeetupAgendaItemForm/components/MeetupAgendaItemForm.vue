<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <select class="form-control" title="Тип" v-model="agendaItem_.type">
        <option
          v-for="type in agendaItemTypes"
          :key="type.value"
          :value="type.value">
          {{ type.text }}
        </option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input
            class="form-control"
            type="time"
            placeholder="00:00"
            v-model="agendaItem_.startsAt"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input
            class="form-control"
            type="time"
            placeholder="00:00"
            v-model="agendaItem_.endsAt"
          />
        </div>
      </div>
    </div>

    <template v-if="agendaItem_.type === 'talk'">
      <div class="form-group">
        <label class="form-label">Тема</label>
        <input class="form-control" v-model="agendaItem_.title" />
      </div>
      <div class="form-group">
        <label class="form-label">Докладчик</label>
        <input class="form-control" v-model="agendaItem_.speaker" />
      </div>
    </template>
    <div class="form-group" v-if="agendaItem_.type === 'other'">
      <label class="form-label">Заголовок</label>
      <input class="form-control" v-model="agendaItem_.title"/>
    </div>
    <div class="form-group" v-if="isTalkOrOther">
      <label class="form-label">Описание</label>
      <textarea class="form-control" v-model="agendaItem_.description"></textarea>
    </div>
    <div class="form-group" v-if="agendaItem_.type === 'talk'">
      <label class="form-label">Язык</label>
      <select class="form-control" v-model="agendaItem_.language">
        <option
          v-for="lang in languages"
          :key="lang.value"
          :value="lang.value">
          {{ lang.text }}
        </option>
      </select>
    </div>
    <div class="form-group" v-if="!isTalkOrOther">
      <label class="form-label">Нестандартный текст (необязательно)</label>
      <input class="form-control" v-model="agendaItem_.title" />
    </div>
  </div>
</template>

<script>
const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

function cloneObject(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export default {
  name: 'MeetupAgendaItemForm',
  props: {
    agendaItem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      agendaItem_: cloneObject(this.agendaItem),
      agendaItemTypes: getAgendaItemTypes(),
      languages: getTalkLanguages(),
    }
  },
  watch: {
    agendaItem_: {
      deep: true,
      handler: function(val) {
        this.$emit('update:agendaItem', cloneObject(val));
      }
    },
    'agendaItem_.startsAt'(newVal, oldVal) {
      const [hourEnd, minEnd] = this.agendaItem_.endsAt.split(':');
      const [newHourStart, newMinStart] = newVal.split(':');
      const [oldHourStart, oldMinStart] = oldVal.split(':');
      const offsetHours = newHourStart - oldHourStart;
      const offsetMins = newMinStart - oldMinStart;
      const date = new Date().setHours(+hourEnd + offsetHours, +minEnd + offsetMins);
      this.agendaItem_.endsAt = new Date(date).toTimeString().slice(0, 5);
    }
  },
  computed: {
    isTalkOrOther() {
      return this.agendaItem_.type === 'other' || this.agendaItem_.type === 'talk';
    }
  }
};
</script>

<style></style>
