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

const handleDateSelection = async (startDate, endDate, name) => {
  console.log('Start Date:', startDate);
  console.log('End Date:', endDate);
  console.log('Name:', name)

  const userId = 'jxihUCNoi0396wkQR2gx'; // Replace with the actual user ID
  const savedDocRef = doc(db, 'users', userId);
  const savedDocSnapshot = await getDoc(savedDocRef);

  if (savedDocSnapshot.exists()) {
    const savedDoc = savedDocSnapshot.data()|| {};
    const upcomingList = savedDoc.upcoming || [];
    const currentTraining = savedDocSnapshot.get('dates') || {};

    if (currentTraining?.startDate === '' && currentTraining?.endDate === '') {
      const updatedDates = { ...savedDoc.dates, startDate, endDate, mountainName: name };
      updateDoc(savedDocRef, { dates: updatedDates })
    } else {
      const updatedDates = { startDate, endDate, mountainName: name };
      updateDoc(savedDocRef, { upcoming: [...upcomingList, updatedDates] })
    }
  } else {
    console.log('User document does not exist');
  }
}

export default handleDateSelection