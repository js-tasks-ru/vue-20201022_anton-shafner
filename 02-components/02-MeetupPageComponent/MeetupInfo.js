import { toLocalDate, toStringDate } from './data.js';

export const MeetupInfo = {
  template: `<ul class="info-list">
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{organizer}}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{place}}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="stringDate">{{localDate}}</time>
      </li>
    </ul>`,

  props: {
    organizer: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    }
  },

  computed: {
    stringDate() {
      return toStringDate(this.date);
    },
    localDate() {
      return toLocalDate(this.date);
    },
  }
};
