import calWeekSVG from './svgs/calendar-week-solid.svg';
import calDaySVG from './svgs/calendar-day-solid.svg';
import calSolidSVG from './svgs/calendar-solid.svg';
import { createHtmlEl } from './AddDOMComponents.js';
import { sharedProjectsFactory } from './CreateProjects.js';
import { format, isToday, isTomorrow, isThisWeek } from 'date-fns';

const sharedProjects = sharedProjectsFactory();

function renderCalendarList() {
  const sidebarDiv = document.querySelector('.sidebar');
  const calendarList = createHtmlEl({
    tag: 'ul',
    parent: sidebarDiv,
    props: { className: 'calendar-list' },
  });
  const calendarSymbols = [
    [calDaySVG, 'Today'],
    [calSolidSVG, 'Tomorrow'],
    [calWeekSVG, 'This week'],
  ];
  calendarSymbols.forEach((symbol) => {
    const calendarItemContainer = createHtmlEl({
      tag: 'div',
      parent: calendarList,
      props: { className: 'calendar-item-container' },
    });
    const listItem = createHtmlEl({
      tag: 'li',
      parent: calendarItemContainer,
      props: {
        id: `calendar-item-${symbol[1].toLowerCase().replace(' ', '-')}`,
        className: 'calendar-list-item',
      },
    });
    createHtmlEl({
      tag: 'img',
      parent: listItem,
      props: { src: symbol[0], className: 'logo-svg' },
    });
    createHtmlEl({
      tag: 'span',
      parent: listItem,
      textContent: symbol[1],
    });

    const todoCalendarList = createHtmlEl({
      tag: 'ul',
      parent: calendarItemContainer,
      props: { className: 'calendar-tasks' },
    });
  });
}

function renderCalendarTasks() {
  const calendarItems = document.querySelectorAll('.calendar-item-container');
  calendarItems.forEach((item) => {
    const symbol = item.querySelector('span').textContent;
    const todoCalendarList = item.querySelector('.calendar-tasks');
    while (todoCalendarList.firstChild) {
      todoCalendarList.removeChild(todoCalendarList.firstChild);
    }
    const todos = sharedProjects.getAllTodos();
    if (!todos || todos.length === 0) return;
    todos.forEach((todo) => {
      const todoDate = new Date(todo.dueDate);
      let dateText = '';
      if (isToday(todoDate)) {
        dateText = 'Today';
      } else if (isTomorrow(todoDate)) {
        dateText = 'Tomorrow';
      } else if (
        isThisWeek(todoDate) &&
        !isToday(todoDate) &&
        !isTomorrow(todoDate)
      ) {
        dateText = 'This week';
      } else {
        dateText = format(todoDate, 'dd-MMM-yyyy');
      }

      if (symbol === dateText) {
        const todoItem = createHtmlEl({
          tag: 'li',
          parent: todoCalendarList,
          textContent: todo.title,
          props: { className: 'calendar-task-item' },
        });
        todoItem.dataset.todoId = todo.id;
      }
    });
  });
}
export { renderCalendarList, renderCalendarTasks };
