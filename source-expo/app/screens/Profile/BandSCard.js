import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Text from '@components/Text';
import Slider from '@react-native-community/slider';
import RNPickerSelect from 'react-native-picker-select';

const BSCard = ({ title, value, onValueChange, selectorItems }) => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => setCollapsed(!collapsed)}
        style={styles.cardHeader}
      >
        <Text headline semibold>
          {title}
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
});

export default BSCard;
