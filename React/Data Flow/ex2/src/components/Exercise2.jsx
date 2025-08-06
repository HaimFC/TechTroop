import { useState } from "react";
import List from '../components/List';
import Conversation from "./conversation";

function Exercise2() {
    const myData = {
        conversations: [
            {
                with: "Laura", convo: [
                    { text: "Hi", sender: "self" },
                    { text: "You there?", sender: "self" },
                    { text: "Yeah, hi, what's up?", sender: "other" }
                ]
            },
            {
                with: "Dad", convo: [
                    { text: "Have you finished your school work yet?", sender: "other" },
                    { text: "Yes.", sender: "self" },
                    { text: "What do you mean, yes?", sender: "other" },
                    { text: "??", sender: "self" }
                ]
            },
            {
                with: "Shoobert", convo: [
                    { text: "Shoobert!!!", sender: "self" },
                    { text: "Dude!!!!!!!!", sender: "other" },
                    { text: "Shooooooooo BERT!", sender: "self" },
                    { text: "You're my best friend", sender: "other" },
                    { text: "No, *you're* my best friend", sender: "self" },
                ]
            }
        ]
    };

    const [displayConversation, setDisplayConversation] = useState(null);

    const selectConversation = (contactName) => {
        const convo = myData.conversations.find(c => c.with === contactName);
        setDisplayConversation(convo);
    };

    return (
        <>
            {displayConversation ? 
                <Conversation conversation={displayConversation} back={() => setDisplayConversation(null)} /> 
                : 
                <List conversations={myData.conversations} onSelect={selectConversation} />
            }
        </>
    );
}

export default Exercise2;