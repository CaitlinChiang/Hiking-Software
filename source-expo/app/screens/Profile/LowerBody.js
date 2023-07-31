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

const BSCard = ({ title, value, onValueChange, selectorItems }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => setCollapsed(!collapsed)} style={styles.cardHeader}>
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
                onIconPress={(index) => onValueChange(index + 1)}
              />
              <View style={{ padding: 20 }}>
                <Text>1 (Very low)</Text>
                <Text>3 (Low)</Text>
                <Text>5 (Moderate)</Text>
                <Text>7 (Above average)</Text>
                <Text>10 (Exceptional)</Text>
              </View>
            </>
          )}
        </View>
      )}
      <View style={styles.arrowContainer}>
        <TouchableOpacity onPress={() => setCollapsed(!collapsed)}>
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
});

export default BSCard;
