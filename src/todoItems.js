class TodoItem {
  static taskId = 0;
  constructor(title, dueDate, priority, description = '') {
    TodoItem.taskId++;
    this.id = TodoItem.taskId;
    if (
      priority &&
      !['low', 'medium', 'high'].includes(priority.toLowerCase())
    ) {
      throw new Error("Priority must be 'low', 'medium' or 'high'");
    }
    this.title = title;
    this.dueDate = new Date(dueDate);
    this.priority = priority;
    this.description = description;
  }

  editTodo(title, dueDate, priority, description) {
    (this.title = title),
      (this.dueDate = new Date(dueDate)),
      (this.priority = priority),
      (this.description = description);
  }
}

export { TodoItem };
