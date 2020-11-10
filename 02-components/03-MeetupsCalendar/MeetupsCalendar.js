const millisecondsInDay = 1000 * 60 * 60 * 24 - 1;

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="prevMonthButtonHandler"></button>
          <div>{{currentDate}}</div>
          <button class="rangepicker__selector-control-right" @click="nextMonthButtonHandler"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div v-for="day in shownDays" class="rangepicker__cell" :class="{'rangepicker__cell_inactive': day.inactive}">
        {{day.number}}
        <a v-if="day.listMeetups.length" v-for="meetup in day.listMeetups" class="rangepicker__event">{{meetup}}</a>
        </div>
      </div>
    </div>
  </div>`,

  props: {
    meetups: {
      type: Array,
      required: true,
    }
  },

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
      // function addMeetupToShownMonth(monthInfo, meetupDay, meetup) {
      //   if(meetup.date > monthInfo.startMonth && meetup.date < monthInfo.endMonth) {
      //     const index = monthInfo.days.findIndex(day => day.number === meetupDay);
      //     monthInfo.days[index].listMeetups.push(meetup.title);
      //   }
      // }

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
      
      for (let meetup of this.meetups) {
        const meetupDay = new Date(meetup.date).getDate();

        prevMonthInfo && this.addMeetupToShownMonth(prevMonthInfo, meetupDay, meetup);
        this.addMeetupToShownMonth(currentMonthInfo, meetupDay, meetup);
        nextMonthInfo && this.addMeetupToShownMonth(nextMonthInfo, meetupDay, meetup);
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
        monthInfo.days.push({
          number: i,
          inactive: month !== this.currentMonth,
          listMeetups: [],
        });
      }
    
      monthInfo.startMonth = Date.parse(new Date(this.currentYear, month, numberFirstDay));
      monthInfo.endMonth = Date.parse(new Date(this.currentYear, month, numberLastDay)) + millisecondsInDay;

      return monthInfo;
    },
    addMeetupToShownMonth(monthInfo, meetupDay, meetup) {
      if(meetup.date > monthInfo.startMonth && meetup.date < monthInfo.endMonth) {
        const index = monthInfo.days.findIndex(day => day.number === meetupDay);
        monthInfo.days[index].listMeetups.push(meetup.title);
      }
    }
  },
  // Пропсы

  // В качестве локального состояния требуется хранить что-то,
  // что позволит определить текущий показывающийся месяц.
  // Изначально должен показываться текущий месяц

  // Вычислимые свойства помогут как с получением списка дней, так и с выводом информации

  // Методы понадобятся для переключения между месяцами
};
