import {useState} from 'react'

function Hudini(){
    let [show, showUpdate] = useState(false)
    return(
        <div>
            {show === true ? <div>Now you see me</div> : <div>Now you don't</div>}  
            <button onClick={() => showUpdate(!show)}>Click</button>
        </div>
    )
}

export default Hudini