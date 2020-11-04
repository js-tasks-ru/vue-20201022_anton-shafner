import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';
import { getMeetupCoverLink } from './data.js';

export const MeetupView = {
  name: 'MeetupView',

  template: `
    <div>
    <meetup-cover :title="meetup.title" :link="imgUrl" />
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <meetup-description :description="meetup.description"/>

            <h3>Программа</h3>
            <meetup-agenda :agenda="meetup.agenda"/>
          </div>
          <div class="meetup__aside">
            <meetup-info :organizer="meetup.organizer" :place="meetup.place" :date="date" />
          </div>
        </div>
      </div>
    </div>`,

    components: {
      MeetupDescription,
      MeetupCover,
      MeetupInfo,
      MeetupAgenda,
    },

    props: {
      meetup: {
        type: Object,
        required: true,
      } 
    },
    computed: {
      imgUrl() {
        return getMeetupCoverLink(this.meetup);
      },
      date() {
        return new Date(this.meetup.date);
      }
    },
};
