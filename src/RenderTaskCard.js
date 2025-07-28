import { formatCloseDates } from './DateUtils.js';
import { createHtmlEl, createHtmlLabelInput } from './AddDOMComponents.js';
import populateLocalStorage from './LoadLocalStorage.js';
import rerenderApp from './AppRenderer.js';

export function renderTaskTitleBlock(task, project, parentDiv, className) {
  const taskDiv = createHtmlEl({
    tag: 'div',
    parent: parentDiv,
    props: {
      className: `${className}`,
      id: `container-task-${task.id}`,
    },
  });

  const taskCheckbox = createHtmlLabelInput({
    parent: taskDiv,
    createDiv: true,
    inputProps: {
      id: `check-${task.id}`,
    },
    inputType: 'checkbox',
    reverseInputOrder: true,
  });

  taskCheckbox.onclick = () => {
    project.removeTodo(task.id);
    taskDiv.remove();
    if (parentDiv.querySelector('.expanded-task-description')) {
      parentDiv.querySelector('.expanded-task-description').remove();
    }

    rerenderApp();
    populateLocalStorage();
  };

  const taskInfoDiv = document.createElement('div');
  taskInfoDiv.className = 'task-item';
  createHtmlEl({
    tag: 'h5',
    parent: taskInfoDiv,
    props: { className: 'main-task-text-title' },
    textContent: ` ${task.title}`,
  });

  createHtmlEl({
    tag: 'h5',
    parent: taskInfoDiv,
    props: { className: 'main-task-text-title task-date' },
    textContent: formatCloseDates(task.dueDate),
  });
  taskDiv.appendChild(taskInfoDiv);

  return taskInfoDiv;
}
