var assert = require('assert'),     
    fs = require('fs');     
const {Builder, By, until} = require('selenium-webdriver');
const test = require('selenium-webdriver/testing');

test.describe('Briggo Demo E2E Orders Test Suite (Web Application) ', function() {
  this.timeout(60000);
  var driver;
  test.before(function() {
    driver = new Builder().forBrowser('firefox').build();
  });
  
  test.after(function() {
    driver.quit();
  });

  test.it('should order a 16 OZ Latte', function(){     
    driver.get('https://briggo.com');
    driver.wait(until.elementLocated(By.css('#mm-order-a-drink > div')));
    driver.findElement(By.css('#mm-order-a-drink > div')).click();
    driver.wait(until.elementLocated(By.css('#content > div.rows > a:nth-child(1) > div.menu-item-content > div > span.drink_sm.drink-shadow')));
    driver.findElement(By.css('#content > div.rows > a:nth-child(1) > div.menu-item-content > div > span.drink_sm.drink-shadow')).click();
    driver.wait(until.elementLocated(By.css('#cupSize > div:nth-child(2)')));
    driver.findElement(By.css('#cupSize > div:nth-child(2)')).click();

    driver.findElement(By.css('#cupInfo > h2.price'))
      .getText().then(textValue => {
        assert.equal('$3.30', textValue);
      });
  });

  test.it('should cancel the order of 12 OZ Latte', function(){     
    driver.get('https://briggo.com');
    driver.wait(until.elementLocated(By.css('#mm-order-a-drink > div')));
    driver.findElement(By.css('#mm-order-a-drink > div')).click();
    driver.wait(until.elementLocated(By.css('#content > div.rows > a:nth-child(1) > div.menu-item-content > div > span.drink_sm.drink-shadow')));
    driver.findElement(By.css('#content > div.rows > a:nth-child(1) > div.menu-item-content > div > span.drink_sm.drink-shadow')).click();
    driver.wait(until.elementLocated(By.css('#cupInfo > a')));
    driver.findElement(By.css('#cupInfo > a')).click();
    driver.wait(until.elementLocated(By.css('#ingredientList > li > a')));
    // driver.findElement(By.css('#ingredientList > li > a')).click();
    // driver.wait(until.elementLocated(By.css('#modal-options > a:nth-child(1)')));
    // driver.findElement(By.css('#modal-options > a:nth-child(1)')).click();

    driver.getCurrentUrl().then(url => {
        assert.equal('https://briggo.com/web/#cart', url);
      });
    });

}, 3000);