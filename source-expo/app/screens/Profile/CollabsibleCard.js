import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Text from '@components/Text';
import StaminaLogoPng from './Logos/running.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconSelector from './IconSelector';

const icons = [
  require('./Logos/Stamina/VlowEnd.png'),
  require('./Logos/Stamina/LowEnd.png'),
  require('./Logos/Stamina/ModEnd.png'),
  require('./Logos/Stamina/AbvAvgEnd.png'),
  require('./Logos/Stamina/ExcpEnd.png'),
];

const texts = [
  'Very low endurance',
  'Low endurance',
  'Moderate endurance',
  'Above average endurance',
  'Exceptional endurance',
];

const CollapsibleCard = ({ title, value, onValueChange, selectorItems }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [selectedIconIndex, setSelectedIconIndex] = useState(0);


  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() => setCollapsed(!collapsed)} style={styles.cardHeader}>
        <View style={styles.titleContainer}>
          <Image source={StaminaLogoPng} style={{ width: 30, height: 30, marginRight: 10 }} />
          <Text headline semibold>
            {collapsed
              ? title
              : 'Rate your ability to sustain physical activity for an extended period'}
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
                onIconPress={(index) => {
                  onValueChange(index + 1);
                  setSelectedIconIndex(index);
                }}
              />
              <View style={styles.legendContainer}>
                {selectedIconIndex >= 0 && (
                  <View style={styles.legendItem}>
                    <Text style={styles.legendText}>{texts[selectedIconIndex]}</Text>
                  </View>
                )}
              </View>
            </>
          )}
        </View>
      )}
      <View
        style={[
          styles.arrowContainer,
          collapsed ? styles.rightMiddleArrow : styles.bottomCenterArrow,
        ]}
      >
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
  cardContainer: {
    marginBottom: 10,
    backgroundColor: '#FFF5E4',
    borderRadius: 20,
    position: 'relative',
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
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  icon: {
    backgroundColor: 'transparent',
    borderRadius: 50,
    padding: 10,
    borderWidth: 2,
    borderColor: '#FFF5E4',
  },
  selectedIcon: {
    borderColor: '#FF8551',
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 5,
    left: '50%',
    transform: [{ translateX: -12 }],
  },
  rightMiddleArrow: {
    top: '30%',
    left: '83%',
    transform: [{ translateY: -12 }],
  },
  bottomCenterArrow: {
    bottom: 5,
  },
  legendContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  legendItem: {
    backgroundColor: '#E9B384',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: "12%",

  },
  legendText: {
    fontSize: 12,
    padding: 10,
    textAlign: 'center',
  },
});

export default CollapsibleCard;
