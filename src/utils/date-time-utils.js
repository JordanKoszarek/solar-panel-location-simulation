const DateTimeUtils = {
  getAdjustedDate: (timezoneOffset = undefined) => {
    const now = new Date();

    if (timezoneOffset !== undefined) {
      const offsetMinutes = timezoneOffset / 60;
      const localOffsetMinutes = now.getTimezoneOffset();
      const totalOffsetMs = (offsetMinutes + localOffsetMinutes) * 60 * 1000;
      now.setTime(now.getTime() + totalOffsetMs);
    }

    return now;
  },

  formatDateToString: (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;

    return `${dayOfWeek}, ${month} ${dayOfMonth}, ${year} at ${hours}:${minutes} ${ampm}`;
  },

  getDateAndTimeNow: (timezoneOffset = undefined) => {
    const adjustedDate = DateTimeUtils.getAdjustedDate(timezoneOffset);
    return DateTimeUtils.formatDateToString(adjustedDate);
  },
};

export default DateTimeUtils;
