import { sharedProjectsFactory } from './CreateProjects.js';
import { serialize } from './LocalStorage.js';
import rerenderApp from './AppRenderer.js';

const sharedProjects = sharedProjectsFactory();

function populateLocalStorage() {
  if (sharedProjects.getAllProjects().length === 0) {
    sharedProjects.addProject('Other');
    rerenderApp();
  }
  localStorage.setItem('projects', serialize(sharedProjects));
}

export default populateLocalStorage;
