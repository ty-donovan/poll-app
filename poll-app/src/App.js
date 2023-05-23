import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { DB } from './firebase';
import { useEffect } from 'react';

function App() {
  
  useEffect(() => {
    const docRef = doc(DB, "RESPONSES", "xanhvp6BKQcUsroRfaCf");
    getDoc(docRef).then((doc) => {
      if (doc.exists()) {
        console.log("Document data:", doc.data());
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
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
