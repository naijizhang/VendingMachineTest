const VendingMachine = require("../src/VendingMachine");
describe("VendingMachine", () => {
  let test;
  beforeEach(() => {
    test = {};
    test.initialProducts = {};
    test.initialCoins = {};
  });

  describe("products and changes enough in vending machine", () => {
    beforeEach(() => {
      test.initialProducts = require("../inputs/initialProducts");
      test.initialCoins = require("../inputs/initialCoins");
      test.subject = new VendingMachine(
        test.initialProducts.products,
        test.initialCoins.coins
      );
    });
    describe("refill all products", () => {
      beforeEach(() => {
        test.refilledProducts = require("../inputs/refilledProducts");
        test.result = test.subject.refillProducts();
      });
      it("should refill all the refilled products", () => {
        expect(test.result).toEqual(test.refilledProducts.products);
      });
    });
    describe("refill all coins", () => {
      beforeEach(() => {
        test.refilledCoins = require("../inputs/refilledCoins");
        test.result = test.subject.refillCoins();
      });
      it("should refill all the refilled coins", () => {
        expect(test.result).toEqual(test.refilledCoins.coins);
      });
    });
  });

  describe("products or changes are not enough in vending machine", () => {
    beforeEach(() => {
      test.subject = new VendingMachine({}, {});
    });

    // it("will return error 'not available'", () => {
    //   expect(test.subject).toThrow("Not available now");
    // });
  });
});
