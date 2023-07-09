import React, { useState } from 'react';
import {View, ScrollView, Animated, TouchableOpacity} from 'react-native';
import {BaseColor, Images} from '@config';
import {
  Header,
  SafeAreaView,
  Text,
  BucketListItem,
} from '@components';
import * as Utils from '@utils';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import { HikingTrailsData } from '@data';

export default function BucketList({navigation}) {
  const {t} = useTranslation();

  const [hikingTrailsData, setHikingTrails] = useState(HikingTrailsData)

  const deltaY = new Animated.Value(0);
  const heightHeader = Utils.heightHeader();
  const heightImageBanner = Utils.scaleWithPixel(250);

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}} edges={['right', 'left', 'bottom']}>
        <ScrollView
          scrollEventThrottle={8}>
          <Header
            title="Bucket List"
          />
          <View
            style={{
              paddingHorizontal: 20,
              marginBottom: 20
            }}>
            {hikingTrailsData?.map((trail, index) => (
              <BucketListItem
                key={index}
                name={trail.name}
                location={trail.location}
                summitHeight={trail.summitHeight}
                duration={trail.duration}
                ydsGrading={trail.ydsGrading}
                ydsClass={trail.ydsClass}
                style={{marginTop: 10, width: '100%'}}
                image={Images.trail1}
                onPress={() => {
                  navigation.navigate('HikingTrailDetail');
                }}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
