let employeesArr = [
  { name : "Joey" , id: 1 , age: 26},
  { name : "Lily" , id: null , age: 24},
  { name : "Alice" , id: 7 , age: null},
  { name : "Sam" , id: 8 , age: 24},
  { name : "Ray" , id: null , age: null}
  ]

  employeesArr.forEach(employee => {

    let name = employee.name ?? null;
    let id = employee.id ?? null;
    let age = employee.age ?? null;

    if(name === null || id === null || age === null){
        console.log(name, id, age);
    }
  });

