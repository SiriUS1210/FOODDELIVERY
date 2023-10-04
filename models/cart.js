const MenuItem = require('../models/menuitems');

let cart = null;

class Cart {
  static save(product, amount) {
    if (cart === null) {
      cart = { products: [], totalprice: 0 };
      cart.products.push(product);
      cart.totalprice = Cart.getTotalPrice();
    } else {
      const existingProductIndex = Cart.getIndex(product);
      if (existingProductIndex !== -1) {
        const existingQuantity = parseInt(cart.products[existingProductIndex][2], 10);
        amount += existingQuantity;
        cart.products[existingProductIndex][2] = amount;
      } else {
        cart.products.push(product);
      }
      cart.totalprice = Cart.getTotalPrice();
    }
  }

  static getIndex(prod) {
    return cart.products.findIndex(item => item[1] === prod[1]);
  }

  static getTotalPrice() {
    return cart.products.reduce((total, item) => {
      const price = item[0].price;
      const quantity = item[2];
      return total + price * quantity;
    }, 0);
  }

  static changeQuantity(id, qty) {
    const productIndex = cart.products.findIndex(item => item[1] === id);
    if (productIndex !== -1) {
      cart.products[productIndex][2] = qty;
      cart.totalprice = Cart.getTotalPrice();
    }
  }

  static getCart() {
    return cart;
  }

  static deleteItem(id) {
    const productIndex = cart.products.findIndex(item => item[1] === id);
    if (productIndex !== -1) {
      cart.products.splice(productIndex, 1);
      cart.totalprice = Cart.getTotalPrice();
    }
  }

  static deleteAll() {
    cart = null;
  }
}

module.exports = Cart;
