import React, {useState} from 'react';
import { ScrollView, View, Animated} from 'react-native';
import {BaseStyle, useTheme, BaseColor, Images} from '@config';
import {Header, Text, SafeAreaView, TrainingExercise, Icon} from '@components';
import {TrainingExerciseData} from '@data';
import {useTranslation} from 'react-i18next';
import styles from './styles';

export default function Booking({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const [trainingExercises] = useState(TrainingExerciseData);

  const test_data = trainingExercises?.map((item, index) => {
    return (
      <View style={{ marginTop: 20 }} key={index}>
        <Text title1 semibold style={{ paddingHorizontal: 20 }}>
          {item.title}
        </Text>
        <Text title3 semibold style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          {item.duration}
        </Text>
  
        <Animated.Image
          source={item.image}
          style={{
            ...styles.image,
            marginTop: 20,
            height: 250,
            width: '90%',
            alignSelf: 'center',
            borderRadius: 10,
          }}
        />
  
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text title3 semibold style={{ marginBottom: 10 }}>
            Exercise Instructions:
          </Text>
          {item.instructions.map((instruction, innerIndex) => (
            <Text key={innerIndex} style={{ marginTop: 10 }}>
              {instruction}
            </Text>
          ))}
        </View>
      </View>
    );
  });
  
  const getRandomElements = (array, count) => {
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
  
  const randomElements = getRandomElements(test_data, 5);
  const randomElement = randomElements[0];

  return (
    <View style={{flex: 1}}>
      <ScrollView>
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
          {randomElement}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
