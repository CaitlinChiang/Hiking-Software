import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Header, SafeAreaView, BucketListItem } from '@components';
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, getDoc, onSnapshot } from 'firebase/firestore';
import { HikingTrailsData } from '@data';

const firebaseConfig = {
  apiKey: "AIzaSyD46mMFUwZ7AlCJWPqOXK3SKw1BuIihlFM",
  authDomain: "hikingproject-3abef.firebaseapp.com",
  projectId: "hikingproject-3abef",
  storageBucket: "hikingproject-3abef.appspot.com",
  messagingSenderId: "23275209713",
  appId: "1:23275209713:web:3579558675b39890b47a50",
  measurementId: "G-7H0L154L10"
};

export default function BucketList({ navigation }) {
  const [hikingTrails, setHikingTrails] = useState([]);

  useEffect(() => {
    const fetchHikingTrails = async () => {
      try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const userDocRef = doc(db, 'users', 'jxihUCNoi0396wkQR2gx');
        const userDocSnapshot = await getDoc(userDocRef);
        
        if (userDocSnapshot.exists()) {
          const bucketList = userDocSnapshot.get('bucketlist') || [];
          console.log('Bucket List:', bucketList);
          const hikingTrails = HikingTrailsData.filter((trail) => {
            return bucketList.some((item) => item.name === trail.name);
          });
          console.log('Filtered Hiking Trails:', hikingTrails);
          setHikingTrails(hikingTrails);
        } else {
          console.log('User document does not exist'); // Wrote these statements to check my errors because I could not figure out why I didnt receive data from firebase.
        }
      } catch (error) {
        console.log('Error fetching hiking trails:', error);
      }
    };

    fetchHikingTrails()
  }, []);
  
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}} edges={['right', 'left', 'bottom']}>
        <ScrollView
          scrollEventThrottle={8}>
          <Header
            title="Bucket List"
          />
          <View
            style={{
              paddingHorizontal: 20,
              marginBottom: 20
            }}>
            {hikingTrails.map((trail, index) => (
              <BucketListItem
                key={index}
                name={trail.name}
                location={trail.location}
                summitHeight={trail.summitHeight}
                duration={trail.duration}
                ydsGrading={trail.ydsGrading}
                ydsClass={trail.ydsClass}
                style={{marginTop: 10, width: '100%'}}
                image={trail.imageSrc}
                onPress={() => {
                  navigation.navigate('HikingTrailDetail',{name: trail.name,
                    location: trail.location,
                    duration: trail.duration,
                    summitHeight: trail.summitHeight,
                    imageSrc: trail.imageSrc,});
                }}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
