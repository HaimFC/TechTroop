const validate = function(){
    const name = document.getElementById("name");
    const salary = document.getElementById("salary");
    const birthday = document.getElementById("birthday");
    const phone = document.getElementById("phone");
    const warrning = document.getElementById("warning");
    let warningFlag = 0;

    if (name.value.length <= 2){
        warrning.style.color = "red"
        warrning.innerHTML = "name is missing"
        warning.style.display = "block";
        warningFlag = 1
    }
    if (parseInt(salary.value) < 10000 || parseInt(salary.value) > 16000){
        warrning.style.color = "red"
        warrning.innerHTML = "salary is missing"
        warning.style.display = "block";
        warningFlag = 1
    }
    if (birthday.value == ""){
        warrning.style.color = "red"
        warrning.innerHTML = "birthday is missing"
        warning.style.display = "block";
        warningFlag = 1
    }
    if (phone.value.length != 10){
        warrning.style.color = "red"
        warrning.innerHTML = "phone is missing"
        warning.style.display = "block";
        warningFlag = 1
    }
    if(warningFlag === 0){
        warning.style.display = "none";
    }
}