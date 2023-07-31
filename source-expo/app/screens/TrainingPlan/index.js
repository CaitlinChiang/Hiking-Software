import React, {useState, useEffect} from 'react';
import {FlatList, RefreshControl, View, ScrollView } from 'react-native';
import {BaseStyle, useTheme, BaseColor} from '@config';
import {Header, Text, SafeAreaView, TrainingDetail, Icon, Button} from '@components';
import {TrainingDatesData} from '@data';
import { doc, getDoc, updateDoc, deleteField, arrayUnion, arrayRemove } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import {useTranslation} from 'react-i18next';
import styles from './styles';

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


export default function Booking({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const [trainingTimeline] = useState(TrainingDatesData);
  const [mountain, setMountain] = useState({})
  const [showRedirect, setShowRedirect] = useState(false)

  useEffect(() => {
    const fetchCurrentMountain = async () => {
      try {
        const userId = 'jxihUCNoi0396wkQR2gx'; 
        const savedDocRef = doc(db, 'users', userId);
        const savedDocSnapshot = await getDoc(savedDocRef);
  
        if (savedDocSnapshot.exists()) {
          const savedDoc = savedDocSnapshot.data()|| {};
          const mountain = savedDoc?.dates || {};

          if (mountain?.mountainName === '-') {
            setShowRedirect(true)
          } else {
            setShowRedirect(false)
            setMountain(mountain)
          }
        } else {
          console.log('User document does not exist');
        }
      } catch (error) {
        console.log('Error fetching hiking trail data:', error);
      }
    };
  
    fetchCurrentMountain();
  }, [trainingTimeline, mountain]);

  const completeTraining = async () => {
    try {
      const userId = 'jxihUCNoi0396wkQR2gx';
      const bucketListRef = doc(db, 'users', userId);
  
      await updateDoc(bucketListRef, {
        historyList: arrayUnion({ name: mountain?.mountainName })
      });
  
      const savedDocSnapshot = await getDoc(bucketListRef);
  
      if (savedDocSnapshot.exists()) {
        const savedDoc = savedDocSnapshot.data() || {};
        let upcomingList = savedDoc.upcoming || [];
  
        // Remove duplicates based on mountainName
        const uniqueUpcomingList = [];
        const seenMountainNames = {};
  
        for (const item of upcomingList) {
          if (!seenMountainNames[item.mountainName]) {
            seenMountainNames[item.mountainName] = true;
            uniqueUpcomingList.push(item);
          }
        }
  
        upcomingList = uniqueUpcomingList;
  
        if (upcomingList.length > 0) {
          // Sort the bucketList items by ascending startDate
          upcomingList.sort((a, b) => a.startDate.localeCompare(b.startDate));
  
          // Set the first item's startDate, endDate, and mountainName as the new 'dates' object
          const firstItem = upcomingList[0];
          const updatedDates = {
            startDate: firstItem.startDate,
            endDate: firstItem.endDate,
            mountainName: firstItem.mountainName
          };
  
          await updateDoc(bucketListRef, { dates: updatedDates });
  
          // Remove the first item from the bucketList in Firebase
          await updateDoc(bucketListRef, {
            upcoming: arrayRemove(firstItem)
          });
        } else {
          // If bucketList has no items, set the dates object to default values
          const updatedDates = { mountainName: '-', startDate: '', endDate: '' };
          await updateDoc(bucketListRef, { dates: updatedDates });
        }
      } else {
        console.log('User document does not exist');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };  

  const test_data = trainingTimeline?.map((item, index) => {
    return (
      <View>
        <View style={styles.listItemContainer} key={index}>
          <View style={index === 4 ? styles.circleContainerCurrent : (index < 4 ? {...styles.circleContainer, backgroundColor: '#c1c1c1'} : styles.circleContainer) }>
            <Text style={index === 4 ? styles.circleTextCurrent : styles.circleText}>{`July\n${index + 1}`}</Text>
          </View>
          <TrainingDetail
            currentDate={index == 4}
            title={item.title}
            past={index < 4}
            complete={item.complete}
            style={{paddingVertical: 5, marginHorizontal: 20, width: '75%' }}
            onPress={() => {
              navigation.navigate('TrainingDetail');
            }}
          />
        </View>
      </View>
    )
  })

  const goExplore = () => {
    navigation.navigate('Explore');
  };

  const displayPage = () => {
    if (showRedirect) {
      return (
        <SafeAreaView
          style={{ ...BaseStyle.safeAreaView, paddingVertical: 50, paddingHorizontal: 50 }}
          edges={['right', 'left', 'bottom']}>     
          <Text style={styles.emptyText}>{'You are currently not training for any hike, visit our explore page to view our recommendations for you!'}</Text>
          <Button style={{ marginTop: 50  }} onPress={goExplore}>{'Explore Hiking Trails'}</Button>
        </SafeAreaView>
      )
    } else {
      return (
        <SafeAreaView
          style={{ ...BaseStyle.safeAreaView, paddingHorizontal: 20 }}
          edges={['right', 'left', 'bottom']}>
          <View>
            <Text style={{ textAlign: 'center', fontSize: 20, marginTop: 20, paddingHorizontal: 20, fontWeight: 500 }}>{`Training for: ${mountain?.mountainName}`}</Text>
            <Text style={{ textAlign: 'center', fontSize: 15, marginTop: 10, paddingHorizontal: 20 }}>{`Training Start: ${mountain?.startDate}`}</Text>
            <Text style={{ textAlign: 'center', fontSize: 15, marginTop: 10, paddingHorizontal: 20 }}>{`Training End: ${mountain?.endDate}`}</Text>
            <Button style={{ marginTop: 10, textAlign: 'center' }} onPress={completeTraining}>{'Complete Training'}</Button>
          </View>

          <View style={{ flex: 1, marginTop: 35 }}>
            {test_data}
          </View>
        </SafeAreaView>
      )
    }
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Header
          title="Training Schedule"
        />
        {displayPage()}
      </ScrollView>
    </View>
  );
}
