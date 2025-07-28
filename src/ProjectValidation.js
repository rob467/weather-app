export function validateProjectTitle(
  title,
  sharedProjects,
  { excludeProjectId = null } = {}
) {
  if (title.trim() === '') {
    return 'Project title required!';
  }
  if (title.length > 19 || title.length < 3) {
    return 'Project title must be between 3 and 20 characters!';
  }
  // Check for duplicates, excluding the current project if editing
  const exists = sharedProjects
    .getAllProjects()
    .some(
      (project) =>
        project.name === title &&
        (excludeProjectId === null || project.id !== excludeProjectId)
    );
  if (exists) {
    return `${title} already exists!`;
  }
  return '';
}
