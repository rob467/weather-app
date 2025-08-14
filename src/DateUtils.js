import { format, isToday, isThisHour } from 'date-fns';

function formatDates(date) {
  if (isToday(date)) {
    return 'Today';
  } else {
    return format(date, 'd/M');
  }
}

function formatHours(hour) {
  if (isThisHour(hour)) {
    return 'Now';
  } else {
    return format(hour, 'HH:mm');
  }
}

export { formatDates, formatHours }
