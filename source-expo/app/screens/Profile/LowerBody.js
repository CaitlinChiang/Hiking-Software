import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Text from '@components/Text';
import Slider from '@react-native-community/slider';
import RNPickerSelect from 'react-native-picker-select';
import PlaceholderImage from './Logos/lowerBody.png';
import IconSelector from './IconSelector'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const icons = [
  require('./Logos/LowerBody/Vlow.png'),
  require('./Logos/LowerBody/Low.png'),
  require('./Logos/LowerBody/Moderate.png'),
  require('./Logos/LowerBody/AbvAvg.png'),
  require('./Logos/LowerBody/Excp.png'),
];

const texts = [
  'Very low strength',
  'Low strength',
  'Moderate strength',
  'Above average strength',
  'Exceptional strength',
];

const BSCard = ({ title, value, onValueChange, selectorItems }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedIconIndex, setSelectedIconIndex] = useState(-1);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleIconPress = (index) => {
    onValueChange(index + 1);
    setSelectedIconIndex(index);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={toggleCollapsed} style={styles.cardHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={PlaceholderImage} style={{ width: 30, height: 30, marginRight: 10 }} />
          <Text headline semibold>
            {collapsed ? title : "Rate your perceived lower body strength"}
          </Text>
        </View>
      </TouchableOpacity>
      {!collapsed && (
        <View style={styles.cardContent}>
          {selectorItems ? (
            <RNPickerSelect
              onValueChange={(val) => onValueChange(val)}
              items={selectorItems}
              style={styles.pickerSelect}
              value={value}
            />
          ) : (
            <>
              <IconSelector
                images={icons}
                selectedIconIndex={value - 1}
                onIconPress={handleIconPress}
              />
              {selectedIconIndex >= 0 && (
                <View style={styles.textContainer}>
                  <Text style={styles.strengthText}>{texts[selectedIconIndex]}</Text>
                </View>
              )}
            </>
          )}
        </View>
      )}
      <View style={[styles.arrowContainer, collapsed ? styles.rightMiddleArrow : styles.bottomCenterArrow]}>
        <TouchableOpacity onPress={toggleCollapsed}>
          <MaterialIcons
            name={collapsed ? 'keyboard-arrow-down' : 'keyboard-arrow-up'}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
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
    padding: 40,
  },
  cardContent: {
    padding: 25,
  },
  pickerSelect: {
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30,
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30,
    },
  },
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{ translateX: -12 }],
  },
  rightMiddleArrow: {
    bottom: '25%',
    left: '81%',
    transform: [{ translateY: -12 }],
  },
  bottomCenterArrow: {
    bottom: "0.02%",
    left: '47%',
    transform: [{ translateY: -12 }],
  },
  textContainer: {
    backgroundColor: '#E9B384',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: "12%",
    maxWidth: '80%', 
    alignSelf: 'center',
  },
  strengthText: {
    fontSize: 12,
    padding: 10,
    textAlign: 'center',
  },

});

export default BSCard;
