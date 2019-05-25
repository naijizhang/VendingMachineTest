class VendingMachine {
  constructor(initialProducts, initialCoins) {
    if (initialProducts === {} || initialCoins === {}) {
      throw "Not available now";
    }
    this.products = initialProducts;
    this.coins = initialCoins;
    this.maxStockForOneProduct = 30;
    this.maxCoinCapacity = 100;
  }
  printInventory() {
    return this.products;
  }
  refillProducts() {
    this.products = this.products.map(product => ({
      ...product,
      stock: this.maxStockForOneProduct
    }));
    console.log("refilled products:", this.products);
    return this.products;
  }
  refillCoins() {
    this.coins = this.coins.map(coin => ({
      ...coin,
      quantity: this.maxCoinCapacity
    }));
    console.log("refilled coins:", this.coins);
    return this.coins;
  }

  buyOne(id, moneyInput) {
    const product = this.getProductById(id);
    if (!product) {
      return `The product ${id} is not exist`;
    }
    if (product.stock === 0) {
      return "Sold out.";
    }
    if (moneyInput < product.price) {
      return `Need insert $${product.price - moneyInput} to puechase`;
    }
    const supposedToChange = moneyInput - product.price;
    const changes = this.changeMoney(supposedToChange);
    if (!changes) {
      return "Not enough coins to change now, please come back later";
    } else {
      //stock -1
      this.reduceStockForProduct(product.id);
      console.log(`Payment success insert $${moneyInput} to buy $${product.price} ${product.name}, the changes:`, changes);
      console.log(`Payment success insert $${moneyInput} to buy $${product.price} ${product.name}, the inventory:`, this.products);
      console.log(`Payment success insert $${moneyInput} to buy $${product.price} ${product.name}, the coins in the machine:`, this.coins);
      return changes;
    }

    //change money
  }
  changeMoney(changes) {
    const finalChanges = [];
    let remain = changes;
    this.coins
      .sort((a, b) => b.value - a.value)
      .map(coin => {
        if (coin.quantity > 0 && remain >= coin.value) {
          let bestToChange = Math.floor(remain / coin.value);
          if (coin.quantity < bestToChange) {
            bestToChange = coin.quantity;
          }
          finalChanges.push({ coin: coin.name, quantity: bestToChange });
          remain -= (bestToChange * coin.value).toFixed(2);
        }
      });
    if (remain === 0) {
      let result = "Take the product and here is the changes:";
      finalChanges.map(change => {
        this.reduceCoinQuantity(change.coin, change.quantity);
        result += change.quantity + "-" + change.coin + " ";
      });
      return result;
    } else {
      return null;
    }
  }
  reduceStockForProduct(id) {
    this.products.map(item => {
      if (item.id === id) {
        item.stock--;
      }
    });
  }
  reduceCoinQuantity(name, quantity) {
    this.coins.map(coin => {
      if (coin.name === name) {
        coin.quantity -= quantity;
      }
    });
  }
  getInventoryById() {}
  getProductById(id) {
    const product = this.products.filter(item => item.id === id);
    if (product.length === 0) {
      return null;
    } else return product[0];
  }
}
module.exports = VendingMachine;
