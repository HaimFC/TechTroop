import promptSync from 'prompt-sync';
const prompt = promptSync();

export function mainInput(){
  console.log("=== Banking System ===");
  console.log("1) Check Balance");
  console.log("2) Deposit Money");
  console.log("3) Withdraw Money");
  console.log("4) Exit");
  let choice = Number(prompt("Choose option (1-4): "));
  if (isNaN(choice) || choice < 1 || choice > 4) {
    return ("Invalid Input");
  }
  else{
    return choice;
  }
}

export function depositInput(){
  let choice = prompt("Enter amount to deposit: ");
  choice = Number(choice.replace("$", ""));
  if (isNaN(choice) || choice < 0) {
    return ("Invalid Input");
  }
  else{
    return choice;
  }
}

export function withdrawInput(){
  let choice = prompt("Enter amount to withdraw: ");
  choice = Number(choice.replace("$", ""));
  if (isNaN(choice) || choice < 0) {
    return ("Invalid Input");
  }
  else{
    return choice;
  }
}