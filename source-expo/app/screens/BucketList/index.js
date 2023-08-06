import React, { useState, useEffect } from 'react'
import { View, ScrollView, Text, StyleSheet } from 'react-native'
import { Header, SafeAreaView, BucketListItem, Button } from '@components'
import { initializeApp } from 'firebase/app'
import { doc, getFirestore, getDoc } from 'firebase/firestore'
import { HikingTrailsData } from '@data'
import Icon from 'react-native-vector-icons/FontAwesome'

// DATABASE
const firebaseConfig = {
  apiKey: "AIzaSyD46mMFUwZ7AlCJWPqOXK3SKw1BuIihlFM",
  authDomain: "hikingproject-3abef.firebaseapp.com",
  projectId: "hikingproject-3abef",
  storageBucket: "hikingproject-3abef.appspot.com",
  messagingSenderId: "23275209713",
  appId: "1:23275209713:web:3579558675b39890b47a50",
  measurementId: "G-7H0L154L10"
}
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default function BucketList({ navigation }) {
  const [hikingTrails, setHikingTrails] = useState([])
  const [upcomingTrails, setUpcomingTrails] = useState([])

  useEffect(() => {
    const fetchHikingTrails = async () => {
      const userDocRef = doc(db, 'users', 'jxihUCNoi0396wkQR2gx')
      const userDocSnapshot = await getDoc(userDocRef)
      
      if (userDocSnapshot.exists()) {
        const bucketList = userDocSnapshot.get('bucketlist') || []
        const upcomingList = userDocSnapshot.get('upcoming') || []

        if (bucketList.length > 0) {
          const hikingTrails = HikingTrailsData.filter((trail) => {
            return bucketList.some((item) => item.name === trail.name)
          })
          setHikingTrails(hikingTrails)
        }

        if (upcomingList.length > 0) {
          const upcomingTrails = HikingTrailsData.filter((trail) => {
            return upcomingList.some((item) => item.mountainName === trail.name)
          })
          setUpcomingTrails(upcomingTrails)
        }
      }
    }

    fetchHikingTrails()
  }, [hikingTrails, upcomingTrails])

  const goExplore = () => {
    navigation.navigate('Explore')
  }
  
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} edges={['right', 'left', 'bottom']}>
        <ScrollView scrollEventThrottle={8}>
          <Header title="Bucket List" />
          <View style={styles.container}>
            <Text style={{ fontSize: 18 }}>Upcoming Hikes</Text>
            {upcomingTrails.length === 0 ? (
              <View style={styles.emptyContainer1}>
                <Icon name="inbox" size={50} color="#ccc" />
                <Text>You do not have any upcoming hikes.</Text>
              </View>
            ) : (
              upcomingTrails.map((trail, index) => (
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
                    })
                  }}
                />
              ))
            )}
          </View>
          
          <View style={styles.container}>
            <Text style={{ fontSize: 18 }}>Bucket List</Text>
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
                    })
                  }}
                />
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyContainer1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 20
  },
  emptyText: {
    marginTop: 10,
    fontSize: 12,
    textAlign: 'center',
    color: '#999999', 
    alignSelf: 'center', 
  },
})
