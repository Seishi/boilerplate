import Task from './Task';

class TaskList {
  constructor () {
    this.tasks = [];
    this.length = 0;
  }

  add (task){
    if (typeof task === 'string') {
      this.tasks.push(new Task(task));
    } else {
      this.tasks.push(task);
    }

    this.length = this.tasks.length;
  }

  remove (task) {
    const i = this.tasks.indexOf(task);
    if (i > -1) {
      this.tasks = this.tasks.slice(0, i).concat(this.tasks.slice(i + 1));
    } else {
      throw 'Task not found.';
    }

    this.length = this.tasks.length;
  }
}

export default TaskList;
