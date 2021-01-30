<template>
  <div class="container">
    <meetups-view
      :view.sync="view"
      :date.sync="date"
      :participation.sync="participation"
      :search.sync="search"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';
import { router } from '../router/index';

const DEFAULT_VIEW = 'list';
const DEFAULT_DATE = 'all';
const DEFAULT_PARTICIPATION = 'all';
const DEFAULT_SEARCH = '';

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },
  data() {
    return {
      view: DEFAULT_VIEW,
      date: DEFAULT_DATE,
      participation: DEFAULT_PARTICIPATION,
      search: DEFAULT_SEARCH,
    }
  },
  methods: {
    getParamsFromQuery(query) {
      this.view = query.view || DEFAULT_VIEW;
      this.date = query.date || DEFAULT_DATE;
      this.participation = query.participation || DEFAULT_PARTICIPATION;
      this.search = query.search || DEFAULT_SEARCH;
    },
  },
  watch: {
    $route: {
      handler: function (to) {
        this.getParamsFromQuery(to.query);
      },
      immediate: true,
    },
    query(value) {
      router.push(value).catch(err => {
        if (err.name !== 'NavigationDuplicated') {
          throw err;
        }
      });
    }
  },
  computed: {
    query() {
      return {
        query: {
          ...(this.view === DEFAULT_VIEW ? {} : { view: this.view }),
          ...(this.date === DEFAULT_DATE ? {} : { date: this.date }),
          ...(this.participation === DEFAULT_PARTICIPATION ? {} : { participation: this.participation }),
          ...(this.search === DEFAULT_SEARCH ? {} : { search: this.search }),
        }
      }
    }
  }
};
</script>

<style scoped></style>
