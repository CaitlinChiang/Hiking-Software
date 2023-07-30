import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Text from '@components/Text';
import Slider from '@react-native-community/slider';

const CollapsibleCard = ({ title, value, onValueChange }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [showUpperBodyStrength, setShowUpperBodyStrength] = useState(false);

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
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 100,
    },
    cardContainer: {
      marginBottom: 20,
      backgroundColor: '#F4F2DE', // Change this to the desired lighter orange color
      borderRadius: 20,
      shadowColor: '#020',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    card: {
      backgroundColor: '#FFF5E4',
    //   borderWidth: 1,
    //   borderColor: 'white',
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
  
  export default CollapsibleCard;
  
