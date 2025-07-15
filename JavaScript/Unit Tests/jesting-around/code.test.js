const EX = require('./code');

test("check if even or not - even case", function(){
    const ex1 = new EX();
    const answer = ex1.isEven(10);
    expect(answer).toEqual(true);
})

test("check if even or not - odd case", function(){
    const ex1 = new EX();
    const answer = ex1.isEven(11);
    expect(answer).toEqual(false);
})

test("check if even or not - wrong type", function(){
    const ex1 = new EX();
    const answer = ex1.isEven("str");
    expect(answer).toEqual(false);
})


test("check if removed items from an array", function(){
    const ex2 = new EX();
    const answer = ex2.removeAtLeastOne(["one", "two", "three"]);
    expect(answer.length).toBeLessThan(3);
})

test("check if removed items from an array - empty array", function(){
    const ex2 = new EX();
    const answer = ex2.removeAtLeastOne([]);
    expect(answer.length).toEqual(0);
})


test("return clean string without !,#,.,,,'", function(){
    const ex3 = new EX();
    const answer = ex3.simplify("Ha!M . . ' , Cohen,....#");
    expect(answer).toEqual("HaM     Cohen");
})

test("return clean string without !,#,.,,,' - empty string", function(){
    const ex3 = new EX();
    const answer = ex3.simplify("");
    expect(answer).toEqual("");
})

test("check at least one value in the array - empty array", function(){
    const ex4 = new EX();
    const answer = ex4.validate([]);
    expect(answer).toEqual({error: "Need at least one boolean"});
})

test("check more true than false - true win case", function(){
    const ex4 = new EX();
    const answer = ex4.validate([true, true, true, false]);
    expect(answer).toEqual(true);
})

test("check more true than false - false win case", function(){
    const ex4 = new EX();
    const answer = ex4.validate([true, false, false]);
    expect(answer).toEqual(false);
})

test("check more true than false - equal case", function(){
    const ex4 = new EX();
    const answer = ex4.validate([true, false]);
    expect(answer).toEqual(false);
})

test("check more true than false - empty case", function(){
    const ex4 = new EX();
    const answer = ex4.validate([]);
    expect(answer).toEqual({error: "Need at least one boolean"});
})

