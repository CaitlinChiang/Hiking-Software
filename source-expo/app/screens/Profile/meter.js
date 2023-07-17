import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text
} from 'react-native';


import RNSpeedometer from 'react-native-speedometer';
import Profile, { calculatetotalscore } from './index.js';


const MeterComponent = () => {
  const totalscore = calculatetotalscore
  const[meterValue, setmeterValue] = useState(10)
  useEffect(() => {
    setmeterValue(totalscore);
  }, [totalscore]);
   return(
        <SafeAreaView style={styles.container}>
          <RNSpeedometer
            value = {meterValue}
            size = {250}
            minValue= {0}
            maxValue = {100}
            allowedDecimals = {0}
            labels = {[
              {
                name: 'E',
                labelColor: '#E4766F',
                activeBarColor:'#FE8B71'
              },
              {
                name: 'D',
                labelColor: '#CF792A',
                activeBarColor:'#F4A67A'
              },
              {
                name: 'C',
                labelColor: '#F8955E',
                activeBarColor:'#F9CD79'
              },
              {
                name: 'B',
                labelColor: '#D3CB7D',
                activeBarColor:'#F3E98D'
              },
              {
                name: 'A',
                labelColor: '#A6C06F',
                activeBarColor:'#C3E182',
                fontSize: 100
              }

            ]}
            labelStyle = {{
              fontSize: 30
            }}
          />
          <View style = {{marginTop: 50, padding: 20}}/>
            <Text style = {{fontSize: 20}}>{meterValue}</Text>
        </SafeAreaView>
      );
  };

export default MeterComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    height: 30,
    fontSize: 20,
    marginVertical: 50,
    marginHorizontal: 20,
  },
  labelContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 100, // Default font size for labels
    // Add other common styles for labels if needed
  }
});