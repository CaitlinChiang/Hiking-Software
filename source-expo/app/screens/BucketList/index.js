import React from 'react';
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

export default function BucketList({navigation}) {
  const {t} = useTranslation();

  const deltaY = new Animated.Value(0);
  const heightHeader = Utils.heightHeader();
  const heightImageBanner = Utils.scaleWithPixel(250);

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}} edges={['right', 'left', 'bottom']}>
        <ScrollView
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: deltaY},
              },
            },
          ])}
          scrollEventThrottle={8}>
          <Header
            title="Bucket List"
          />
          <View
            style={{
              paddingHorizontal: 20,
              marginBottom: 20
            }}>
            {Array.from({ length: 8 }).map((_, index) => (
              <BucketListItem
                title="Mountain Sample"
                location="Country, Address"
                summitHeight="1000m"
                duration="1 day"
                ydsGrading="VII"
                ydsClass="4"
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
