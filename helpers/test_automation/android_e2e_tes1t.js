"use strict";
require("../../helpers/setup.js");

var wd = require("wd"),
_ = require('underscore'),
Q = require('q'),
serverConfigs = require('../../helpers/appiumserver');
var chai = require("chai");
var should = chai.should();

describe('Briggo Demo E2E Orders Test Suite (Android Application) ', function() {
  this.timeout(30000);
  var driver;
  var allPassed = true;
  
  beforeEach(function() {
    var serverConfig = serverConfigs.local
    driver = wd.promiseChainRemote(serverConfig);
    require("../../helpers/logging").configure(driver);
    var desired = _.clone(require("../../helpers/caps").mycapabilities);
    desired.app = require("../../helpers/apps").myTestApp;
    // Initialize driver
    return driver
      .init(desired)
      .setImplicitWaitTimeout(10000);
  });

  afterEach(function() {
    allPassed = allPassed && this.currentTest.state === 'passed';
    //Take screenshot on failure
    if (this.currentTest.state !== 'passed'){
      return driver
      .takeScreenshot()
      .then(function(){
          return driver
          .saveScreenshot("./screenshots/")
      })
    }
   // Quit driver 
   return driver.quit()  
  });

  it('should place an order for 16 OZ Latte', function() {
    return driver
    .waitForElementByAccessibilityId('Order a Drink').click()
    .waitForElementByAccessibilityId('Latte LATTE 2-3 MIN').click()
    .waitForElementByAccessibilityId('16').click()
    .waitForElementByAccessibilityId('$3.30')
    .isDisplayed().should.eventually.be.true
  });

   it('should cancel the order of 12 OZ Latte', function() {
    return driver
    .waitForElementByAccessibilityId('Order a Drink').click()
    .waitForElementByAccessibilityId('Latte LATTE 2-3 MIN').click()
    .waitForElementByAccessibilityId('$2.65')
    .waitForElementByAccessibilityId('ADD TO CART').click()
    .waitForElementByAccessibilityId('').click()
    .waitForElementByAccessibilityId('YES').click()
    .waitForElementByAccessibilityId('Latte LATTE 2-3 MIN')
    .isDisplayed().should.eventually.be.true
  });

}, 15000);