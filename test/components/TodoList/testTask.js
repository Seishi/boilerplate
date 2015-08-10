import chai from 'chai';
import Task from '../../../src/components/TodoList/Task';

chai.should();

describe('Task instance', function () {
  let task1 = null, task2 = new Task('dry dishes');

  beforeEach(function () {
    task1 = new Task('wash dishes');
  });

  it('should have a name', function () {
    task1.name.should.equal('wash dishes');
  });

  it('should be initially incomplete', function () {
    task1.status.should.equal('incomplete');
  });

  it('should be able to be completed', function () {
    task1.complete();
    task1.status.should.equal('complete');
  });

  it('should be able to be dependent on another task', function () {
    task2.dependsOn(task1);

    task2.status.should.equal('dependent');
    task2.parent.should.equal(task1);
    task1.child.should.equal(task2);

    (function () {
      task2.complete();
    }).should.throw('Dependent task "wash dishes" is not completed.');
  });
});
