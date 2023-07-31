import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Text from '@components/Text';
import UpperBodyLogoPng from './Logos/upperBody.png';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconSelector from './IconSelector';

const icons = [
  require('./Logos/UpperBody/VWeak.png'),
  require('./Logos/UpperBody/LowStg.png'),
  require('./Logos/UpperBody/AbvAvg.png'),
  require('./Logos/UpperBody/AvgStg.png'),
  require('./Logos/UpperBody/VStrong.png'),
];

const SliderCard = ({ title, value, onValueChange, collapsed, onToggle }) => {
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
      {collapsed ? null : (
        <View style={styles.cardContent}>
          {/* Use the IconSelector component here */}
          <IconSelector
            images={icons}
            selectedIconIndex={value - 1}
            onIconPress={(index) => onValueChange(index + 1)}
          />
          <View style={{ padding: 20 }}>
            <Text>1 (Very weak)</Text>
            <Text>3 (Low strength)</Text>
            <Text>5 (Average strength)</Text>
            <Text>7 (Above average strength)</Text>
            <Text>10 (Very strong)</Text>
          </View>
        </View>
      )}
      <TouchableOpacity onPress={onToggle} style={styles.arrowContainer}>
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
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{ translateX: -12 }],
  },
});

export default SliderCard;
