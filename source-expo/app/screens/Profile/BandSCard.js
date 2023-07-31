import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Text from '@components/Text';
import Slider from '@react-native-community/slider';
import PlaceholderImage from './Logos/balance.png'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BSCard = ({ title, value, onValueChange }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedValue, setSelectedValue] = useState(value);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleButtonPress = (newValue) => {
    setSelectedValue(newValue);
    onValueChange(newValue);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={toggleCollapsed} style={styles.cardHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={PlaceholderImage} style={{ width: 30, height: 30, marginRight: 10 }} />
          <Text headline semibold>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
      {!collapsed && (
        <View style={styles.cardContent}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.button,
                selectedValue === 1 && styles.selectedButton,
              ]}
              onPress={() => handleButtonPress(1)}
            >
              <Text style={styles.buttonText}>Very low</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selectedValue === 3 && styles.selectedButton,
              ]}
              onPress={() => handleButtonPress(3)}
            >
              <Text style={styles.buttonText}>Low</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selectedValue === 5 && styles.selectedButton,
              ]}
              onPress={() => handleButtonPress(5)}
            >
              <Text style={styles.buttonText}>Moderate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selectedValue === 7 && styles.selectedButton,
              ]}
              onPress={() => handleButtonPress(7)}
            >
              <Text style={styles.buttonText}>Above average</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.button,
                selectedValue === 10 && styles.selectedButton,
              ]}
              onPress={() => handleButtonPress(10)}
            >
              <Text style={styles.buttonText}>Exceptional</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <TouchableOpacity onPress={toggleCollapsed} style={styles.arrowContainer}>
        <MaterialIcons
          name={collapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF5E4',
    borderRadius: 20,
    marginVertical: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 40,
  },
  arrowContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{ translateX: -12 }],
  },
  cardContent: {
    padding: 25,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
  },
  selectedButton: {
    backgroundColor: '#DFA67B',
  },
  buttonText: {
    textAlign: 'center',
  },
  intextContent:{
  }
});

export default BSCard;
