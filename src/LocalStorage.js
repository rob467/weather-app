import { TodoItem } from './todoItems.js';
import { Project } from './CreateProjects.js';

function serialize(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (value instanceof Date) {
      return { __type: 'Date', value: value.toISOString() };
    }
    if (value instanceof TodoItem) return { ...value, __type: 'TodoItem' };
    if (value instanceof Project) return { ...value, __type: 'Project' };
    return value;
  });
}

function revive(key, value) {
  const classMap = { TodoItem, Project };

  if (value && value.__type === 'Date') {
    return new Date(value.value);
  }
  if (value && value.__type && classMap[value.__type]) {
    const revived = Object.assign(new classMap[value.__type](), value);
    return revived;
  }
  return value;
}

export { serialize, revive };
