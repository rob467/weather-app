import { format, isToday, isTomorrow } from 'date-fns';

export function formatCloseDates(date) {
  if (isToday(date)) {
    return 'Today';
  } else if (isTomorrow(date)) {
    return 'Tomorrow';
  } else {
    return format(date, 'dd/MMM/yy');
  }
}
