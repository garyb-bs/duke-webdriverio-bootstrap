const LoginPage = require("../pageobjects/login.page");
const HomePage = require("../pageobjects/home.page");
const CartPage = require("../pageobjects/cart.page");
const CheckoutPage = require("../pageobjects/checkout.page");
const ConfirmationPage = require("../pageobjects/confirmation.page");
const OrdersPage = require("../pageobjects/orders.page");

describe('End to End test', async () => {
    
    it(`User sholud be able to login and order a product`, async () => {
        await HomePage.openLoginForm();
        await LoginPage.login(
          browser.config.accounts[0].username,
          browser.config.accounts[0].password
        );
        await HomePage.scrollAndAddToCart("add-to-cart-12");
        await HomePage.scrollAndAddToCart("add-to-cart-16");
        await HomePage.scrollAndAddToCart("add-to-cart-11");
        await (await HomePage.cart).click();
        await CartPage.proceedToCheckout();
        await CheckoutPage.enterShippingDetails(
          "firstname",
          "lastname",
          "address",
          "state",
          "12345"
        );
        await ConfirmationPage.clickContinue();
        await HomePage.openMenu();
        await HomePage.selectMenuOption("Orders");  
        await expect(await OrdersPage.ordersCount).toHaveText(
          "1 order(s) found."
        );
        await expect((await OrdersPage.ordersList).length).toBe(3);
    });

});
