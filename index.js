"use strict";

function calculateRates() {
    console.log("calculating rates");
    var baseRate = $("#base-rate").val();
    var discount = $("#discount-percent").val() * 0.01;
    console.log("base rate: " + baseRate + ", discount: " + discount + "%");
    var discountFactor = 1.0 - discount;
    var discountedBase = baseRate * discountFactor;
    var halfAgain = baseRate * 1.5;
    var discountedHalfAgain = halfAgain * discountFactor;
    populateDiscountedBaseRate(discountedBase);
    populateHalfAgainRate(halfAgain);
    populateDiscountedHalfAgainRate(discountedHalfAgain);
}

function populateDiscountedBaseRate(rate) {
    $("#discounted-base").text(rate);
}

function populateHalfAgainRate(rate) {
    $("#half-again-rate").text(rate);
}

function populateDiscountedHalfAgainRate(rate) {
    $("#discounted-half-again").text(rate);
}

// Do it once at startup.
calculateRates();
