import React, {useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {BaseStyle, useTheme, BaseColor} from '@config';
import {Header, Text, SafeAreaView, TrainingDetail, Icon, Button} from '@components';
import {TrainingDatesData} from '@data';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import Timeline from 'react-native-timeline-flatlist';
import Slider from '@react-native-community/slider';

export default function Booking({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const [refreshing] = useState(false);
  const [trainingTimeline] = useState(TrainingDatesData);
  const [rating, setRating] = useState(1);

  const test_data = trainingTimeline?.map((item, index) => {
    return (
      <View>
        <View style={styles.listItemContainer} key={index}>
          <View style={index === 4 ? styles.circleContainerCurrent : styles.circleContainer}>
            <Text style={index === 4 ? styles.circleTextCurrent : styles.circleText}>{`July\n${index + 1}`}</Text>
          </View>
          <TrainingDetail
            currentDate={index == 4}
            title={item.title}
            style={{paddingVertical: 5, marginHorizontal: 20, width: '75%' }}
            onPress={() => {
              navigation.navigate('TrainingDetail');
            }}
          />
        </View>
      </View>
    )
  })

  return (
    <View style={{flex: 1}}>
      <Header
        title="Training Schedule"
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>        
        <View style={{ flex: 1, marginTop: 35 }}>
          {test_data}
        </View>
      </SafeAreaView>
    </View>
  );
}
