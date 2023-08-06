import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import Text from '@components/Text';
import PlaceholderImage from './Logos/flexibility.png'; 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FlexibilityCard = ({ title, value, onValueChange, selectorItems }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleOptionPress = (newValue) => {
    onValueChange(newValue);
    // You can choose whether to close the card here or not
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.button,
        value === item.value && styles.selectedButton,
      ]}
      onPress={() => handleOptionPress(item.value)}
    >
      <Text style={styles.buttonText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={toggleCollapsed}
        style={styles.cardHeader}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image source={PlaceholderImage} style={{ width: 30, height: 30, marginRight: 10 }} />
          <Text headline semibold>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
      {!collapsed && (
        <View style={styles.cardContent}>
          <FlatList
            data={selectorItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.value.toString()}
            contentContainerStyle={styles.buttonContainer}
          />
        </View>
      )}<View style={[styles.arrowContainer, collapsed ? styles.rightMiddleArrow : styles.bottomCenterArrow]}>
          <TouchableOpacity
            onPress={toggleCollapsed}
            style={styles.arrowContainer}
          >
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
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,

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
  arrowContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: [{ translateX: -12 }],
  },
  rightMiddleArrow: {
    bottom: '15%',
    left: '86%',
    transform: [{ translateY: -12 }],
  },
  bottomCenterArrow: {
    bottom: -8,
    left: '50%',
    transform: [{ translateY: -12 }],}
});

export default FlexibilityCard;
