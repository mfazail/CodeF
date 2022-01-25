document.addEventListener("alpine:init", () => {
  Alpine.data("nav", () => ({
    navOpen: false,
    active: "home",
    searchBar: false,
  }));
  Alpine.data("hero", () => ({
    data: [
      {
        image: "./assets/kerala.jpg",
        bg: "./assets/kerala_2.jpg",
        title: "Kerala",
        rating: 4,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis asperiores quod eius exercitationem quas, voluptatem, id eveniet earum explicabo omnis natus placeat? Et iure cum dolorem id tempora, dolorum quo.",
      },
      {
        image: "./assets/indonesia.jpg",
        bg: "./assets/indonesia_2.jpg",
        title: "Indonesia",
        rating: 3,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis asperiores quod eius exercitationem quas, voluptatem, id eveniet earum explicabo omnis natus placeat? Et iure cum dolorem id tempora, dolorum quo.",
      },
      {
        image: "./assets/paris.jpg",
        bg: "./assets/paris_2.jpg",
        title: "Paris",
        rating: 4,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis asperiores quod eius exercitationem quas, voluptatem, id eveniet earum explicabo omnis natus placeat? Et iure cum dolorem id tempora, dolorum quo.",
      },
      {
        image: "./assets/bali.jpg",
        bg: "./assets/bali_2.jpg",
        title: "Bali",
        rating: 5,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis asperiores quod eius exercitationem quas, voluptatem, id eveniet earum explicabo omnis natus placeat? Et iure cum dolorem id tempora, dolorum quo.",
      },
      {
        image: "./assets/thailand.jpg",
        bg: "./assets/thailand_2.jpg",
        title: "Thailand",
        rating: 4,
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis asperiores quod eius exercitationem quas, voluptatem, id eveniet earum explicabo omnis natus placeat? Et iure cum dolorem id tempora, dolorum quo.",
      },
    ],
    text_swiper: null,
    swiper: null,
    cIndex: 0,
    init() {
      this.text_swiper = new Swiper(this.$refs.text_swiper, {
        direction: "vertical",
        loop: true,
        spaceBetween: 10,
        allowTouchMove: false,
      });
      this.swiper = new Swiper(this.$refs.swiper, {
        spaceBetween: 10,
        loop: true,
        speed: 500,
        breakpoints: {
          350: {
            slidesPerView: 1.4,
          },
          550: {
            slidesPerView: 2,
          },
          650: {
            slidesPerView: 1.5,
          },
          850: {
            slidesPerView: 1.8,
          },
          1000: {
            slidesPerView: 2.1,
          },
          1200: {
            slidesPerView: 2.5,
          },
        },
      });
      this.swiper.on("slideChange", () => {
        this.sliding();
      });
    },
    sliding() {
      this.cIndex = this.swiper.realIndex;
      this.text_swiper.slideToLoop(this.swiper.realIndex, 500);
    },
    nextSlide() {
      this.swiper.slideNext(500);
      this.sliding();
    },
    prevSlide() {
      this.swiper.slidePrev(500);
      this.sliding();
    },
  }));
  Alpine.data("dropdown", () => ({
    open: false,
  }));
  Alpine.data("journey", () => ({
    cities: [
      { name: "Bali", add: "DPS, Ngurah Rai International Airport" },
      { name: "Paris", add: "CDG, Paris Charles de Gaulle Airport" },
      { name: "Thailand", add: "BKK, Suvarnabhumi Airport" },
      { name: "Indonesia", add: "KNO, Kualanamu International Airport" },
      { name: "Kerala", add: "COK, Cochin International Airport" },
    ],
    from: { name: "Kerala", add: "COK, Cochin International Airport" },
    to: { name: "Thailand", add: "BKK, Suvarnabhumi Airport" },
    way: false,
    dep: null,
    ret: null,
  }));
  Alpine.data("datepicker", () => ({
    MONTH_NAMES: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    MONTH_SHORT_NAMES: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    DAYS: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    FULL_DAYS: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    showDatepicker: false,
    datepickerValue: "",
    selectedDate: "2021-02-04",
    dateFormat: "DD-MM-YYYY",
    day: "",
    month: "",
    year: "",
    no_of_days: [],
    blankdays: [],
    initDate() {
      let today;
      today = new Date();
      this.month = today.getMonth();
      this.year = today.getFullYear();
      this.day = this.FULL_DAYS[today.getDay()];
      this.datepickerValue = this.formatDateForDisplay(today);
    },
    formatDateForDisplay(date) {
      let formattedDay = this.DAYS[date.getDay()];
      let formattedDate = ("0" + date.getDate()).slice(-2); // appends 0 (zero) in single digit date
      let formattedMonth = this.MONTH_NAMES[date.getMonth()];
      let formattedMonthShortName = this.MONTH_SHORT_NAMES[date.getMonth()];
      let formattedMonthInNumber = (
        "0" +
        (parseInt(date.getMonth()) + 1)
      ).slice(-2);
      let formattedYear = ("" + date.getFullYear()).slice(2);
      if (this.dateFormat === "DD-MM-YYYY") {
        return `${formattedDate} ${formattedMonthShortName}'${formattedYear}`; // 02 Jan'22
      }
      if (this.dateFormat === "YYYY-MM-DD") {
        return `${formattedYear}-${formattedMonthInNumber}-${formattedDate}`; // 2021-04-02
      }
      if (this.dateFormat === "D d M, Y") {
        return `${formattedDay} ${formattedDate} ${formattedMonthShortName} ${formattedYear}`; // Tue 02 Mar 2021
      }
      return `${formattedDay} ${formattedDate} ${formattedMonth} ${formattedYear}`;
    },
    isSelectedDate(date) {
      const d = new Date(this.year, this.month, date);
      return this.datepickerValue === this.formatDateForDisplay(d)
        ? true
        : false;
    },
    isToday(date) {
      const today = new Date();
      const d = new Date(this.year, this.month, date);
      return today.toDateString() === d.toDateString() ? true : false;
    },
    getDateValue(date) {
      let selectedDate = new Date(this.year, this.month, date);
      this.datepickerValue = this.formatDateForDisplay(selectedDate);
      // this.$refs.date.value = selectedDate.getFullYear() + "-" + ('0' + formattedMonthInNumber).slice(-2) + "-" + ('0' + selectedDate.getDate()).slice(-2);
      this.isSelectedDate(date);
      this.day = this.FULL_DAYS[selectedDate.getDay()];
      this.showDatepicker = false;
    },
    getNoOfDays() {
      let daysInMonth = new Date(this.year, this.month + 1, 0).getDate();
      // find where to start calendar day of week
      let dayOfWeek = new Date(this.year, this.month).getDay();
      let blankdaysArray = [];
      for (var i = 1; i <= dayOfWeek; i++) {
        blankdaysArray.push(i);
      }
      let daysArray = [];
      for (var i = 1; i <= daysInMonth; i++) {
        daysArray.push(i);
      }
      this.blankdays = blankdaysArray;
      this.no_of_days = daysArray;
    },
  }));
});
