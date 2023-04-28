class User {
  constructor(username, password, id = null) {
    this.id = id ? id : ++counter;
    this.username = username;
    this.password = password;
    this.shoppingCart = [];
  }

  save() {
    dbUsers.push(this);

    return this;
  }

  addProduct(product, quantity) {
    const productExists = this.shoppingCart.find((p) => p.id == product.id);
    if (productExists === undefined)
      this.shoppingCart.push({
        ...product,
        quantity: 1,
      });
    else {
      // make sure quantity don't exceed the quantity in stock
      let q = productExists.quantity + 1;
      if (quantity !== undefined) q = quantity;
      if (q <= product.quantity) productExists.quantity = q;
    }

    return this.shoppingCart;
  }

  resetShoppingCart() {
    this.shoppingCart = [];

    return this.shoppingCart;
  }

  removeProduct(productId) {
    const index = this.shoppingCart.findIndex((p) => p.id == productId);
    const product = this.shoppingCart[index];
    product.quantity -= 1;
    if (product.quantity <= 0) {
      this.shoppingCart.splice(index, 1);
    }

    return this.shoppingCart;
  }

  edit() {
    const index = dbUsers.findIndex((user) => user.id === this.id);

    if (index === -1) throw "User doisn't exist!";

    dbUsers.splice(index, 1, this);

    return this;
  }

  static findUserById(id) {
    const user = dbUsers.find((user) => user.id == id);

    if (user === undefined) throw "User doisn't exist!";

    return user;
  }

  static findUserByUsername(username) {
    const user = dbUsers.find((user) => user.username == username);

    if (user === undefined) throw "Username doisn't exist!";

    return user;
  }

  static getAll() {
    return dbUsers;
  }

  static deleteUser(id) {
    const index = dbUsers.findIndex((user) => user.id == id);

    if (index === -1) throw "User doisn't exist!";

    const user = dbUsers[user];

    dbUsers.splice(index, 1);

    return user;
  }
}

let counter = 0;
let dbUsers = [new User("bagumabrian", 1111), new User("john", 2222), new User("brian", 2222), , new User("baala", 2222)];

module.exports = User;
