const VendingMachine = require("../src/VendingMachine");
describe("VendingMachine", () => {
  let test;
  beforeEach(() => {
    test = {};
    test.data = require("../src/data");
    test.initialProducts = {};
    test.initialCoins = {};
  });

  describe("products and changes enough in vending machine", () => {
    beforeEach(() => {
      test.initialProducts = test.data.initialProducts;
      test.initialCoins = test.data.initialCoins;
      test.subject = new VendingMachine(
        test.initialProducts,
        test.initialCoins
      );
    });
    describe("Print vending machine inventory", () => {
      beforeEach(() => {
        test.result = test.subject.printInventory();
      });
      it("should return all the product stock", () => {
        expect(test.result).toEqual(test.initialProducts);
      });
    });
    describe("refill all products", () => {
      beforeEach(() => {
        test.refilledProducts = test.data.refilledProducts;
        test.result = test.subject.refillProducts();
      });
      it("should refill all the refilled products", () => {
        expect(test.result).toEqual(test.data.refilledProducts);
      });
    });
    describe("refill all coins", () => {
      beforeEach(() => {
        test.refilledCoins = test.data.refilledCoins;
        test.result = test.subject.refillCoins();
      });
      it("should refill all the refilled coins", () => {
        expect(test.result).toEqual(test.data.refilledCoins);
      });
    });
    describe("buy one product, when id not exist", () => {
      beforeEach(() => {
        test.result = test.subject.buyOne(10, 5);
      });
      it("should product not exist", () => {
        expect(test.result).toEqual("The product 10 is not exist");
      });
    });
    describe("buy one product, when money input is not enough to buy", () => {
      beforeEach(() => {
        test.result = test.subject.buyOne(1, 1);
      });
      it("should return need more cash input", () => {
        expect(test.result).toEqual("Need insert $0.5 to puechase");
      });
    });
    describe("buy one product, success. And get the changes", () => {
      beforeEach(() => {
        test.result = test.subject.buyOne(1, 2);
      });
      it("should return the changes", () => {
        expect(test.result).toEqual(
          "Take the product and here is the changes:2-Quarter "
        );
      });
    });
  });

  describe("products or changes are not enough in vending machine", () => {
    beforeEach(() => {
      test.initialProducts = test.data.initialProducts;
      test.initialCoins = test.data.notEnoughCoins;
      test.subject = new VendingMachine(
        test.initialProducts,
        test.initialCoins
      );
    });

    describe("buy one product, when the product stock is 0", () => {
      beforeEach(() => {
        test.result = test.subject.buyOne(2, 2);
      });
      it("should return sold out", () => {
        expect(test.result).toEqual("Sold out.");
      });
    });
    describe("buy one product, but the machine doesn't have enough coins to change", () => {
      beforeEach(() => {
        test.result = test.subject.buyOne(1, 2);
      });
      it("should return there is not enough coins to change", () => {
        expect(test.result).toEqual(
          "Not enough coins to change now, please come back later"
        );
      });
    });
  });
});
