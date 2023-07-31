import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { BaseStyle, useTheme, BaseColor } from '@config';
import { Header, Text, SafeAreaView, TrainingExercise, Icon, Button } from '@components';
import { TrainingTimelineData } from '@data';
import { useTranslation } from 'react-i18next';
import styles from './styles';
import Timeline from 'react-native-timeline-flatlist';
import Slider from '@react-native-community/slider';
import CheckBox from '@react-native-community/checkbox';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Imports for firebase (you can get this from firebase.js as well to make it cleaner)
const firebaseConfig = {
  // Your Firebase configuration
};

// Important initialization. must be done in index.js
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

const Booking = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const [trainingTimeline] = useState(TrainingTimelineData);
  const [rating, setRating] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSelected, setSelection] = useState(false);


  const test_data = trainingTimeline?.map((item, index) => {
    return {
      description: (
        <TrainingExercise
          title={item.title}
          duration={item.duration}
          style={{ paddingVertical: 10, marginHorizontal: 20, marginTop: -30 }}
          onPress={() => {
            navigation.navigate('TrainingExercise');
          }}
        />
      )
    }
  })

  function getRandomElements(array, count) {
    // Create a copy of the original array
    const shuffled = array.slice();
  
    // Fisher-Yates shuffle algorithm
    let currentIndex = shuffled.length;
    let temporaryValue, randomIndex;
  
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      temporaryValue = shuffled[currentIndex];
      shuffled[currentIndex] = shuffled[randomIndex];
      shuffled[randomIndex] = temporaryValue;
    }
  
    // Return the first 'count' elements
    return shuffled.slice(0, count);
  }

  const randomElements = getRandomElements(test_data, 4);

  // Complete button that saves training progress into Firebase
  const onCompleteTraining = async (exercise, date, difficulty) => {
    try {
      const userId = 'A8N2OS1isndpX5XKeiZb';

      // Save the completed exercise data
      const completedExerciseRef = db.collection('users').doc(userId);
      const completedExerciseData = {
        exercise,
        date,
        difficulty,
      };
      await completedExerciseRef.update({
        completedExercises: firebase.firestore.FieldValue.arrayUnion(completedExerciseData),
      });
      console.log('Completed exercise data saved successfully!');

      // Show the success message
      Alert.alert('Success', 'Exercise completed and saved successfully!');

      // Set completion status and disable the button
      setIsCompleted(true);
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        title=""
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={'grey'}
              enableRTL={true}
            />
          );
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <View style={{ marginTop: 20 }}>
          <Text title1 semibold style={{ paddingHorizontal: 20 }}>
            {'Training #1'}
          </Text>
          <Text title3 style={{ paddingHorizontal: 20, paddingTop: 15 }}>
            {'Date: July 15, 2023'}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ padding: 20 }} title3>Difficulty:</Text>
            <View>
              <Text style={{ textAlign: 'center' }} headline semibold>{rating}</Text>
              <Slider
                style={{ marginLeft: 5 }}
                minimumValue={1}
                maximumValue={10}
                step={1}
                minimumTrackTintColor="blue"
                maximumTrackTintColor="grey"
                value={rating}
                onValueChange={(value) => setRating(value)}
                disabled={isCompleted} // Disable the slider if the exercise is completed
              />
              <Text style={{ textAlign: 'center' }}>1 (least difficult); 10 (most difficult)</Text>
            </View>
          </View>
        </View>

        <View style={{ flex: 1, marginLeft: -20, marginTop: 35 }}>
          <Timeline
            data={randomElements}
            circleSize={20}
            circleColor="#554c3d"
            lineColor="#554c3d"
            innerCircle={'dot'}
          />
        </View>

        <View style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <Button
            onPress={() => onCompleteTraining('Training #1', 'July 15, 2023', rating)}
            disabled={isCompleted}
            style={isCompleted ? styles.completedButton : null}
            textStyle={isCompleted ? styles.completedButtonText : null}
          >
            {isCompleted ? 'Completed' : 'Complete'}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Booking;
