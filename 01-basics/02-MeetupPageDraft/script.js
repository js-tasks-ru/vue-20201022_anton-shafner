import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

function toStringDate(date) {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
  const day = newDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data: {
    rawMeetupData: null,
    meetupImage: null,
  },

  async mounted() {
    // Требуется получить данные митапа с API
    await this.getMeetupData();
    await this.getMeetupImage(this.rawMeetupData);
  },

  computed: {
    meetupData() {
      if(!this.rawMeetupData) {
        return {};
      }
      return {
        ...this.rawMeetupData,
        localDate: new Date(this.rawMeetupData.date).toLocaleString('ru', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        stringDate: toStringDate(this.rawMeetupData.date),
        agenda: this.rawMeetupData.agenda.map((agenda) => ({
          ...agenda,
          title: agenda.title || agendaItemTitles[agenda.type],
          icon: agendaItemIcons[agenda.type],
        })),
      }
    }
  },

  methods: {
    // Получение данных с API предпочтительнее оформить отдельным методом,
    // а не писать прямо в mounted()
    async getMeetupData() {
      const promise = await fetch(`${API_URL}/meetups/${MEETUP_ID}`);
      this.rawMeetupData = await promise.json();
    },
    async getMeetupImage(meetup) {
      const promise = await fetch(getMeetupCoverLink(meetup));
      const blob = await promise.blob();
      let promiseReader = new Promise(resolve => {
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = () => resolve(reader.result);
      });
      this.meetupImage = await promiseReader;
    },
  },
});
