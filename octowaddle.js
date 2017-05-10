"use strict";

//See definitions of variables at the bottom of this file.

var n = {
    1: 2,
    2: 2,
    3: 2,
    4: 2
}

function populateStudentNos() {
    n.1 = $("#headcount-discount-twoday").val();
    n.2 = $("#headcount-twoday").val();
    n.3 = $("#headcount-threeday").val();
    n.4 = $("#headcount-discount-threeday").val();
    N = n.1 + n.2 + n.3 + n.4;
    populateStudentTotal(N);
}

function populateStudentTotal(number) {
    $("#total-students").text(number);
}

var m = {
    f: 0,
    n: 0
}

function populateMaterials() {
    m.f = $("#materials-cost-fixed").val();
    m.n = $("#materials-cost-per").val();
}

function calculateMaterials() {
    M = m.f + N * m.n;
    populateMaterialsCost(M);
}

function populateMaterialsCost(cost) {
    $("#materials-cost").text(cost);
}

function populateOtherVars() {
    var r = $("#daily-rent").val();
    var d = (n.3 + n.4 > 0) ? 3 : 2;
    var w = $("#weeks-session").val();
    var s = $("#sessions").val();
    var h = $("#asst-daily-hrs").val();
    var a = $("#asst-hrly-pay").val();
}

function calculateAsstIncome() {
    var S = (N >= 8) ? a * h * d * w * s : 0;
    populateAsstIncome(S);
}

function populateAsstIncome(income) {
    $("#asst-income").text(income);
}

function calculateRent() {
    var R = r * d * w * s;
    populateRent(R);
}

function populateRent(rent) {
    $("#total-rent").text(rent);
}

var f = {
    1: 0,
    2: 800,
    3: 0,
    4: 0
}

function calculateFees() {
    f.2 = $("#base-rate").val();
    var c = $("#percent-discount").val() * 0.01;
    f.1 = f.2 * (1 - c);
    f.3 = 1.5 * f.2;
    f.4 = 1.5 * f.2 * (1 - c);
    var F = (f.1 * n.1 + f.2 * n.2 + f.3 * n.3 + f.4 * n.4) * s;
    populateTwodayDiscount(f.1);
    populateThreedayReg(f.3);
    populateThreedayDiscount(f.4);
    populateFeeTotal(F);
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
    var A = F - (S + R + M);
    populateAnnaIncome(A);
}

function populateAnnaIncome(income) {
    $("#anna-income").text(income);
}

// Do it once at startup.
update();


/*
Defining Variables
_____

A = Anna's income
S = assistant's income
R = total rent costs
M = total materials costs
F = total fees collected from students

m.f = fixed materials cost
m.n = per capita materials cost

n.1 = headcount of discount two-day students
n.2 = headcount of full-rate two-day students
n.3 = headcount of full-rate three-day students
n.4 = headcount of discount three-day students
N = total student headcount

f.1 = fee for discounted two-day students
f.2 = fee for full-rate two-day students = base fee
f.3 = fee for full-rate three-day students
f.4 = fee for discount three-day students

r = daily rent
d = number of class days per week
w = number of weeks per session
s = number of sessions to calculate for
h = number of hours assistant works per day
a = assistant's hourly pay
c = percent discount * 0.01
*/