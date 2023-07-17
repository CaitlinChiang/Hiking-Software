import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, updateDoc } from "firebase/firestore";

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

const handleDateSelection = async (startDate, endDate) => {
  console.log('Start Date:', startDate);
  console.log('End Date:', endDate);

  const userId = 'jxihUCNoi0396wkQR2gx'; // Replace with the actual user ID
  const savedDocRef = doc(db, 'users', userId);
  const savedDocSnapshot = await getDoc(savedDocRef);

  if (savedDocSnapshot.exists()) {
    const savedDoc = savedDocSnapshot.data()|| {};
    const updatedDates = { ...savedDoc.dates, startDate, endDate };

    updateDoc(savedDocRef, {
      dates: updatedDates
    }).then(() => {
      console.log('Start Date and End Date stored in Firebase:', startDate, endDate);
    }).catch((error) => {
      console.log('Error storing Start Date and End Date in Firebase:', error);
    });
  } else {
    console.log('User document does not exist');
  }
}

export default handleDateSelection