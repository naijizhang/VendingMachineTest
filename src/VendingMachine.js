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
    if(product.stock===0){
      return "Sold out."
    }
    if(moneyInput<product.price){
      return `Need insert $${product.price-moneyInput} to puechase`
    }
    const changes=moneyInput-product.price;
    if(!this.changeMoney(changes)){
      return 'Not enough coins to change now, please come back later'
    }
    //change money
    //stock -1
    
  }
  changeMoney(changes){
    return null;
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
