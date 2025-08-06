import { useState } from "react";

const Exercise2 = () => {
  const [name, setName] = useState("");
  const [fruit, setFruit] = useState("default");

  const updateFruit = function(e){
    const selectedFruit = e.target.value;
    setFruit(selectedFruit);
    console.log(`${name} selected ${selectedFruit}`);
  }
  
  return (
    <div>
      <input
        id="name-input"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <select
        id="select-input"
        onChange={updateFruit}
        value={fruit}>

        <option value="default"></option>
        <option value="first">First</option>
        <option value="second">Second</option>
        <option value="third">Third</option>
      </select>
    </div>
  );
};
export default Exercise2;