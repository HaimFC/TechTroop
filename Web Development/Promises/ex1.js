function checkLuckyNumber(num) {
    return new Promise((resolve, reject) => {
        if (num <= 0){
            reject(new Error("Invaild number"))
            return;
        }
        setTimeout(()=>{
            if(num % 7 === 0){
                resolve("Lucky!")
            }
            else{
                resolve("Not lucky")
            }
        }, 800)
    })
}