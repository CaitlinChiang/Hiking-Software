import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Text from '@components/Text';
import Slider from '@react-native-community/slider';
import UpperBodyLogoPng from './Logos/upperBody.png';

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
            <Text>1 (Very weak)</Text>
            <Text>3 (Low strength)</Text>
            <Text>5 (Average strength)</Text>
            <Text>7 (Above average strength)</Text>
            <Text>10 (Very strong)</Text>
          </View>
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
});

export default SliderCard;
