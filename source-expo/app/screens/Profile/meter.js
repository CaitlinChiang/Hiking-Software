import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import RNSpeedometer from 'react-native-speedometer';

const MeterComponent = ({ totalScore }) => {
  const [meterValue, setMeterValue] = useState(10);

  useEffect(() => {
    setMeterValue(totalScore);
  }, [totalScore]);

  return (
    <SafeAreaView style={styles.container}>
      <RNSpeedometer
        value={meterValue}
        size={250}
        minValue={0}
        maxValue={70}
        allowedDecimals={0}
        labels={[
          {
            name: 'E',
            labelColor: '#E4766F',
            activeBarColor: '#FE8B71',
          },
          {
            name: 'D',
            labelColor: '#CF792A',
            activeBarColor: '#F4A67A',
          },
          {
            name: 'C',
            labelColor: '#F8955E',
            activeBarColor: '#F9CD79',
          },
          {
            name: 'B',
            labelColor: '#D3CB7D',
            activeBarColor: '#F3E98D',
          },
          {
            name: 'A',
            labelColor: '#A6C06F',
            activeBarColor: '#C3E182',
            fontSize: 100,
          },
        ]}
        labelStyle={{
          fontSize: 30,
        }}
      />
      <View style={{ marginTop: 50, paddingHorizontal: 20 }} />
    </SafeAreaView>
  );
};

export default MeterComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
