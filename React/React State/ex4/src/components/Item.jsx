function Item({name, price}){
    return(
        <div>{name}: ${price.toFixed(2)}</div>
    )
}

export default Item