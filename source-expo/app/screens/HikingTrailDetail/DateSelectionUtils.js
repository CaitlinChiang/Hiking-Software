import { doc, updateDoc } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD46mMFUwZ7AlCJWPqOXK3SKw1BuIihlFM",
    authDomain: "hikingproject-3abef.firebaseapp.com",
    projectId: "hikingproject-3abef",
    storageBucket: "hikingproject-3abef.appspot.com",
    messagingSenderId: "23275209713",
    appId: "1:23275209713:web:3579558675b39890b47a50",
    measurementId: "G-7H0L154L10"
  };
  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export function handleDateSelection(startDate, endDate) {
  console.log('Start Date:', startDate);
  console.log('End Date:', endDate);

  const userId = 'jxihUCNoi0396wkQR2gx'; 
  const userDocRef = doc(db, 'users', userId);

  updateDoc(userDocRef, {
    dates: {
      startDate: startDate,
      endDate: endDate
    }
  }).then(() => {
    console.log('Start Date and End Date stored in Firebase:', startDate, endDate);
  }).catch((error) => {
    console.log('Error storing Start Date and End Date in Firebase:', error);
  });
}
