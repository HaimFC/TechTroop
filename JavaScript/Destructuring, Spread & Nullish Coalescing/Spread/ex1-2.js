//===========ex1================

let meatArr = ["beef","chicken"]
let vegetableArr = ["rabbit","carrots","potatoes","lettuce"]

meatArr = [...meatArr, vegetableArr[0]];
vegetableArr = vegetableArr.slice(1);
//===========ex2================

var firstPiece = { id: 101, name: 'Ofri' }
var seoncdPiece = { country: 'Israel'}

let fulllObj = {...firstPiece, ...seoncdPiece};
console.log(fulllObj);