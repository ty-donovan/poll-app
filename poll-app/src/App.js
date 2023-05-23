import React from 'react';
import {collection, getDocs} from 'firebase/firestore';
import { DB } from './firebase';
import { useEffect } from 'react';

function App() {
  
  useEffect(() => {
    const docRef = collection(DB, "RESPONSES");
    getDocs(docRef).then((docs) => {
      docs.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      })
    }).catch((error) => {
      console.log("Error getting collection:", error);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const food = formData.get('food');

    console.log('food: ', food);
  }

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
    </div>
  );
}

export default App;
