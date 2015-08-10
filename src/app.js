import TaskList from './components/TodoList/TaskList';

import './base.styl';

/* istanbul ignore if*/
if (module.hot) {
  module.hot.accept();
}

let taskList = new TaskList();

taskList.add('wash dishes');

if (__DEV__) {
  console.log(taskList);
}
