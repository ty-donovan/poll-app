import React from "react";
import { doc, updateDoc, increment } from 'firebase/firestore';
import { DB } from './firebase';
import { useState } from "react";

function Response({ text, upvotes, id }) {
    const [totalUpvotes, setTotalUpvotes] = useState(upvotes);

    const increase = increment(1);

    const incrementUpvotes = () => {
        const docRef = doc(DB, "RESPONSES", id);
        updateDoc(docRef, {
            upvotes: increase
        });
        setTotalUpvotes(totalUpvotes + 1);
        console.log("success");
    }

    return (
        <div>
            <h3>{text}</h3>
            <button onClick={incrementUpvotes}>Upvote {totalUpvotes}</button>
        </div>
    );
}

export default Response;