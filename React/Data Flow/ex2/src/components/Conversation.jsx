const Conversation = ({ conversation, back }) => {
    const contact = conversation.with;
    const convo = conversation.convo;

    return (
        <div>
            <button onClick={back}>Back</button>
            {convo.map((c, index) => (
                <p key={index}>
                    {c.sender === "self" ? <b>ME</b> : <b>{contact}</b>}: {c.text}
                </p>
            ))}
        </div>
    );
};

export default Conversation;