<template>
  <list-view :items="meetupsWithCoverAndBadge">
    <template #default="{ listItem }">
      <list-view-card
        tag="router-link"
        :to="{ name: 'meetup', params: { meetupId: listItem.id } }"
        :key="listItem.id"
        :title="listItem.title"
        :cover="listItem.cover"
        :badge="listItem.badge"
        :badge-success="listItem.badgeSuccess"
      >
        <meetup-info
          :date="listItem.date"
          :place="listItem.place"
          :organizer="listItem.organizer"
        />
      </list-view-card>
    </template>
  </list-view>
</template>

<script>
import ListView from './ListView';
import ListViewCard from './ListViewCard';
import MeetupInfo from './MeetupInfo';
import { getImageUrlByImageId } from '../data';

export default {
  name: 'MeetupsList',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  components: { ListView, ListViewCard, MeetupInfo },

  computed: {
    meetupsWithCoverAndBadge() {
      return this.meetups.map((meetup) => {
        const newMeetup = { ...meetup };
        if (meetup.attending) {
          newMeetup.badge = 'Участвую';
          newMeetup.badgeSuccess = true;
        } else if (meetup.organizing) {
          newMeetup.badge = 'Организую';
        }
        newMeetup.cover =
          meetup.imageId && getImageUrlByImageId(meetup.imageId);
        newMeetup.date = new Date(meetup.date);
        return newMeetup;
      });
    },
  },
};
</script>

<style></style>
