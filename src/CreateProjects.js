import { TodoItem } from './todoItems.js';
import { revive } from './LocalStorage.js';

class Project {
  static projectId = 0;
  constructor(name) {
    Project.projectId++;
    this.id = Project.projectId;
    this.name = name;
    this.todoList = [];
  }

  addTodo(title, dueDate, priority, description = '') {
    let todoItem = new TodoItem(title, dueDate, priority, description);
    this.todoList.push(todoItem);
  }

  removeTodo(id) {
    this.todoList = this.todoList.filter((todo) => todo.id !== id);
  }

  removeTodoByIndex(index) {
    if (index >= 0 && index < this.todoList.length) {
      this.todoList.splice(index, 1);
    }
  }

  getTodo(id) {
    return this.todoList.find((todo) => todo.id === id);
  }

  getAllTodos() {
    return this.todoList || [];
  }
}

const sharedProjectsFactory = (() => {
  let instance = null;
  return () => {
    if (!instance) {
      let projectsValue;
      if (localStorage.length > 0) {
        const parsed = JSON.parse(localStorage.getItem('projects'), revive);
        console.log(localStorage.getItem('projects'));
        projectsValue = parsed && parsed.projects ? parsed.projects : [];
        if (projectsValue.length > 0) {
          Project.projectId = Math.max(
            ...projectsValue.map((project) => project.id)
          );
        } else {
          Project.projectId = 0;
        }
      } else {
        projectsValue = [new Project('Other')];
      }
      instance = {
        projects: projectsValue,

        addProject(title) {
          const newProject = new Project(title);
          this.projects.push(newProject);
        },

        editProject(oldName, newName) {
          const project = this.getProject(oldName);
          if (project) {
            project.name = newName;
          }
        },

        removeProject(name) {
          this.projects = this.projects.filter(
            (project) => project.name !== name
          );
        },

        removeProjectById(id) {
          this.projects = this.projects.filter((project) => project.id !== id);
        },

        getProject(name) {
          return this.projects.find((project) => project.name === name);
        },

        getProjectById(id) {
          return this.projects.find((project) => project.id === id);
        },

        getAllProjects() {
          return this.projects || [];
        },

        getProjectByChildTask(taskId) {
          return this.projects.find((project) => project.getTodo(taskId));
        },

        getAllTodos() {
          return (
            this.projects.flatMap((project) => project.getAllTodos()) || []
          );
        },
      };
    }
    return instance;
  };
})();

export { Project, sharedProjectsFactory };
