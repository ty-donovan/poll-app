import React from 'react';
import { collection, getDocs, doc, addDoc, getDoc } from 'firebase/firestore';
import { DB } from './firebase';
import { useEffect, useState } from 'react';
import Response from './response.js';

function App() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const docRef = collection(DB, "RESPONSES");
    getDocs(docRef).then((docs) => {
      const fetchedResponses = [];
      docs.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        fetchedResponses.push({
          id: doc.id,
          text: doc.data().text,
          upvotes: doc.data().upvotes
      })
      setResponses(fetchedResponses);
      });
    }).catch((error) => {
      console.log("Error getting collection:", error);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const food = formData.get('food');

    console.log(food);

    const docRef = doc(DB, "RESPONSES");
    addDoc(docRef, {
      text: food,
      upvotes: 0
    });

    console.log("success");
  }

  console.log(responses);

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>What is your favorite food?</h2>
      <hr />
      <form method='post' onSubmit={handleSubmit}>
        <label>
          <input type="text" name="food" placeholder="Ex: pizza" />
        </label>
        <button type="submit">Submit</button>
      </form>
      {responses.map((response) => (
        <Response key={response.id} text={response.text} upvotes={response.upvotes} id={response.id} />
      ))}
    </div>
  );
}

export default App;
