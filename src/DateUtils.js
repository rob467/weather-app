import { format, isToday, isTomorrow } from 'date-fns';

export default function formatDates(date) {
  if (isToday(date)) {
    return 'Today';
  } else {
    return format(date, 'd/M');
  }
}
