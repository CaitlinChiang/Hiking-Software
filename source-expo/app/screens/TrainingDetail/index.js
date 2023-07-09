import React, {useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {BaseStyle, useTheme, BaseColor} from '@config';
import {Header, Text, SafeAreaView, TrainingExercise, Icon, Button} from '@components';
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
              />
              <Text style={{ textAlign: 'center' }}>1 (least difficult); 10 (most difficult)</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, marginLeft: -20, marginTop: 35 }}>
          <Timeline 
            data={test_data}
            circleSize={20}
            circleColor="#554c3d"
            lineColor="#554c3d"
            innerCircle={'dot'}
          />
        </View>
        
        <View
          style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <Button onPress={() => console.log('Button Pressed')}>
            {'Complete'}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
