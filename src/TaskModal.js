import createModal from './ModalComponent.js';
import { sharedProjectsFactory } from './CreateProjects.js';

const sharedProjects = sharedProjectsFactory();

function TaskModal({
  mode = 'add',
  taskData = {},
  onSave,
  onDelete,
  onCancel,
}) {
  const projectOptions = sharedProjects
    .getAllProjects()
    .toReversed()
    .map((project) => ({
      label: project.name,
      value: project.id,
    }));

  const prefix = mode === 'edit' ? 'edit-' : 'add-';

  const content = [
    {
      type: 'input',
      forLabel: `${prefix}task-title`,
      labelText: 'Task: ',
      inputProps: {
        id: `${prefix}task-title`,
        name: 'task-title',
        value: taskData.title || '',
      },
      required: true,
    },
    {
      type: 'input',
      forLabel: `${prefix}task-date`,
      labelText: 'Due date: ',
      inputType: 'date',
      dateDefault: new Date(),
      inputProps: {
        id: `${prefix}task-date`,
        name: 'task-date',
        value: taskData.date || '',
      },
      required: true,
    },
    {
      type: 'radio-group',
      name: `${prefix}priority`,
      labelText: 'Priority: ',
      options: [
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' },
      ],
      required: true,
      reverseOrder: true,
      selected: taskData.priority || '',
    },
    {
      type: 'select',
      labelText: 'Project: ',
      props: { name: 'project', id: `${prefix}project-select` },
      options: projectOptions,
      selected: taskData.project || '',
    },
    {
      type: 'textarea',
      textareaLabel: 'Description: ',
      props: {
        id: `${prefix}task-description`,
        name: 'task-description',
        rows: 3,
        cols: 17,
        value: taskData.description || '',
      },
    },
    {
      type: 'input',
      inputType: 'hidden',
      inputProps: {
        id: `${prefix}task-id`,
        name: 'task-id',
        value: taskData.id || '',
      },
      required: mode === 'edit',
    },
  ];

  const buttons = {
    Save: (modal) => {
      const data = modal.getFormData();
      if (modal.form.checkValidity()) {
        onSave?.(data, modal);
      } else {
        modal.form.reportValidity();
      }
    },
    Cancel: (modal) => {
      onCancel?.(modal);
    },
  };

  if (mode === 'edit') {
    buttons.delete = (modal) => {
      const data = modal.getFormData();
      onDelete?.(data, modal);
    };
  }

  const modalInstance = createModal({
    id: mode === 'edit' ? 'edit-task-dialog' : 'add-task-dialog',
    className: mode === 'edit' ? 'edit-task-dialog' : 'add-task-dialog',
    parent: document.querySelector('.main'),
    formProps: { className: 'form-dialog' },
    content,
    buttons,
  });

  modalInstance.prefill = function (taskData) {
    if (!taskData) return;
    this.form.querySelector(`#${prefix}task-title`).value =
      taskData.title || '';
    this.form.querySelector(`#${prefix}task-date`).value = taskData.dueDate
      ? new Date(taskData.dueDate).toISOString().slice(0, 10)
      : '';
    this.form.querySelector(`#${prefix}task-description`).value =
      taskData.description || '';
    this.form.querySelector(`#${prefix}task-id`).value = taskData.id || '';
    this.form.querySelector(`#${prefix}project-select`).value =
      taskData.project || '';
    const priorityRadios = this.form.querySelectorAll(
      `input[name="${prefix}priority"]`
    );
    priorityRadios.forEach((radio) => {
      if (radio.value === taskData.priority) {
        radio.checked = true;
      } else {
        radio.checked = false;
      }
    });
  };

  return {
    ...modalInstance,
    form: modalInstance.form,
  };
}

export default TaskModal;
