<template>
  <div>
    <calendar-view>
      <template #default="{ day }">
        <router-link
          v-for="meetup in getDisplayedMeetups(day)"
          :key="meetup.id"
          :to="{ name: 'meetup', params: { meetupId: meetup.id } }"
          class="rangepicker__event"
        >
          {{ meetup.title }}
        </router-link>
      </template>
    </calendar-view>
  </div>
</template>

<script>
import CalendarView from './CalendarView';

export default {
  name: 'MeetupsCalendar',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  components: {
    CalendarView,
  },
  methods: {
    getDisplayedMeetups(day) {
      const stringDate = new Date(day).toISOString().split('T')[0];
      return this.groupedMeetupsByDate[stringDate];
    }
  },
  computed: {
    groupedMeetupsByDate() {
      const groupedMeetups = {};
      this.meetups.forEach(meetup => {
        const stringDate = new Date(meetup.date).toISOString().split('T')[0];
        if (!groupedMeetups[stringDate]) {
          groupedMeetups[stringDate] = [];
        }
        groupedMeetups[stringDate].push(meetup)
      });

      return groupedMeetups;
    }
  }
};
</script>

<style scoped>
.rangepicker__event {
  --maxLines: 2;
  --lineHeight: 16px;
  --fontSize: 14px;

  display: block;

  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: var(--fontSize);
  line-height: var(--lineHeight);
  font-weight: 600;
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  text-decoration: none;
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .rangepicker__event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--maxLines) * var(--lineHeight) + 6px);
  }
}
</style>
