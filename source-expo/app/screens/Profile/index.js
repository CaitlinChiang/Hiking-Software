import React, {useState, useEffect} from 'react'
import {View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { doc, getDoc } from "firebase/firestore"
import {BaseStyle} from '@config'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import RNPickerSelect from "react-native-picker-select"
import CollapsibleCard from './CollabsibleCard'
import SliderCard from './SlideCard'
import LowerBodyCard from './LowerBody'
import BSCard from './BandSCard'
import FlexibilityCard from './FlexibilityCard'
import OutdoorExperienceCard from './OutdoorExperienceCard'
import HikingComfortCard from './HikingComfortCard'
import {
  SafeAreaView,
  Text,
  TextInput
} from '@components'
import styles from './styles'
import MeterComponent from './meter'

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
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
const db = firebase.firestore()

export default function Profile() {
  const [naming, setNaming] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('')
  const [birthday, setBirthday] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')

  const [showPhysicalSustainability, setShowPhysicalSustainability] = useState(true)
  const [showUpperBodyStrength, setShowUpperBodyStrength] = useState(true)
  const [physicalSustainability, setPhysicalSustainability] = useState(0)
  const [upperBodyStrength, setUpperBodyStrength] = useState(0)
  const [lowerBodyStrength, setLowerBodyStrength] = useState(0)
  const [balanceStability, setBalanceStability] = useState(0)
  const [flexibility, setFlexibility] = useState(0)
  const [outdoorExperienceFrequency, setOutdoorExperienceFrequency] = useState(0)
  const [outdoorExperienceComfort, setOutdoorExperienceComfort] = useState(0)
  const [totalScore, setTotalScore] = useState(0)

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userId = 'pIRDa83OOxomB7Gr6czm'
      const userDocRef = doc(db, 'users', userId)
      const userDocSnapshot = await getDoc(userDocRef)

      if (userDocSnapshot.exists()) {
        const userRecord = userDocSnapshot.get('userProfile') || []
        const existingUserRecord = userRecord[0]
        
        setNaming(existingUserRecord?.naming)
        setEmail(existingUserRecord?.email)
        setGender(existingUserRecord?.gender)
        setBirthday(existingUserRecord?.birthday)
        setHeight(Number(existingUserRecord?.height))
        setWeight(Number(existingUserRecord?.weight))
      }
    }

    const fetchPhysicalActivities = async () => {
      const userId = 'xIAJtDxUUahHf2kgMjPf'
      const userDocRef = doc(db, 'users', userId)
      const userDocSnapshot = await getDoc(userDocRef)

      if (userDocSnapshot.exists()) {
        const physicalRecord = userDocSnapshot.get('physicalActivities') || []
        const existingPhysicalRecord = physicalRecord[0]
        
        setPhysicalSustainability(existingPhysicalRecord?.physicalSustainability)
        setUpperBodyStrength(existingPhysicalRecord?.upperBodyStrength)
        setLowerBodyStrength(existingPhysicalRecord?.lowerBodyStrength)
        setBalanceStability(existingPhysicalRecord?.balanceStability)
        setFlexibility(existingPhysicalRecord?.flexibility)
        setOutdoorExperienceFrequency(existingPhysicalRecord?.outdoorExperienceFrequency)
        setOutdoorExperienceComfort(existingPhysicalRecord?.outdoorExperienceComfort)
      }
    }
  
    fetchUserProfile()
    fetchPhysicalActivities()
  }, [])

  useEffect(() => {
    const total = physicalSustainability + upperBodyStrength + lowerBodyStrength + balanceStability + flexibility + outdoorExperienceFrequency + outdoorExperienceComfort
    setTotalScore(total)
  }, [physicalSustainability, upperBodyStrength, lowerBodyStrength, balanceStability, flexibility, outdoorExperienceFrequency, outdoorExperienceComfort])

  const onSaveProfile = async () => {
    try {
      const userId1 = 'pIRDa83OOxomB7Gr6czm'
      const userId2 = 'xIAJtDxUUahHf2kgMjPf'
  
      // Validate the compulsory fields
      if (!naming || !email || !gender || !birthday || !height || !weight) {
        Alert.alert('Error', 'Please fill in all required fields.')
        return
      }
  
      // Validate the birthday format (DD-MM-YYYY)
      const dateRegex = /^\d{2}-\d{2}-\d{4}$/
      if (!dateRegex.test(birthday)) {
        Alert.alert('Error', 'Please enter a valid birthday in DD-MM-YYYY format.')
        return
      }
  
      // Validate the height and weight as numbers
      if (isNaN(height) || isNaN(weight)) {
        Alert.alert('Error', 'Please enter valid numeric values for height and weight.')
        return
      }
  
      // Save the user profile data
      const userProfileRef = db.collection('users').doc(userId1)
      const userProfileData = {
        naming,
        email,
        gender,
        birthday,
        height: Number(height),
        weight: Number(weight),
      }
      await userProfileRef.update({
        'userProfile.0': userProfileData
      })
  
      // Save the physical activity data
      const physicalActivityRef = db.collection('users').doc(userId2)
      const physicalActivityData = {
        userId1,
        physicalSustainability,
        upperBodyStrength,
        lowerBodyStrength,
        balanceStability,
        flexibility,
        outdoorExperienceFrequency,
        outdoorExperienceComfort,
      }
      await physicalActivityRef.update({
        'physicalActivities.0': physicalActivityData
      })
  
      // Show the success message
      Alert.alert('Success', 'Saved successfully!')
    } catch (error) {
      Alert.alert('Error in Saving Data', error)
      console.log('Error saving data:', error)
    }
  }

  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={{ marginTop: 70, ...BaseStyle.safeAreaView }}
        edges={['right', 'left', 'bottom']}>
        <ScrollView>

        <View style={styles.contain}>
          <MeterComponent totalScore={totalScore} />

          <View style = {styles.profileSelect}>
            <View>
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  {'Name'}
                </Text>
              </View>
              <TextInput
                onChangeText={text => setNaming(text)}
                placeholder={'Input Name'}
                value={naming}
              />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <View style={styles.contentTitle}>
                  <Text headline semibold>
                    {'Birthday'}
                  </Text>
                </View>
                <TextInput
                  onChangeText={text => setBirthday(text)}
                  placeholder={'DD-MM-YYYY'}
                  value={birthday}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <View style={styles.contentTitle}>
                  <Text headline semibold>
                    {'Gender'}
                  </Text>
                </View>
                <RNPickerSelect
                  onValueChange={(value) => setGender(value)}
                  items={[
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Other', value: 'Other' },
                  ]}
                  value={gender}
                />
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <View style={styles.contentTitle}>
                  <Text headline semibold>
                    {'Height (cm)'}
                  </Text>
                </View>
                <TextInput
                  onChangeText={text => setHeight(text)}
                  placeholder={'Input Height'}
                  value={String(height)}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <View style={styles.contentTitle}>
                  <Text headline semibold>
                    {'Weight (kg)'}
                  </Text>
                </View>
                <TextInput
                  onChangeText={text => setWeight(text)}
                  placeholder={'Input Weight'}
                  value={String(weight)}
                />
              </View>
            </View>

            <View>
              <View style={styles.contentTitle}>
                <Text headline semibold>
                  {'Email'}
                </Text>
              </View>
              <TextInput
                onChangeText={text => setEmail(text)}
                placeholder={'Input Email'}
                value={email}
              />
              </View>    
            </View>       
          </View>

         <View style={{ padding: 15 }}>
            <View style={styles.cardContainer}>
              <CollapsibleCard
                title="Stamina"
                value={physicalSustainability}
                onValueChange={setPhysicalSustainability}
                collapsed={showPhysicalSustainability}
                onToggle={() => setShowPhysicalSustainability(!showPhysicalSustainability)}
              />
            </View>

            <View style={styles.cardContainer}>
              <SliderCard
                title="Upper Body Strength"
                value={upperBodyStrength}
                onValueChange={setUpperBodyStrength}
                collapsed={showUpperBodyStrength}
                onToggle={() => setShowUpperBodyStrength(!showUpperBodyStrength)}
              />
            </View>

            <View style={styles.cardContainer}> 
              <LowerBodyCard
                title="Lower Body Strength"
                value={lowerBodyStrength}
                onValueChange={setLowerBodyStrength}
              />
            </View>

            <View>
              <View style={styles.cardContainer}>
                <BSCard
                  title="Balance and Stability"
                  value={balanceStability}
                  onValueChange={setBalanceStability}
                  selectorItems={[
                    { label: 'Not Confident at All', value: 1 },
                    { label: 'Somewhat Confident', value: 5 },
                    { label: 'Very Confident', value: 10 },
                  ]}
                />
              </View>

              <View style={styles.cardContainer}>
                <FlexibilityCard
                  title="Flexibility"
                  value={flexibility}
                  onValueChange={setFlexibility}
                  selectorItems={[
                    { label: 'No, unable to reach toes', value: 1 },
                    { label: 'Yes, but with some difficulty', value: 5 },
                    { label: 'Yes, easily', value: 10 }
                  ]}
                />
              </View>

              <View style={styles.cardContainer}>
                <OutdoorExperienceCard
                  title="Outdoor Experience"
                  value={outdoorExperienceFrequency}
                  onValueChange={setOutdoorExperienceFrequency}
                  selectorItems={[
                    { label: 'Rarely or never', value: 2 },
                    { label: 'Occasionally (once a month or less)', value: 5 },
                    { label: 'Regularly (a few times a month)', value: 8 },
                    { label: 'Frequently (at least once a week)', value: 10 },
                  ]}
                />
              </View>
                
              <View style={{ ...styles.cardContainer, ...styles.lastCardContainer }}>
                <HikingComfortCard
                  title="Hiking Comfort"
                  value={outdoorExperienceComfort}
                  onValueChange={setOutdoorExperienceComfort}
                  selectorItems={[
                    { label: 'Not comfortable at all', value: 1 },
                    { label: 'Somewhat comfortable', value: 5 },
                    { label: 'Very comfortable', value: 10 },
                  ]}
                />
              </View>

            </View>
          </View>

          <View style={styles.saveButtonContainer}>
            <TouchableOpacity style={styles.saveButton} onPress={onSaveProfile}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  )
}
