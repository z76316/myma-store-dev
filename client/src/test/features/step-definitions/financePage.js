const { Given, When, Then, After, Before } = require("@cucumber/cucumber");
const { expect } = require("chai");
const { time } = require("console");
const webdriver = require("selenium-webdriver");
var { setDefaultTimeout } = require("@cucumber/cucumber");

setDefaultTimeout(60 * 1000);

let driver;
Before(function () {
	driver = new webdriver.Builder().forBrowser("safari").build();
});

After(function () {
	driver.quit();
});

Given("I am at the home page of the website", async () => {
	await driver.get("https://myma-store.herokuapp.com");
	//setTimeout(myFunction, 10000);
});

When("I click Prodcuct tab and click Finance with Maple", async () => {
	await driver
		.findElement(webdriver.By.xpath(`//*[@id="root"]/div/nav/div/div/div[1]/div[1]`))
		.click();

	await driver
		.findElement(webdriver.By.xpath(`//*[@id="root"]/div/nav/div/div/div[1]/div[2]/a[3]`))
		.click();

	await driver.sleep(7 * 1000);
});

Then("I will be directed to the finance textbook page", async () => {
	let text = await driver
		.findElement(webdriver.By.xpath(`//*[@id="root"]/div/main/div[3]/p[1]/h1`))
		.getText();
	console.log(text);
});
