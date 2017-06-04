"use strict";

var StudentCount, MaterialsCost, AssistantPay, TotalRent, Fees, Income;
var dailyRent, classDays, weeksPerSession, sessions, assistantHoursPerDay, assistantHourlyPay;

var headcount = {
    twoday: 3,
    discountTwoday: 0,
    threeday: 3,
    discountThreeday: 3
}

function populateStudentNos() {
    headcount.twoday = $("#headcount-twoday").val();
    headcount.discountTwoday = $("#headcount-discount-twoday").val();
    headcount.threeday = $("#headcount-threeday").val();
    headcount.discountThreeday = $("#headcount-discount-threeday").val();
    StudentCount = parseInt(headcount.twoday) + parseInt(headcount.discountTwoday) + parseInt(headcount.threeday) + parseInt(headcount.discountThreeday);
    populateStudentTotal(StudentCount);
    adjustStudentBar(StudentCount, headcount.twoday, headcount.discountTwoday, headcount.threeday, headcount.discountThreeday);
}

function adjustStudentBar(total, a, b, c, d) {
    var percent_a = a / total * 100;
    var percent_b = b / total * 100;
    var percent_c = c / total * 100;
    var percent_d = d / total * 100;
    $("#count-bar-twoday").css("width", percent_a + "%");
    $("#count-bar-threeday").css("width", percent_b + "%");
    $("#count-bar-discount-twoday").css("width", percent_c + "%");
    $("#count-bar-discount-threeday").css("width", percent_d + "%");
}

function populateStudentTotal(number) {
    $("#total-students").text(number);
}

var materials = {
    fixed: 0,
    perStudent: 0
}

function populateMaterials() {
    materials.fixed = $("#materials-cost-fixed").val();
    materials.perStudent = $("#materials-cost-per").val();
}

function calculateMaterials() {
    MaterialsCost = parseInt(materials.fixed) + StudentCount * parseInt(materials.perStudent);
    MaterialsCost = MaterialsCost.toFixed(2);
    populateMaterialsCost(MaterialsCost);
}

function populateMaterialsCost(cost) {
    $("#materials-cost").text(cost);
}

function populateOtherVars() {
    dailyRent = $("#daily-rent").val();
    classDays = (headcount.threeday + headcount.discountThreeday > 0) ? 3 : 2;
    populateClassDays(classDays);
    weeksPerSession = $("#weeks-session").val();
    sessions = $("#sessions").val();
    assistantHoursPerDay = $("#asst-daily-hrs").val();
    assistantHourlyPay = $("#asst-hrly-pay").val();
}

function populateClassDays(days) {
    $("#class-days").text(days);
}

function calculateAsstIncome() {
    AssistantPay = (StudentCount >= 8) ? assistantHourlyPay * assistantHoursPerDay * classDays * weeksPerSession * sessions : 0;
    AssistantPay = AssistantPay.toFixed(2);
    populateAsstIncome(AssistantPay);
}

function populateAsstIncome(income) {
    $("#asst-income").text(income);
}

function calculateRent() {
    TotalRent = dailyRent * classDays * weeksPerSession * sessions;
    TotalRent = TotalRent.toFixed(2);
    populateRent(TotalRent);
}

function populateRent(rent) {
    $("#total-rent").text(rent);
}

var fees = {
    twoday: 800.00,
    discountTwoday: 0,
    threeday: 0,
    discountThreeday: 0
}

function calculateFees() {
    fees.twoday = $("#base-rate").val();
    var c = $("#percent-discount").val() * 0.01;
    fees.discountTwoday = fees.twoday * (1 - c);
    fees.discountTwoday = fees.discountTwoday.toFixed(2);
    fees.threeday = 1.5 * fees.twoday;
    fees.threeday = fees.threeday.toFixed(2);
    fees.discountThreeday = 1.5 * f.twoday * (1 - threeday);
    fees.discountThreeday = fees.discountThreeday.toFixed(2);
    Fees = (fees.twoday * headcount.twoday + fees.discountTwoday * headcount.discountTwoday + fees.threeday * headcount.threeday + fees.discountThreeday * headcount.discountThreeday) * Number(sessions);
    Fees = Fees.toFixed(2);
    populateTwodayDiscount(fees.discountTwoday);
    populateThreedayReg(fees.threeday);
    populateThreedayDiscount(fees.discountThreeday);
    populateFeeTotal(Fees);
}

function populateTwodayDiscount(fee) {
    $("#fee-discount-twoday").text(fee);
}

function populateThreedayReg(fee) {
    $("#fee-threeday").text(fee);
}

function populateThreedayDiscount(fee) {
    $("#fee-discount-threeday").text(fee);
}

function populateFeeTotal(fee) {
    $("#total-fees").text(fee)
}

function calculateAnnaIncome() {
    var revenue = Number(Fees);
    var costs = Number(AssistantPay) + Number(TotalRent) + Number(MaterialsCost);
    Income = revenue - costs;
    Income = Income.toFixed(2);
    populateAnnaIncome(Income);
}

function populateAnnaIncome(income) {
    $("#anna-income").text(income);
}

function update() {
    populateStudentNos();
    populateMaterials();
    calculateMaterials();
    populateOtherVars();
    calculateAsstIncome();
    calculateRent();
    calculateFees();
    calculateAnnaIncome();
}

// Do it once at startup.
update();