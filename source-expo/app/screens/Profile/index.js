import React, {useState, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import {useDispatch} from 'react-redux';
import { doc, getDoc } from "firebase/firestore";
import {AuthActions} from '@actions';
import {BaseStyle} from '@config';
import firebase from 'firebase/compat/app';
import { StyleSheet } from 'react-native';
import 'firebase/compat/firestore';

import CollapsibleCard from './CollabsibleCard';
import SliderCard from './SlideCard';
import LowerBodyCard from './LowerBody';
import BSCard from './BandSCard';
import FlexibilityCard from './FlexibilityCard';
import OutdoorExperienceCard from './OutdoorExperienceCard';
import HikingComfortCard from './HikingComfortCard';





import {
  SafeAreaView,
  Text,
  TextInput
} from '@components';
import styles from './styles';
import Slider from '@react-native-community/slider';
import RNPickerSelect from "react-native-picker-select";
import MeterComponent from './meter';

// Imports for firebase (you can get this from firebase.js as well to make it cleaner)
const firebaseConfig = {
  apiKey: "AIzaSyD46mMFUwZ7AlCJWPqOXK3SKw1BuIihlFM",
  authDomain: "hikingproject-3abef.firebaseapp.com",
  projectId: "hikingproject-3abef",
  storageBucket: "hikingproject-3abef.appspot.com",
  messagingSenderId: "23275209713",
  appId: "1:23275209713:web:3579558675b39890b47a50",
  measurementId: "G-7H0L154L10"
};

// Important initialization. must be done in index.js
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

export default function Profile({navigation}) {
  // for collabsable
  const [showPhysicalSustainability, setShowPhysicalSustainability] = useState(false);
  const [showUpperBodyStrength, setShowUpperBodyStrength] = useState(false);



  const [loading, setLoading] = useState(false);

  const [totalScore, setTotalScore] = useState(0);
  
  const [naming, setNaming] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  
  const [physicalSustainability, setPhysicalSustainability] = useState(1);
  const [upperBodyStrength, setUpperBodyStrength] = useState(1);
  const [lowerBodyStrength, setLowerBodyStrength] = useState(1);
  const [balanceStability, setBalanceStability] = useState(1);
  const [flexibility, setFlexibility] = useState(1);
  const [outdoorExperienceFrequency, setOutdoorExperienceFrequency] = useState(1);
  const [outdoorExperienceComfort, setOutdoorExperienceComfort] = useState(1);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = 'pIRDa83OOxomB7Gr6czm';
        const userDocRef = doc(db, 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);
  
        if (userDocSnapshot.exists()) {
          const userRecord = userDocSnapshot.get('userProfile') || [];
          const existingUserRecord = userRecord[0];
          
          setNaming(existingUserRecord?.naming);
          setEmail(existingUserRecord?.email);
          setGender(existingUserRecord?.gender);
          setBirthday(existingUserRecord?.birthday);
          setHeight(Number(existingUserRecord?.height));
          setWeight(Number(existingUserRecord?.weight));
        } else {
          console.log('Document does not exist');
        }
      } catch (error) {
        console.log('Error fetching physical activities data', error);
      }
    };

    const fetchPhysicalActivities = async () => {
      try {
        const userId = 'xIAJtDxUUahHf2kgMjPf';
        const userDocRef = doc(db, 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);
  
        if (userDocSnapshot.exists()) {
          const physicalRecord = userDocSnapshot.get('physicalActivities') || [];
          const existingPhysicalRecord = physicalRecord[0]
          
          setPhysicalSustainability(existingPhysicalRecord?.physicalSustainability);
          setUpperBodyStrength(existingPhysicalRecord?.upperBodyStrength);
          setLowerBodyStrength(existingPhysicalRecord?.lowerBodyStrength);
          setBalanceStability(existingPhysicalRecord?.balanceStability);
          setFlexibility(existingPhysicalRecord?.flexibility);
          setOutdoorExperienceFrequency(existingPhysicalRecord?.outdoorExperienceFrequency);
          setOutdoorExperienceComfort(existingPhysicalRecord?.outdoorExperienceComfort);
        } else {
          console.log('Document does not exist');
        }
      } catch (error) {
        console.log('Error fetching physical activities data', error);
      }
    };
  
    fetchUserProfile();
    fetchPhysicalActivities();
  }, []);

  useEffect(() => {
    total = physicalSustainability + upperBodyStrength + lowerBodyStrength + balanceStability + flexibility + outdoorExperienceFrequency + outdoorExperienceComfort;
    setTotalScore(total)
  }, [physicalSustainability, upperBodyStrength, lowerBodyStrength, balanceStability, flexibility, outdoorExperienceFrequency, outdoorExperienceComfort])

  //error catchers
  const onSaveProfile = async () => {
    try {
      const userId1 = 'pIRDa83OOxomB7Gr6czm';
      const userId2 = 'xIAJtDxUUahHf2kgMjPf';
  
      // Validate the compulsory fields
      if (!naming || !email || !gender || !birthday || !height || !weight) {
        Alert.alert('Error', 'Please fill in all required fields.');
        return;
      }
  
      // Validate the birthday format (DD-MM-YYYY)
      const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
      if (!dateRegex.test(birthday)) {
        Alert.alert('Error', 'Please enter a valid birthday in DD-MM-YYYY format.');
        return;
      }
  
      // Validate the height and weight as numbers
      if (isNaN(height) || isNaN(weight)) {
        Alert.alert('Error', 'Please enter valid numeric values for height and weight.');
        return;
      }
  
      // Save the user profile data
      const userProfileRef = db.collection('users').doc(userId1);
      const userProfileData = {
        naming,
        email,
        gender,
        birthday,
        height: Number(height),
        weight: Number(weight),
      };
      await userProfileRef.update({
        'userProfile.0': userProfileData
      });
      console.log('User profile saved successfully!');
  
      // Save the physical activity data
      const physicalActivityRef = db.collection('users').doc(userId2);
      const physicalActivityData = {
        userId1,
        physicalSustainability,
        upperBodyStrength,
        lowerBodyStrength,
        balanceStability,
        flexibility,
        outdoorExperienceFrequency,
        outdoorExperienceComfort,
      };
      await physicalActivityRef.update({
        'physicalActivities.0': physicalActivityData
      });
      console.log('Physical activity data saved successfully!');
  
      // Show the success message
      Alert.alert('Success', 'Saved successfully!');
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };
  
  const dispatch = useDispatch();

  onLogOut = () => {
    setLoading(true);
    dispatch(AuthActions.authentication(false, response => {}));
  };

  //questions
  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={{ marginTop: 60, ...BaseStyle.safeAreaView }}
        edges={['right', 'left', 'bottom']}>
        <ScrollView>
        <View style={styles.contain}>
            <MeterComponent totalScore={totalScore} />

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
                    { label: 'Select a Gender', value: '' },
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Other', value: 'Other' },
                  ]}
                  style={pickerSelectStyles}
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

          

         <View style={{ padding: 15 }}>
            <View style={styles.cardContainer}>
              <CollapsibleCard
                title="Rate your ability to sustain physical activity for an extended period:"
                value={physicalSustainability}
                onValueChange={setPhysicalSustainability}
              />
            </View>


            <View style={styles.cardContainer}>
              <SliderCard
                title="Rate your perceived upper body strength:"
                value={upperBodyStrength}
                onValueChange={setUpperBodyStrength}
                collapsed={showUpperBodyStrength}
                onToggle={() => setShowUpperBodyStrength(!showUpperBodyStrength)}
              />
            </View>


            <View style={styles.cardContainer}> 
              <LowerBodyCard
                title="Rate your perceived lower body strength:"
                value={lowerBodyStrength}
                onValueChange={setLowerBodyStrength}
              />
            </View>

            <View>
              
            
              <View style={styles.cardContainer}>
                <BSCard
                  title="Balance and Stability:"
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
                  title="Flexibility:"
                  value={flexibility}
                  onValueChange={setFlexibility}
                  selectorItems={[
                    { label: 'Yes, easily', value: 10 },
                    { label: 'Yes, but with some difficulty', value: 5 },
                    { label: 'No, unable to reach toes', value: 1 },
                  ]}
                />
              </View>
                

              <View style={styles.cardContainer}>
                <OutdoorExperienceCard
                  title="Outdoor Experience:"
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
                
              <View style={styles.cardContainer}>
                <HikingComfortCard
                  title="How comfortable are you with hiking on challenging terrains?"
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

          <View style={{ flex: 1 }}>
              <SafeAreaView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                  <View style={styles.contain}>
                  </View>
                  <View style={styles.saveButtonContainer}>
                    <TouchableOpacity style={styles.saveButton} onPress={onSaveProfile}>
                      <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </SafeAreaView>
            </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}


const pickerSelectStyles = StyleSheet.create({

  container: {
    padding: 100,
  },
  cardContainer: {
    marginBottom: 20,
  },

  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});
