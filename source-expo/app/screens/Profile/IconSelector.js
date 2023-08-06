import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const IconSelector = ({ images, selectedIconIndex, onIconPress }) => {
  return (
    <View style={styles.iconsContainer}>
      {images.map((image, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.icon, selectedIconIndex === index ? styles.selectedIcon : null]}
          onPress={() => onIconPress(index)}
        >
          <Image source={image} style={styles.iconImage} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default IconSelector;
