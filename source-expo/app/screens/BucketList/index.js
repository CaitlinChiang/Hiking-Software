import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Header, SafeAreaView, BucketListItem, Button } from '@components';
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, getDoc, onSnapshot } from 'firebase/firestore';
import { HikingTrailsData } from '@data';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

          if (bucketList.length === 0) {
            setHikingTrails([]); // Clear the hiking trails state if the bucket list is empty
          } else {
            const hikingTrails = HikingTrailsData.filter((trail) => {
              return bucketList.some((item) => item.name === trail.name);
            });
            console.log('Filtered Hiking Trails:', hikingTrails);
            setHikingTrails(hikingTrails);
          }
        } else {
          console.log('User document does not exist'); // Wrote these statements to check my errors because I could not figure out why I didnt receive data from firebase.
        }
      } catch (error) {
        console.log('Error fetching hiking trails:', error);
      }
    };

    fetchHikingTrails()
  }, [hikingTrails]);

  const goExplore = () => {
    navigation.navigate('Explore');
  };
  
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} edges={['right', 'left', 'bottom']}>
        <ScrollView scrollEventThrottle={8}>
          <Header title="Bucket List" />
          <View style={styles.container}>
            {hikingTrails.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Icon name="inbox" size={50} color="#ccc" />
                <Text style={styles.emptyText}>You have nothing saved to your bucket list.</Text>
                <Button style={{ marginTop: 10 }} onPress={goExplore}>Explore Hiking Trails</Button>
              </View>
            ) : (
              hikingTrails.map((trail, index) => (
                <BucketListItem
                  key={index}
                  name={trail.name}
                  location={trail.location}
                  summitHeight={trail.summitHeight}
                  duration={trail.duration}
                  ydsGrading={trail.ydsGrading}
                  ydsClass={trail.ydsClass}
                  style={{ marginTop: 10, width: '100%' }}
                  image={trail.imageSrc}
                  onPress={() => {
                    navigation.navigate('HikingTrailDetail', {
                      name: trail.name,
                      location: trail.location,
                      duration: trail.duration,
                      summitHeight: trail.summitHeight,
                      imageSrc: trail.imageSrc,
                    });
                  }}
                />
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 270,
  },
  emptyText: {
    marginTop: 10,
    fontFamily: 'ATF Franklin Gothic Light',
    fontSize: 12,
    textAlign: 'center',
    color: '#999999', 
    alignSelf: 'center', 
  },
});




