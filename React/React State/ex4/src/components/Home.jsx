import Item from './Item';

function Home(props) {
    return (
        <div>
            {props.data.map((c, index) => (
                <Item 
                    key={index} 
                    name={c.item} 
                    price={props.disMode ? c.price * (1 - c.discount) : c.price} 
                />
            ))}
        </div>
    );
}

export default Home;