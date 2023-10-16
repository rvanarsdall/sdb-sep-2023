class Player {
  data = [];
  name = "";
  age = 0;
  constructor() {
    this.create({ name: "John", age: 20 });
  }

  create({ name, age }) {
    this.data.push({ name, age });
  }

  read() {}

  save(data) {}

  delete(id) {}

  update(id) {}
}

let player = new Player();
player.create({ name: "rob", age: 25 });
console.log(player.data);

module.exports = new Player();
