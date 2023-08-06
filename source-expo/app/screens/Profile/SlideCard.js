import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Text from '@components/Text';
import UpperBodyLogoPng from './Logos/upperBody.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconSelector from './IconSelector';

const icons = [
  require('./Logos/UpperBody/VWeak.png'),
  require('./Logos/UpperBody/LowStg.png'),
  require('./Logos/UpperBody/AvgStg.png'),
  require('./Logos/UpperBody/AbvAvg.png'),
  require('./Logos/UpperBody/VStrong.png'),
];

// To printout
const getStrengthText = (value) => {
  // console.log('Received value:', value);

  const strengthTexts = [
    'Very weak',
    'Low strength',
    'Average strength',
    'Above average strength',
    'Very strong',
  ];
  return strengthTexts[value - 1];
};

const SliderCard = ({ title, value, onValueChange, collapsed, onToggle }) => {
  const isValueSelected = value > 0;

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onToggle} style={styles.cardHeader}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={UpperBodyLogoPng} style={{ width: 30, height: 30, marginRight: 10 }} />
          <Text headline semibold>
            {collapsed ? title : "Rate your perceived upper body strength"}
          </Text>
        </View>
      </TouchableOpacity>
      {!collapsed && (
        <View style={styles.cardContent}>
          <IconSelector
            images={icons}
            selectedIconIndex={value - 1}
            onIconPress={(index) => onValueChange(index + 1)}
          />
          {isValueSelected && ( // Show the text only if a value is selected
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <Text style={styles.legendText}>
                  {getStrengthText(value)}
                </Text>
              </View>
            </View>
          )}
        </View>
      )}
      <TouchableOpacity onPress={onToggle} style={[styles.arrowContainer, collapsed ? styles.middleRightArrow : styles.bottomCenterArrow]}>
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
  cardContent: {
    padding: 25,
  },
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    transform: [{ translateX: -12 }],
  },
  middleRightArrow: {
    bottom: '25%',
    right:"10%",
    transform: [{ translateY: -12 }],
  },
  bottomCenterArrow: {
    bottom: 10,
    right: "42%",
  },
  legendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  legendItem: {
    backgroundColor: '#E9B384',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginBottom: 40,
  },
  legendText: {
    fontSize: 12,
    padding: 10,
    textAlign: 'center',

  },
});

export default SliderCard;
