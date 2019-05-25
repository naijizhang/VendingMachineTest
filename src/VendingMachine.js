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
