import { createHtmlEl, removeAllChildren } from './AddDOMComponents.js';
import { sharedProjectsFactory } from './CreateProjects.js';
import createModal from './ModalComponent.js';
import populateLocalStorage from './LoadLocalStorage.js';
import rerenderApp from './AppRenderer.js';

const sharedProjects = sharedProjectsFactory();

const projectModal = createModal({
  id: 'project-dialog',
  formProps: { className: 'form-dialog' },
  parent: document.querySelector('.main'),
  content: [
    {
      type: 'input',
      forLabel: 'project-title',
      labelText: 'Project Title: ',
      inputProps: {
        id: 'project-title',
        name: 'project-title',
      },
      required: true,
    },
  ],
  buttons: {
    Save: (modal) => {
      const data = modal.getFormData();
      const projectTitle = document.querySelector('#project-title');
      const projExists = sharedProjects
        .getAllProjects()
        .some((project) => project.name === data['project-title']);

      if (data['project-title'].trim() === '') {
        projectTitle.setCustomValidity('Project title required!');
      } else if (projExists) {
        projectTitle.setCustomValidity(
          `${data['project-title']} already exists!`
        );
      } else if (
        data['project-title'].length > 19 ||
        data['project-title'].length < 3
      ) {
        projectTitle.setCustomValidity(
          'Project title must be between 3 and 20 characters!'
        );
      } else {
        projectTitle.setCustomValidity('');
        sharedProjects.addProject(data['project-title']);
        modal.dialog.close();
        modal.form.reset();

        // Rendering & updating task form to include new projects
        rerenderApp();
        populateLocalStorage();
      }
      projectTitle.reportValidity();
    },
    Cancel: (modal) => {
      modal.dialog.close();
      modal.form.reset();
    },
  },
});

// Updates add task form to include new project options
function updateAddTaskForm(formId) {
  const selectProject = document.querySelector(formId);
  while (selectProject.firstChild) {
    selectProject.removeChild(selectProject.firstChild);
  }
  sharedProjects
    .getAllProjects()
    .toReversed()
    .forEach((project) => {
      createHtmlEl({
        tag: 'option',
        parent: selectProject,
        props: { value: project.id },
        textContent: project.name,
      });
    });
}

function renderProjectComponent() {
  function renderProjectsList() {
    const projectSidebarList = document.querySelector('.projects-sidebar-list');
    removeAllChildren(projectSidebarList);

    const otherProject = sharedProjects.getProject('Other');

    sharedProjects
      .getAllProjects()
      .toReversed()
      .forEach((project) => {
        if (project.name === 'Other' && otherProject.getAllTodos().length === 0)
          return; // Skip the 'Other' project if empty
        const projectListElement = createHtmlEl({
          tag: 'li',
          parent: projectSidebarList,
          props: { id: `id-${project.name.replace(/[^a-zA-Z0-9]/g, '-')}-li` },
          textContent: project.name,
        });

        createHtmlEl({
          tag: 'ul',
          parent: projectListElement,
          props: {
            id: `todo-list-${project.name.replace(/[^a-zA-Z0-9]/g, '-')}`,
            className: 'project-task-lists',
          },
        });

        renderTaskList(project);
      });
  }

  function renderTaskList(project) {
    const projectListElement = document.querySelector(
      `#id-${project.name.replace(/[^a-zA-Z0-9]/g, '-')}-li`
    );
    const taskListElement = document.querySelector(
      `#todo-list-${project.name.replace(/[^a-zA-Z0-9]/g, '-')}`
    );
    removeAllChildren(taskListElement);

    project.getAllTodos().forEach((todoTask) => {
      createHtmlEl({
        tag: 'li',
        parent: taskListElement,
        textContent: todoTask.title,
      });
    });
  }
  return { renderProjectsList, renderTaskList };
}

export { renderProjectComponent, projectModal, updateAddTaskForm };
