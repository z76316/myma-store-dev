const { Given, When, Then, After, Before } = require("@cucumber/cucumber");
const { expect } = require("chai");
const { time } = require("console");
const webdriver = require("selenium-webdriver");
var { setDefaultTimeout } = require("@cucumber/cucumber");

setDefaultTimeout(60 * 1000);
const verifyText = "React google login";

let driver;
Before(function () {
	driver = new webdriver.Builder().forBrowser("safari").build();
});

After(function () {
	driver.quit();
});

Given("I am at the login page of the website", async () => {
	await driver.get("http://localhost:3000/login");
	await driver.sleep(3 * 1000);
	//setTimeout(myFunction, 10000);
});

When("I click Google button", async () => {
	await driver.findElement(webdriver.By.xpath(`//*[@id="root"]/div/main/div/button`)).click();

	await driver.sleep(6 * 1000);
});

Then("There will be a pop-up screen to login to google account", async () => {
	await driver.getAllWindowHandles().then(function gotWindowHandles(allhandles) {
		driver.switchTo().window(allhandles[allhandles.length - 1]);
	});

	let text = await driver
		.findElement(webdriver.By.xpath(`//*[@id="headingSubtext"]/span/button`))
		.getText();
	console.log(text);
	expect(text).to.include(verifyText);
});
