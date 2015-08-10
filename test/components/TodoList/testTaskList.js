import chai from 'chai';
import Task from '../../../src/components/TodoList/Task';
import TaskList from '../../../src/components/TodoList/TaskList';

chai.should();

describe('TaskList instance', function () {
  let taskList = null;

  beforeEach(function () {
    taskList = new TaskList();
  });

  it('should begin with no tasks', function () {
    taskList.tasks.length.should.equal(0);
    taskList.length.should.equal(0);
  });

  it('should accept new tasks as tasks and should remove it', function () {
    const task1 = new Task('buy milk');
    const task2 = new Task('buy bread');

    // Add a task
    taskList.add(task1);
    taskList.tasks[0].name.should.equal('buy milk');
    taskList.length.should.equal(1);

    // Try to remove non-exist task
    (function () {
      taskList.remove(task2);
    }).should.throw('Task not found.');

    // Remove it
    taskList.remove(taskList.tasks[0]);
    taskList.length.should.equal(0);

    // Try to remove task from an empty task list
    (function () {
      taskList.remove(task1);
    }).should.throw('Task not found.');
  });

  it('should accept new tasks as string', function () {
    taskList.add('take out garbage');
    taskList.tasks[0].name.should.equal('take out garbage');
    taskList.length.should.equal(1);
  });
});
