class Task {
  constructor (name) {
    this.name = name;
    this.status = 'incomplete';
  }

  complete () {
    if (typeof this.parent !== 'undefined' && this.parent !== null && this.parent.status !== 'completed') {
      throw `Dependent task "${this.parent.name}" is not completed.`;
    }

    this.status = 'complete';
    return true;
  }

  dependsOn (parent) {
    this.parent = parent;
    this.parent.child = this;
    this.status = 'dependent';
  }
}

export default Task;
