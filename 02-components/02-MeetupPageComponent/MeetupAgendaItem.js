import {agendaItemTitles, agendaItemIcons} from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="\`/assets/icons/icon-\${agendaPoint.icon}.svg\`" />
      </div>
      <div class="meetup-agenda__item-col">{{\`\${agendaPoint.startsAt} - \${agendaPoint.endsAt}\`}}</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">{{agendaPoint.title}}</h5>
        <p v-if="agendaPoint.type === 'talk'">
          <span>{{agendaPoint.speaker}}</span>
          <span class="meetup-agenda__dot"></span>
          <span class="meetup-agenda__lang">{{agendaPoint.language}}</span>
        </p>
        <p v-if="agendaPoint.description">{{agendaPoint.description}}</p>
      </div>
    </div>`,

  props: {
    agendaItem: {
      type: Object,
      required: true,
    }
  },

  computed: {
    agendaPoint() {
      return {
        ...this.agendaItem,
        title: this.agendaItem.title || agendaItemTitles[this.agendaItem.type],
        icon: agendaItemIcons[this.agendaItem.type],
      }
    }
  }
};
