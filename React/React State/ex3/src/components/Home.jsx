import Item from './Item'

function Home(props){
    return(
        <div>
            {props.data.map(c=><Item name={c.item} price={c.price}/>)}
        </div>
    )
}

export default Home