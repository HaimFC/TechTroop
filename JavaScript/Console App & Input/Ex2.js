import PromptSync from "prompt-sync";
const prompt = PromptSync();

const qa = {q: ["What is 2 + 2?", "What is the capital of France?", "What year is it?"], a: [4, "Paris", 2025]};
let count = 0;

for(let i in qa.q){
    const fquestion = prompt(qa.q[i]);
    if(fquestion == qa.a[i]){
        count++;
    }
}

console.log(`Final Score: ${count}/3 correct!`);