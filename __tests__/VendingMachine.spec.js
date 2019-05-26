const VendingMachine = require("../src/VendingMachine");
describe("VendingMachine", () => {
  let test;
  beforeEach(() => {
    test = {};
    test.data = require("../src/data");
    test.initialProducts = {};
    test.initialCoins = {};
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
    describe("buy product 2 (stock 0), return sold out", () => {
      beforeEach(() => {
        test.result = test.subject.buyOne(2, 2);
      });
      it("return sold out", () => {
        expect(test.result).toEqual("Sold out.");
      });
    });
    describe("buy product 1 insert $20, but the machine doesn't have enough coins to change", () => {
      beforeEach(() => {
        test.result = test.subject.buyOne(1, 20);
      });
      it("return there is not enough coins to change", () => {
        expect(test.result).toEqual(
          "Not enough coins to change now, please come back later"
        );
      });
    });
    describe("buy product 1 insert $2.25, but there is not enough Quarters", () => {
      beforeEach(() => {
        test.result = test.subject.buyOne(1, 2.25);
      });
      it("return other coins as changes", () => {
        expect(test.result).toEqual(
          "Take the product and here is the changes:1-Quarter 3-Dime 4-Nickel "
        );
      });
    });
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
    describe("buy product 10(not exist) insert $5", () => {
      beforeEach(() => {
        test.result = test.subject.buyOne(10, 5);
      });
      it("return product not exist when get invalid input", () => {
        expect(test.result).toEqual("The product 10 is not exist");
      });
    });
    describe("buy product 1 insert $1 (not enough to buy)", () => {
      beforeEach(() => {
        test.result = test.subject.buyOne(1, 1);
      });
      it("need insert $0.5 to continue purchase", () => {
        expect(test.result).toEqual("Need insert $0.5 to puechase");
      });
    });
    describe("buy one product, success. And get the changes", () => {
      beforeEach(() => {
        test.result = test.subject.buyOne(1, 2.25);
      });
      it("buy product 1 insert $2.25, changes: 3-Quarter", () => {
        expect(test.result).toEqual(
          "Take the product and here is the changes:3-Quarter "
        );
      });
    });
    describe("Continue purchase products situation until sold out or no coins in machine", () => {
      it("buy product 1 insert $5, changes: 1-Loonie 1-Toonie 2-Quarter", () => {
        expect(test.subject.buyOne(1, 5)).toEqual(
          "Take the product and here is the changes:1-Loonie 1-Toonie 2-Quarter "
        );
      });
      it("buy product 1 insert $10, changes: 4-Loonie 2-Quarter", () => {
        expect(test.subject.buyOne(1, 10)).toEqual(
          "Take the product and here is the changes:4-Loonie 2-Quarter "
        );
      });
      it("buy product 1 should return Sold out", () => {
        expect(test.subject.buyOne(1, 20)).toEqual(
          "Sold out."
        );
      });
      it("buy product 3 insert $3.34, changes:1-Loonie 2-Penny", () => {
        expect(test.subject.buyOne(3, 3.34)).toEqual(
          "Take the product and here is the changes:1-Loonie 2-Penny "
        );
      });
      it("buy product 3 insert $10, changes:4-Loonie 2-Quarter 1-Dime 1-Nickel 3-Penny ", () => {
        expect(test.subject.buyOne(3, 10)).toEqual(
          "Take the product and here is the changes:4-Loonie 2-Quarter 1-Dime 1-Nickel 3-Penny "
        );
      });
       it("buy product 3 insert $1.32, no change", () => {
        expect(test.subject.buyOne(3, 1.32)).toEqual(
          "Perfect! Here is the product."
        );
      });
    });
  });
});
