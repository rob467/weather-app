import { renderMainProjectComponent } from './MainProjectViewComponent.js';
import {
  renderProjectComponent,
  updateAddTaskForm,
} from './ProjectsComponent.js';
import { renderCalendarTasks } from './CalendarComponent.js';

export default function rerenderApp() {
  renderCalendarTasks();
  renderMainProjectComponent().getProjectCards();
  renderProjectComponent().renderProjectsList();
  ['#add-project-select', '#edit-project-select'].forEach(selector => {
    if (document.querySelector(selector)) {
      updateAddTaskForm(selector);
    }
  });
}
