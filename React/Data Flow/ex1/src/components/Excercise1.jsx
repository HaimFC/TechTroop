import { useState } from "react";

const Exercise1 = () => {

    let [data, updateData] = useState({
        images: [
    "https://hips.hearstapps.com/hmg-prod/images/lychee-fruit-sugar-1530136136.jpg?crop=1xw:1xh;center,top&resize=640:*",
    "https://hips.hearstapps.com/hmg-prod/images/mango-fruit-sugar-1530136260.jpg?crop=1xw:1xh;center,top&resize=640:*",
    "https://hips.hearstapps.com/hmg-prod/images/cherries-sugar-fruit-1530136329.jpg?crop=1xw:1xh;center,top&resize=640:*",
    ],
        currentImg: 0
    })  

    const shiftImageBack = function (){
        const newData = {...data, currentImg: data.currentImg===0 ? data.currentImg: data.currentImg-1}
        updateData(newData)
    }

    const shiftImageForward  = function (){
        const newData = {...data, currentImg: data.currentImg===data.images.length - 1 ? data.currentImg: data.currentImg+1}
        updateData(newData)
    }

    return(
        <div>
            <button onClick={shiftImageBack}>Back</button>
            <button onClick={shiftImageForward}>Forward</button>
            <img index={data.currentImg} src={data.images[data.currentImg]} alt="" />
        </div>
    )
}

export default Exercise1;