"use strict";

//See descriptions of variables at the bottom of this file.

var StudentCount, MaterialsCost, AssistantPay, TotalRent, Fees, Income;
var r, d, w, s, h, a;

var n = {
    a: 5,
    b: 2,
    c: 2,
    d: 2
}

function populateStudentNos() {
    n.a = $("#headcount-twoday").val();
    n.b = $("#headcount-discount-twoday").val();
    n.c = $("#headcount-threeday").val();
    n.d = $("#headcount-discount-threeday").val();
    StudentCount = parseInt(n.a) + parseInt(n.b) + parseInt(n.c) + parseInt(n.d);
    populateStudentTotal(StudentCount);
    adjustStudentBar(StudentCount, n.a, n.b, n.c, n.d);
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

var m = {
    f: 0,
    n: 0
}

function populateMaterials() {
    m.f = $("#materials-cost-fixed").val();
    m.n = $("#materials-cost-per").val();
}

function calculateMaterials() {
    MaterialsCost = parseInt(m.f) + StudentCount * parseInt(m.n);
    MaterialsCost = MaterialsCost.toFixed(2);
    populateMaterialsCost(MaterialsCost);
}

function populateMaterialsCost(cost) {
    $("#materials-cost").text(cost);
}

function populateOtherVars() {
    r = $("#daily-rent").val();
    d = (n.c + n.d > 0) ? 3 : 2;
    populateClassDays(d);
    w = $("#weeks-session").val();
    s = $("#sessions").val();
    h = $("#asst-daily-hrs").val();
    a = $("#asst-hrly-pay").val();
}

function populateClassDays(days) {
    $("#class-days").text(days);
}

function calculateAsstIncome() {
    AssistantPay = (StudentCount >= 8) ? a * h * d * w * s : 0;
    AssistantPay = AssistantPay.toFixed(2);
    populateAsstIncome(AssistantPay);
}

function populateAsstIncome(income) {
    $("#asst-income").text(income);
}

function calculateRent() {
    TotalRent = r * d * w * s;
    TotalRent = TotalRent.toFixed(2);
    populateRent(TotalRent);
}

function populateRent(rent) {
    $("#total-rent").text(rent);
}

var f = {
    a: 800.00,
    b: 0,
    c: 0,
    d: 0
}

function calculateFees() {
    f.a = $("#base-rate").val();
    var c = $("#percent-discount").val() * 0.01;
    f.b = f.a * (1 - c);
    f.b = f.b.toFixed(2);
    f.c = 1.5 * f.a;
    f.c = f.c.toFixed(2);
    f.d = 1.5 * f.a * (1 - c);
    f.d = f.d.toFixed(2);
    Fees = (f.a * n.a + f.b * n.b + f.c * n.c + f.d * n.d) * parseInt(s);
    Fees = Fees.toFixed(2);
    populateTwodayDiscount(f.b);
    populateThreedayReg(f.c);
    populateThreedayDiscount(f.d);
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

/*function setTwoDecimals(number) {
    number = parseInt(number).toFixed(2);
}*/

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

n.a = headcount of full-rate two-day students
n.b = headcount of discount two-day students
n.c = headcount of full-rate three-day students
n.d = headcount of discount three-day students
N = total student headcount

f.a = fee for full-rate two-day students = base fee
f.b = fee for discounted two-day students
f.c = fee for full-rate three-day students
f.d = fee for discount three-day students

r = daily rent
d = number of class days per week
w = number of weeks per session
s = number of sessions to calculate for
h = number of hours assistant works per day
a = assistant's hourly pay
c = percent discount * 0.01
*/