class VendingMachine {
  constructor(initialProducts, initialCoins) {
    if(initialProducts==={}||initialCoins==={}){
        throw "Not available now"
    }
    this.products = initialProducts;
    this.coins = initialCoins;
    this.maxStockForOneProduct = 30;
    this.maxCoinCapacity = 200;
  }
 
  getMaxCoinCapacity() {}

  refillProducts() {
    this.products=this.products.map(product => ({
      ...product,
      stock: this.maxStockForOneProduct
    }));
    console.log("refilled products:",this.products)
    return this.products;
  }
  refillCoins() {

  }

  buyOne(id, moneyInput) {}
  getAllInventories() {}
  getInventoriesById() {}
  getProductById() {}
}
module.exports = VendingMachine;
