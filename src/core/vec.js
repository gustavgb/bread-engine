class Vec {
  constructor(x, y, z, w) {
    if (arguments.length === 4) {
      if (typeof x !== 'number' || typeof y !== 'number' ||
          typeof z !== 'number' || typeof w !== 'number') {
        console.error(`Vector recieved non-number parameters: ${x}, ${y}, ${z}, ${w}`);
      }
    
      this.x = x;
      this.y = y;
      this.z = z;
      this.w = w;
      this.size = 4;
    } else if (arguments.length === 2) {
      if (typeof x !== 'number' || typeof y !== 'number') {
        console.error(`Vec2 recieved non-number parameters: ${x}, ${y}`);
      }
      
      this.x = x;
      this.y = y;
      this.size = 2;
    } else {
      console.error('Vector recieved invalid number of parameters');
    }
  }
  
  get length() {
    const z = this.z || 0;
    const w = this.w || 0;

    const x = z - this.x;
    const y = w - this.y;

    return Math.sqrt(x*x + y*y);
  }

  toVector() {
    if (this.size === 4) {
      const x = this.z - this.x;
      const y = this.w - this.y;
      return new Vec(x, y);
    } else {
      return this;
    }
  }
}

module.exports = Vec;