import React, {useState} from 'react';
import {FlatList, RefreshControl, View, Animated} from 'react-native';
import {BaseStyle, useTheme, BaseColor, Images} from '@config';
import {Header, Text, SafeAreaView, TrainingExercise, Icon} from '@components';
import {TrainingTimelineData} from '@data';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import Timeline from 'react-native-timeline-flatlist';
import Slider from '@react-native-community/slider';

export default function Booking({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const [refreshing] = useState(false);
  const [trainingTimeline] = useState(TrainingTimelineData);
  const [rating, setRating] = useState(1);

  const test_data = trainingTimeline?.map((item, index) => {
    return {
      description: (
        <TrainingExercise
          title={item.title}
          duration={item.duration}
          style={{paddingVertical: 10, marginHorizontal: 20, marginTop: -30 }}
          onPress={() => {
            navigation.navigate('TrainingExercise');
          }}
        />
      )
    }
  })

  return (
    <View style={{flex: 1}}>
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
            {'Exercise #1'}
          </Text>
          <Text title3 semibold style={{ paddingHorizontal: 20, paddingTop: 10 }}>
            {'1 minute'}
          </Text>

          <Animated.Image
            source={Images.trainingVideo1}
            style={{ ...styles.image, marginTop: 20, height: 250, width: '90%', alignSelf: 'center', borderRadius: 10 }}
          />

          <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
            <Text title3 semibold style={{ marginBottom: 10 }}>Plank Instructions:</Text>
            <Text style={{ marginTop: 10 }}>1. Start by positioning yourself face down on the floor, resting on your forearms and toes.</Text>
            <Text style={{ marginTop: 10 }}>2. Align your elbows directly under your shoulders, with your forearms parallel to each other.</Text>
            <Text style={{ marginTop: 10 }}>3. Engage your core by drawing your belly button in towards your spine.</Text>
            <Text style={{ marginTop: 10 }}>4. Keep your back straight and avoid sagging or arching your lower back.</Text>
            <Text style={{ marginTop: 10 }}>5. Maintain a neutral neck position by looking at the floor a few inches in front of your hands.</Text>
            <Text style={{ marginTop: 10 }}>6. Hold the plank position for as long as you can while maintaining proper form.</Text>
            <Text style={{ marginTop: 10 }}>7. Remember to breathe steadily throughout the exercise.</Text>
            <Text style={{ marginTop: 10 }}>8. To release the plank, gently lower your knees to the floor and rest.</Text>
          </View>
        </View>

      </SafeAreaView>
    </View>
  );
}
