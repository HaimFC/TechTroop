import './List.css'

const List = ({ conversations, onSelect }) => {
    return (
        <ul>
            {conversations.map(c => (
                <li key={c.with} onClick={() => onSelect(c.with)}>
                    {c.with}
                </li>
            ))}
        </ul>
    );
};

export default List;