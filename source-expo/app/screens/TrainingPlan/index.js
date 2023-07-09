import React, {useState} from 'react';
import {FlatList, RefreshControl, View} from 'react-native';
import {BaseStyle, useTheme, BaseColor} from '@config';
import {Header, SafeAreaView, BookingHistory, Icon} from '@components';
import {BookingHistoryData} from '@data';
import {useTranslation} from 'react-i18next';
import styles from './styles';

export default function Booking({navigation}) {
  const {t} = useTranslation();
  const {colors} = useTheme();

  const [refreshing] = useState(false);
  const [bookingHistory] = useState(BookingHistoryData);

  const renderItem = item => {
    return (
      <BookingHistory
        name={item.name}
        checkIn={item.checkIn}
        checkOut={item.checkOut}
        total={item.total}
        price={item.price}
        style={{paddingVertical: 10, marginHorizontal: 20}}
        onPress={() => {
          navigation.navigate('TrainingDetail');
        }}
      />
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title="Training Schedule"
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <FlatList
          refreshControl={
            <RefreshControl
              colors={[colors.primary]}
              tintColor={colors.primary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }
          data={bookingHistory}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => renderItem(item)}
        />
      </SafeAreaView>
    </View>
  );
}
