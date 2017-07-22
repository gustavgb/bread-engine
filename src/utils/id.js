class IdCounter {
  constructor(prefix) {
    this.prefix = prefix.toString() || '';
    this.counter = 0;
  }

  next() {
    const id = this.prefix + this.counter;

    this.counter++;

    return id;
  }
}

module.exports = IdCounter;
