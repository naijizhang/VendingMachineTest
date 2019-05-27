const VendingMachine = require("../src/VendingMachine");
describe("VendingMachine", () => {
  let test;
  beforeEach(() => {
    test = {};
    test.data = require("../src/data");
    test.initialProducts = {};
    test.initialCoins = {};
  });
  describe("When products or changes are not enough in vending machine", () => {
    beforeEach(() => {
      test.initialProducts = test.data.initialProducts;
      test.initialCoins = test.data.notEnoughCoins;
      test.subject = new VendingMachine(
        test.initialProducts,
        test.initialCoins
      );
    });
    describe("When buying a product that is out of stock", () => {
      beforeEach(() => {
        test.result = test.subject.buyOne(2, 2);
      });
      it("return sold out", () => {
        expect(test.result).toEqual("Sold out.");
      });
    });
    describe("When buying a product you insert $20, but the machine doesn't have enough coins to return", () => {
      beforeEach(() => {
        test.result = test.subject.buyOne(1, 20);
      });
      it("return there is not enough coins to change", () => {
        expect(test.result).toEqual(
          "Not enough coins to change now, please come back later"
        );
      });
    });
    describe("When buying a product(id:1,price:1.5) user inserts $2.25, but there is not enough quarters", () => {
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
  describe("When products and money are enough in vending machine", () => {
    beforeEach(() => {
      test.initialProducts = test.data.initialProducts;
      test.initialCoins = test.data.initialCoins;
      test.subject = new VendingMachine(
        test.initialProducts,
        test.initialCoins
      );
    });
    describe("When printing vending machine inventory", () => {
      beforeEach(() => {
        test.result = test.subject.printInventory();
      });
      it("should return all the product stock", () => {
        expect(test.result).toEqual(test.initialProducts);
      });
    });
    describe("When refilling all products in vending machine", () => {
      beforeEach(() => {
        test.refilledProducts = test.data.refilledProducts;
        test.result = test.subject.refillProducts();
      });
      it("should return a list of the refilled product", () => {
        expect(test.result).toEqual(test.data.refilledProducts);
      });
    });
    describe("refill all coins", () => {
      beforeEach(() => {
        test.refilledCoins = test.data.refilledCoins;
        test.result = test.subject.refillCoins();
      });
      it("should return a list of the refilled coins", () => {
        expect(test.result).toEqual(test.data.refilledCoins);
      });
    });
    describe("When buying a product that does not exist (id:10)", () => {
      beforeEach(() => {
        test.result = test.subject.buyOne(10, 5);
      });
      it("should return a message that says, product does not exist", () => {
        expect(test.result).toEqual("The product 10 is not exist");
      });
    });
    describe("When buying product (id:1 price:1.5), user inserts $1 which is not enough to buy", () => {
      beforeEach(() => {
        test.result = test.subject.buyOne(1, 1);
      });
      it("should return a message saying please insert $0.5 to continue purchase", () => {
        expect(test.result).toEqual("Need insert $0.5 to puechase");
      });
    });
    describe("When buying a product and user inserts extra money", () => {
      beforeEach(() => {
        test.result = test.subject.buyOne(1, 2.25);
      });
      it("should return the product and change: 3 quarters", () => {
        expect(test.result).toEqual(
          "Take the product and here is the changes:3-Quarter "
        );
      });
    });
    describe("When purchasing a product back to back, until the product is sold out or until there are no coins in machine", () => {
      it("should take product(id:1) and return change for $5 in 1-Loonie 1-Toonie 2-Quarter", () => {
        expect(test.subject.buyOne(1, 5)).toEqual(
          "Take the product and here is the changes:1-Loonie 1-Toonie 2-Quarter "
        );
      });
      it("should take product(id:1) and return change for $10 in 4-Loonie 2-Quarter", () => {
        expect(test.subject.buyOne(1, 10)).toEqual(
          "Take the product and here is the changes:4-Loonie 2-Quarter "
        );
      });
      it("When trying to buy product (id:1), it should return a message saying Sold out", () => {
        expect(test.subject.buyOne(1, 20)).toEqual(
          "Sold out."
        );
      });
      it("When buying product (id:3) user inserts $3.34, changes:1-Loonie 2-Penny", () => {
        expect(test.subject.buyOne(3, 3.34)).toEqual(
          "Take the product and here is the changes:1-Loonie 2-Penny "
        );
      });
      it("When buying product (id:3) user inserts $10, changes:4-Loonie 2-Quarter 1-Dime 1-Nickel 3-Penny ", () => {
        expect(test.subject.buyOne(3, 10)).toEqual(
          "Take the product and here is the changes:4-Loonie 2-Quarter 1-Dime 1-Nickel 3-Penny "
        );
      });
       it("When buying product (id:3) user inserts $1.32, they should get no change back", () => {
        expect(test.subject.buyOne(3, 1.32)).toEqual(
          "Perfect! Here is the product."
        );
      });
    });
  });
});
