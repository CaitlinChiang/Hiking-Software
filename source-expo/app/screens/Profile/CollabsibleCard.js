import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Text from '@components/Text';
import Slider from '@react-native-community/slider';
import RNPickerSelect from 'react-native-picker-select';
import StaminaLogoPng from './Logos/running.png';

const CollapsibleCard = ({ title, value, onValueChange, selectorItems }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        onPress={() => setCollapsed(!collapsed)}
        style={styles.cardHeader}
      >
        <Image source={StaminaLogoPng} style={{ width: 30, height: 30 }} />
        <Text headline semibold>
          {collapsed ? title : "Rate your ability to sustain physical activity for an extended period"}
        </Text>
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
              <Text style={{ textAlign: 'center' }} headline semibold>
                {value}
              </Text>
              <Slider
                style={{ marginRight: 50, marginLeft: 50 }}
                minimumValue={1}
                maximumValue={10}
                step={1}
                minimumTrackTintColor="blue"
                maximumTrackTintColor="grey"
                value={value}
                onValueChange={onValueChange}
              />
              <View style={{ padding: 20 }}>
                <Text>1 (Very low endurance)</Text>
                <Text>3 (Low endurance)</Text>
                <Text>5 (Moderate endurance)</Text>
                <Text>7 (Above average endurance)</Text>
                <Text>10 (Exceptional endurance)</Text>
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 20,
    backgroundColor: '#FFF5E4',
    borderRadius: 20,
    // shadowColor: '#020',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5,
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
});

export default CollapsibleCard;
