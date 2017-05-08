"use strict";

function calculateRates() {
    console.log("calculating rates");
    var baseRate = $("#base-rate").val();
    var discount = $("#discount-percent").val() * 0.01;
    console.log("base rate: " + baseRate + ", discount: " + discount + "%");
    var discountedBase = baseRate * (1.0 - discount);
    populateDiscountTwoDayRate(discountedBase);
}

function populateDiscountTwoDayRate(rate) {
    $("#discounted-base").text(rate);
}
