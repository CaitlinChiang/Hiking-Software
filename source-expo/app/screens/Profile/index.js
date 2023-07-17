import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';
import {BaseStyle, useTheme} from '@config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';


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


import {
  SafeAreaView,
  Text,
  ProfileDetail,
  TextInput,
  DatePicker
} from '@components';
import styles from './styles';
import {UserData} from '@data';
import {useTranslation} from 'react-i18next';
import Slider from '@react-native-community/slider';
import RNPickerSelect from "react-native-picker-select";
// import RadarChartComponent from './Chart';
import MeterComponent from './meter';

// Important initialization. must be done in index.js
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

export default function Profile({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const [userData] = useState(UserData[0]);
  const [id, setId] = useState(UserData[0].id);
  const [naming, setNaming] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [image] = useState(UserData[0].image);
  const [physicalSustainability, setPhysicalSustainability] = useState(1);
  const [upperBodyStrength, setUpperBodyStrength] = useState(1);
  const [lowerBodyStrength, setLowerBodyStrength] = useState(1);
  const [balanceStability, setBalanceStability] = useState('');
  const [flexibility, setFlexibility] = useState('');
  const [outdoorExperienceFrequency, setOutdoorExperienceFrequency] = useState('');
  const [outdoorExperienceComfort, setOutdoorExperienceComfort] = useState('');
  const calculatetotalscore = () => {
    return physicalSustainability + upperBodyStrength + lowerBodyStrength;
  }; 


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
        userProfile: firebase.firestore.FieldValue.arrayUnion(userProfileData),
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
        physicalActivities: firebase.firestore.FieldValue.arrayUnion(physicalActivityData),
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
            {<MeterComponent />}

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
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Gender'}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setGender(text)}
              placeholder={'Input Gender'}
              value={gender}
            />
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
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Height (cm)'}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setHeight(text)}
              placeholder={'Input Weight'}
              value={height}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Weight (kg)'}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setWeight(text)}
              placeholder={'Input Weight'}
              value={weight}
            />
            </View>

         <View>
            <Text style={{ padding: 20 }} headline semibold>Rate your ability to sustain physical activity for an extended period:</Text>
            <Text style={{ textAlign: 'center' }} headline semibold>{physicalSustainability}</Text>
            <Slider
              style={{ marginRight: 50, marginLeft: 50 }}
              minimumValue={1}
              maximumValue={5}
              step={1}
              minimumTrackTintColor="blue"
              maximumTrackTintColor="grey"
              value={physicalSustainability}
              onValueChange={(value) => setPhysicalSustainability(value)}
            />
            <View style={{ padding: 20 }}>
              <Text>1 (Very low endurance)</Text>
              <Text>2 (Low endurance)</Text>
              <Text>3 (Moderate endurance)</Text>
              <Text>4 (Above average endurance)</Text>
              <Text>5 (Exceptional endurance)</Text>
            </View>

            <Text style={{ padding: 20 }} headline semibold>Rate your perceived upper body strength:</Text>
            <Text style={{ textAlign: 'center' }} headline semibold>{upperBodyStrength}</Text>
            <Slider
              style={{ marginRight: 50, marginLeft: 50 }}
              minimumValue={1}
              maximumValue={10}
              step={1}
              minimumTrackTintColor="blue"
              maximumTrackTintColor="grey"
              value={upperBodyStrength}
              onValueChange={(value) => setUpperBodyStrength(value)}
            />
            <View style={{ padding: 20 }}>
              <Text>1 (Very weak)</Text>
              <Text>3 (Low strength)</Text>
              <Text>5 (Average strength)</Text>
              <Text>7 (Above average strength)</Text>
              <Text>10 (Very strong)</Text>
            </View>

            <Text style={{ padding: 20 }} headline semibold>Rate your perceived lower body strength:</Text>
            <Text style={{ textAlign: 'center' }} headline semibold>{lowerBodyStrength}</Text>
            <Slider
              style={{ marginRight: 50, marginLeft: 50 }}
              minimumValue={1}
              maximumValue={10}
              step={1}
              minimumTrackTintColor="blue"
              maximumTrackTintColor="grey"
              value={lowerBodyStrength}
              onValueChange={(value) => setLowerBodyStrength(value)}
            />
            <View style={{ padding: 20 }}>
              <Text>1 (Very weak)</Text>
              <Text>3 (Low strength)</Text>
              <Text>5 (Average strength)</Text>
              <Text>7 (Above average strength)</Text>
              <Text>10 (Very strong)</Text>
            </View>

            <View>
              <View style={{ padding: 20 }}>
                <Text style={{ marginBottom: 10 }} headline semibold>Balance and Stability:</Text>
                <RNPickerSelect
                  onValueChange={(value) => setBalanceStability}
                  items={[
                    { label: "Not Confident at All", value: "notConfident" },
                    { label: "Somewhat Confident", value: "somewhatConfident" },
                    { label: "Very Confident", value: "veryConfident" }
                  ]}
                  style={styles.inputIOS}
                  value={balanceStability}
                />

                <Text style={{ marginBottom: 10, marginTop: 50 }} headline semibold>Flexibility:</Text>
                <RNPickerSelect
                  onValueChange={(value) => setFlexibility(value)}
                  items={[
                    { label: "Yes, easily", value: "easily" },
                    { label: "Yes, but with some difficulty", value: "withDifficulty" },
                    { label: "No, unable to reach toes", value: "unable" }
                  ]}
                  style={styles.inputIOS}
                  value={flexibility}
                />
                
                <Text style={{ marginBottom: 10, marginTop: 50 }} headline semibold>Outdoor Experience:</Text>
                <RNPickerSelect
                  onValueChange={(value) => setOutdoorExperienceFrequency(value)}
                  items={[
                    { label: "Rarely or never", value: "rarelyNever" },
                    { label: "Occasionally (once a month or less)", value: "occasionally" },
                    { label: "Regularly (a few times a month)", value: "regularly" },
                    { label: "Frequently (at least once a week)", value: "frequently" }
                  ]}
                  style={styles.inputIOS}
                  value={outdoorExperienceFrequency}
                />
                
                <Text style={{ marginBottom: 10, marginTop: 50 }} headline semibold>How comfortable are you with hiking on challenging terrains?</Text>
                <RNPickerSelect
                  onValueChange={(value) => setOutdoorExperienceComfort(value)}
                  items={[
                    { label: "Not comfortable at all", value: "notComfortable" },
                    { label: "Somewhat comfortable", value: "somewhatComfortable" },
                    { label: "Very comfortable", value: "veryComfortable" }
                  ]}
                  style={styles.inputIOS}
                  value={outdoorExperienceComfort}
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
