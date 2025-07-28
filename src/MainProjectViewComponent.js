import { sharedProjectsFactory } from './CreateProjects.js';
import { createHtmlEl, createHtmlLabelInput } from './AddDOMComponents.js';
import TaskModal from './TaskModal.js';
import populateLocalStorage from './LoadLocalStorage.js';
import { openExpandedProjectModal } from './ExpandedProjectView.js';
import { renderTaskTitleBlock } from './RenderTaskCard.js';
import rerenderApp from './AppRenderer.js';

import maxBtn from './svgs/maximize-solid.svg';

const sharedProjects = sharedProjectsFactory();

const editTaskModal = TaskModal({
  mode: 'edit',
  onSave: (data, modal) => {
    const prefix = 'edit-';

    // Get form elements
    const taskTitle = modal.form.querySelector(`#${prefix}task-title`);
    const taskDate = modal.form.querySelector(`#${prefix}task-date`);
    const projectSelect = modal.form.querySelector(`#${prefix}project-select`);
    const radios = modal.form.querySelectorAll(
      `input[name="${prefix}priority"]`
    );

    const oldProject = sharedProjects.getProjectByChildTask(
      parseInt(data['task-id'])
    );
    const newProject = sharedProjects.getProjectById(parseInt(data.project));
    const currentTask = oldProject.getTodo(parseInt(data['task-id']));

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

    // Validation
    if (data['task-title'].trim() === '') {
      taskTitle.setCustomValidity('Task title required!');
      taskTitle.reportValidity();
      return;
    }
    if (data['task-date'].trim() === '') {
      taskDate.setCustomValidity('Task date required!');
      taskDate.reportValidity();
      return;
    }
    if (!data[`${prefix}priority`]) {
      radios.forEach((radio) =>
        radio.setCustomValidity('Task priority required!')
      );
      radios[0].reportValidity();
      return;
    }
    if (projectSelect.value === '') {
      projectSelect.setCustomValidity('Project selection required!');
      projectSelect.reportValidity();
      return;
    }

    if (oldProject.id !== newProject.id) {
      // If the project has changed, remove the task from the old project and add it to the new project
      oldProject.removeTodo(currentTask.id);
      newProject.addTodo(
        data['task-title'],
        data['task-date'],
        data[`${prefix}priority`],
        data['task-description'],
        currentTask.id // Preserve the task ID
      );
    } else {
      currentTask.editTodo(
        data['task-title'],
        data['task-date'],
        data[`${prefix}priority`],
        data['task-description']
      );
    }
    modal.dialog.close();
    modal.form.reset();
    taskDate.valueAsDate = new Date();

    rerenderApp();
    populateLocalStorage();

    // Reset form validation messages
    taskTitle.setCustomValidity('');
    taskDate.setCustomValidity('');
    radios.forEach((radio) => {
      radio.setCustomValidity('');
    });
    projectSelect.setCustomValidity('');

    taskTitle.reportValidity();
    taskDate.reportValidity();
    projectSelect.reportValidity();
  },
  onCancel: (modal) => {
    modal.dialog.close();
  },

  onDelete: (data, modal) => {
    sharedProjects
      .getProjectById(parseInt(data.project))
      .removeTodo(parseInt(data['task-id']));
    modal.dialog.close();
    modal.form.reset();
    rerenderApp();
    populateLocalStorage();
  },
});

function renderMainProjectComponent() {
  const mainDiv = document.querySelector('.main');

  let mainProjectsDiv;

  if (
    !document.body.contains(document.querySelector('.main-projects-container'))
  ) {
    mainProjectsDiv = createHtmlEl({
      tag: 'div',
      parent: mainDiv,
      props: { className: 'main-projects-container' },
    });
    mainProjectsDiv;
  } else {
    mainProjectsDiv = document.querySelector('.main-projects-container');
    mainProjectsDiv;
  };


  function renderTaskDetails(task, project) {
    const projectDiv = document.querySelector(`#card-${project.id}`);

    const taskHeading = renderTaskTitleBlock(
      task,
      project,
      projectDiv,
      'task-heading'
    );

    taskHeading.onclick = () => {
      const taskData = {
        title: task.title,
        dueDate: task.dueDate,
        priority: task.priority,
        description: task.description,
        id: task.id,
        project: project.id,
      };

      editTaskModal.prefill(taskData);
      editTaskModal.open();
    };
  }

  function getProjectCards() {
    while (mainProjectsDiv.firstChild) {
      mainProjectsDiv.removeChild(mainProjectsDiv.firstChild);
    }

    function createProjectCard(project) {
      const projectCardDiv = createHtmlEl({
        tag: 'div',
        parent: mainProjectsDiv,
        props: {
          className: 'project-card',
          id: `card-${project.id}`,
        },
      });

      const projectCardHeadingDiv = createHtmlEl({
        tag: 'div',
        parent: projectCardDiv,
        props: { className: 'project-heading' },
      });

      createHtmlEl({
        tag: 'h3',
        parent: projectCardHeadingDiv,
        textContent: project.name,
      });

      const expandProjectBtn = createHtmlEl({
        tag: 'img',
        parent: projectCardHeadingDiv,
        props: { src: maxBtn, className: 'logo-svg' },
      });
      expandProjectBtn.onclick = () => {
        openExpandedProjectModal(project.id);
      };
      let sortedByDateProjects = project
        .getAllTodos()
        .sort((a, b) => a.dueDate - b.dueDate);

      sortedByDateProjects.forEach((task) => renderTaskDetails(task, project));
    }

    const otherProjects = sharedProjects.getProject('Other');

    sharedProjects
      .getAllProjects()
      .toReversed()
      .forEach((project) => {
        if (
          project.name === 'Other' &&
          otherProjects.getAllTodos().length === 0
        )
          return; // Skip the 'Other' project if empty
        createProjectCard(project);
      });
  }
  return { getProjectCards, renderTaskDetails };
}

export { renderMainProjectComponent };
