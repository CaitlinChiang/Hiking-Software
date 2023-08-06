import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Text } from 'react-native'
import RNSpeedometer from 'react-native-speedometer'

const MeterComponent = ({ totalScore }) => {
  const [meterValue, setMeterValue] = useState(0)

  useEffect(() => {
    setMeterValue(totalScore)
  }, [totalScore])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RNSpeedometer
        value={meterValue}
        size={250}
        minValue={0}
        maxValue={55}
        allowedDecimals={0}
        labels={[
          {
            name: 'E',
            labelColor: '#E4766F',
            activeBarColor: '#FE8B71'
          },
          {
            name: 'D',
            labelColor: '#CF792A',
            activeBarColor: '#F4A67A'
          },
          {
            name: 'C',
            labelColor: '#F8955E',
            activeBarColor: '#F9CD79'
          },
          {
            name: 'B',
            labelColor: '#D3CB7D',
            activeBarColor: '#F3E98D',
          },
          {
            name: 'A',
            labelColor: '#A6C06F',
            activeBarColor: '#C3E182'
          },
        ]}
        labelStyle={{
          fontSize: 0
        }}
      />
      <View style={{ marginTop: 50, paddingHorizontal: 20, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 20 }}>Physical Score: {meterValue} / 55</Text>
      </View>
    </SafeAreaView>
  )
}

export default MeterComponent
