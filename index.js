"use strict";

var RATES = {
    base: 0,
    discountedBase: 0,
    halfAgain: 0,
    discountedHalfAgain: 0
}

function update() {
    calculateRates();
    calculateRevenue();
}

function calculateRates() {
    RATES.base = $("#base-rate").val();
    var discount = $("#discount-percent").val() * 0.01;
    var discountFactor = 1.0 - discount;
    RATES.discountedBase = RATES.base * discountFactor;
    RATES.halfAgain = RATES.base * 1.5;
    RATES.discountedHalfAgain = RATES.halfAgain * discountFactor;
    populateDiscountedBaseRate(RATES.discountedBase);
    populateHalfAgainRate(RATES.halfAgain);
    populateDiscountedHalfAgainRate(RATES.discountedHalfAgain);
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

function calculateRevenue() {
    var quantityBase = $("#headcount-base").val();
    var quantityDiscountedBase = $("#headcount-discounted-base").val();
    var quantityHalfAgain = $("#headcount-half-again").val();
    var quantityDiscountedHalfAgain = $("#headcount-discounted-half-again").val();
    var revBase = quantityBase * RATES.base;
    var revDiscBase = quantityDiscountedBase * RATES.discountedBase;
    var revHalfAgain = quantityHalfAgain * RATES.halfAgain;
    var revDiscHalfAgain = quantityDiscountedHalfAgain * RATES.discountedHalfAgain;
    var revenue = revBase + revDiscBase + revHalfAgain + revDiscHalfAgain;
    populateTotalRevenue(revenue);
}

function populateTotalRevenue(amount) {
    $("#total-revenue").text(amount);
}

// Do it once at startup.
update();
