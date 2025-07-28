import { createHtmlEl } from './AddDOMComponents.js';
import { projectModal } from './ProjectsComponent.js';
import { taskComponent } from './AddTaskComponent.js';
import TaskModal from './TaskModal.js';
import rerenderApp from './AppRenderer.js';
import { renderCalendarList, renderCalendarTasks } from './CalendarComponent.js';
import { sharedProjectsFactory } from './CreateProjects.js';
import populateLocalStorage from './LoadLocalStorage.js';

const sharedProjects = sharedProjectsFactory();

const addTaskModal = TaskModal({
  mode: 'add',
  onSave: (data, modal) => {
    const prefix = 'add-';

    // Get form elements
    const taskTitle = modal.form.querySelector(`#${prefix}task-title`);
    const taskDate = modal.form.querySelector(`#${prefix}task-date`);
    const projectSelect = modal.form.querySelector(`#${prefix}project-select`);
    const radios = modal.form.querySelectorAll(
      `input[name="${prefix}priority"]`
    );

    // Reset custom validity messages
    taskTitle.addEventListener('input', () => {
      taskTitle.setCustomValidity('');
    });
    taskDate.addEventListener('input', () => {
      taskDate.setCustomValidity('');
    });
    radios.forEach((radio) => {
      radio.addEventListener('input', () => {
        radio.setCustomValidity('');
      });
    });
    projectSelect.addEventListener('input', () => {
      projectSelect.setCustomValidity('');
    });

    if (data['task-title'].trim() === '') {
      taskTitle.setCustomValidity('Task title required!');
      console.log('Task title is empty');
      taskTitle.reportValidity();
    } else if (data['task-date'].trim() === '') {
      taskDate.setCustomValidity('Task date required!');
    } else if (!data[`${prefix}priority`]) {
      radios.forEach((radio) => {
        radio.setCustomValidity('Task priority required!');
      });
      radios[0].reportValidity();
      return;
    } else if (projectSelect.value === '') {
      projectSelect.setCustomValidity('Project selection required!');
    } else {
      sharedProjects
        .getProjectById(parseInt(data.project))
        .addTodo(
          data['task-title'],
          data['task-date'],
          data[`${prefix}priority`],
          data['task-description']
        );
      modal.dialog.close();
      modal.form.reset();
      document.querySelector(`#${prefix}task-date`).valueAsDate = new Date();

      rerenderApp();
      populateLocalStorage();

      // Reset form validation messages
      taskTitle.setCustomValidity('');
      taskDate.setCustomValidity('');
      const radios = document.querySelectorAll('input[name="priority"]');
      radios.forEach((radio) => {
        radio.setCustomValidity('');
      });
      projectSelect.setCustomValidity('');
    }

    taskTitle.reportValidity();
    taskDate.reportValidity();
    projectSelect.reportValidity();
  },
  onCancel: (modal) => {
    modal.dialog.close();
  },
});

function createInitialSidebarElements() {
  const sidebarDiv = document.querySelector('.sidebar');

  const addTaskBtn = createHtmlEl({
    tag: 'button',
    parent: sidebarDiv,
    props: {
      id: 'add-task-btn',
      className: 'sidebar-btn',
      'aria-label': 'Add Task',
      title: 'Add Task',
    },
    textContent: 'Add Task',
  });

  addTaskBtn.onclick = () => {
    addTaskModal.open();
  };

  renderCalendarList();
  renderCalendarTasks();

  const projectHeadingDiv = createHtmlEl({
    tag: 'div',
    parent: sidebarDiv,
    props: { className: 'projects-heading-container' },
  });

  createHtmlEl({
    tag: 'h2',
    parent: projectHeadingDiv,
    textContent: 'Projects',
  });

  const addProjectBtn = createHtmlEl({
    tag: 'button',
    parent: projectHeadingDiv,
    props: {
      id: 'add-project-btn',
      type: 'submit',
      className: 'sidebar-btn add-project-btn',
      'aria-label': 'Add Project',
      title: 'Add Project',
    },
    textContent: '+',
  });

  addProjectBtn.onclick = () => projectModal.open();

  const projectListsDiv = createHtmlEl({
    tag: 'div',
    parent: sidebarDiv,
    props: { className: 'projects-sidebar-list-container' },
  });

  createHtmlEl({
    tag: 'ul',
    parent: projectListsDiv,
    props: { className: 'projects-sidebar-list' },
  });
}

function getInitialSidebarElements() {
  const addTaskBtn = document.querySelector('#add-task-btn');

  return { addTaskBtn };
}
function renderSidebar() {
  createInitialSidebarElements();
  taskComponent();
}

export { renderSidebar, getInitialSidebarElements };
