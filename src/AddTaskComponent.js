import { renderProjectComponent } from './ProjectsComponent.js';
import { renderMainProjectComponent } from './MainProjectViewComponent.js';
import { getInitialSidebarElements } from './RenderSidebarComponent.js';

function taskComponent() {
  // Get initial elements and render project components
  getInitialSidebarElements();
  renderProjectComponent().renderProjectsList();
  renderMainProjectComponent().getProjectCards();
}

export { taskComponent };
