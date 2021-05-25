<template>
  <div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="prevMonthButtonHandler"></button>
          <div>{{currentDate}}</div>
          <button class="rangepicker__selector-control-right" @click="nextMonthButtonHandler"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div
          v-for="day in shownDays"
          :key="day.edgesDay.startDay"
          class="rangepicker__cell"
          :class="{'rangepicker__cell_inactive': day.inactive}"
        >
          {{day.number}}
          <slot :edgesDay="day.edgesDay"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const millisecondsInDay = 1000 * 60 * 60 * 24 - 1;

export default {
  name: 'CalendarView',
  data() {
    return {
      date: new Date(),
    }
  },
  computed: {
    currentDate() {
      const month = this.date.toLocaleString(navigator.language, {month: 'long'});
      return `${month} ${this.currentYear}`;
    },
    currentYear() {
      return this.date.getFullYear();
    },
    currentMonth() {
      return this.date.getMonth();
    },
    prevMonth() {
      return this.currentMonth - 1;
    },
    nextMonth() {
      return this.currentMonth + 1;
    },
    shownCountDayPrevMonth() {
      const weekday = new Date(this.currentYear, this.currentMonth, 1).getDay();
      return weekday ? weekday - 1 : 6;
    },
    shownCountDayNextMonth() {
      const weekday = new Date(this.currentYear, this.nextMonth, 0).getDay();
      return weekday ? 7 - weekday : 0;
    },
    countDayPrevMonth() {
      return new Date(this.currentYear, this.currentMonth, 0).getDate();
    },
    countDayCurrentMonth() {
      return new Date(this.currentYear, this.nextMonth, 0).getDate();
    },
    shownDays() {
      const allDays = [];    
      let currentMonthInfo = null;
      let prevMonthInfo = null;
      let nextMonthInfo = null;

      if (this.shownCountDayPrevMonth) {  
        let numberFirstDay = this.countDayPrevMonth - this.shownCountDayPrevMonth + 1;
        let numberLastDay = this.countDayPrevMonth;
        prevMonthInfo = this.getMonthInfo(numberFirstDay, numberLastDay, this.prevMonth);
        allDays.push(...prevMonthInfo.days);
      }

      let numberFirstDay = 1;
      let numberLastDay = this.countDayCurrentMonth;
      currentMonthInfo = this.getMonthInfo(numberFirstDay, numberLastDay, this.currentMonth);
      allDays.push(...currentMonthInfo.days);

      if (this.shownCountDayNextMonth) { 
        let numberFirstDay = 1;
        let numberLastDay = this.shownCountDayNextMonth;
        nextMonthInfo = this.getMonthInfo(numberFirstDay, numberLastDay, this.nextMonth);
        allDays.push(...nextMonthInfo.days);
      }

      return allDays;
    }
  },

  methods: {
    nextMonthButtonHandler() {
      this.date = new Date(this.currentYear, this.nextMonth);
    },
    prevMonthButtonHandler() {
      this.date = new Date(this.currentYear, this.prevMonth);
    },
    getMonthInfo(numberFirstDay, numberLastDay, month) {
      let monthInfo = {
        days: [],
        startMonth: 0,
        endMonth: 0,
      };
      for(let i = numberFirstDay; i <= numberLastDay; i++ ) {
        const startDay = new Date(this.currentYear, month, i).getTime();
        const endDay = startDay + millisecondsInDay;
        monthInfo.days.push({
          number: i,
          inactive: month !== this.currentMonth,
          edgesDay: {
            startDay,
            endDay,
          },
        });
      }
    
      monthInfo.startMonth = Date.parse(new Date(this.currentYear, month, numberFirstDay));
      monthInfo.endMonth = Date.parse(new Date(this.currentYear, month, numberLastDay)) + millisecondsInDay;

      return monthInfo;
    },
  },
};
</script>

<style scoped>
.rangepicker {
  position: relative;
  margin: 32px 0 0;
}

.rangepicker__selector {
  display: flex;
  background-color: var(--white);
  flex-direction: row;
  justify-content: space-between;
  flex: 1 0 100%;
}

.rangepicker__calendar {
  flex-grow: 1;
}

.rangepicker__month-indicator {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.rangepicker__selector-controls {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}
.rangepicker__selector-controls button {
  border: none;
  padding: 0;
}

.rangepicker__selector-control-left,
.rangepicker__selector-control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('../assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.rangepicker__selector-control-left:hover,
.rangepicker__selector-control-right:hover {
  opacity: 0.8;
}

.rangepicker__selector-control-right {
  transform: rotate(180deg);
}

.rangepicker__date-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

/* Dates */
.rangepicker__date-grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.rangepicker__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.rangepicker__cell.rangepicker__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .rangepicker__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .rangepicker__date-grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .rangepicker__cell {
    height: 144px;
  }

  .rangepicker__cell:nth-child(7n + 1) {
    border-left: none;
  }
}
</style>
