import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
const cardHeight = (6 * width) / 4;

const CardWithImage = ({ imageSrc, mountainName, location, grading }) => {
  let topMountainName = '';
  let bottomMountainName = '';
  const words = mountainName.split(' ');

  if (words.length > 1) {
    // Mountain name has two words, display one on top and one at the bottom
    topMountainName = words.slice(0, Math.ceil(words.length / 2)).join(' ');
    bottomMountainName = words.slice(Math.ceil(words.length / 2)).join(' ');
  } else {
    // Mountain name has one word, display it at the bottom
    bottomMountainName = mountainName;
  }

  return (
    <View style={styles.cardContainer}>
      <Image source={{ uri: imageSrc }} style={styles.image} resizeMode="cover" />
      <View style={styles.textContainer}>
        {/* Grading container */}
        {grading && (
          <View style={styles.gradingContainer}>
            <Text style={styles.gradingText}>{grading}</Text>
          </View>
        )}
        <View style={styles.topMountainNameContainer}>
          <Text style={styles.mountainNameText}>{topMountainName}</Text>
        </View>
        <View style={styles.bottomMountainNameContainer}>
          <Text style={styles.mountainNameText}>{bottomMountainName}</Text>
        </View>
        <View style={styles.locationContainer}>
          <Icon name="map-marker" size={12} color="white" />
          <Text style={styles.locationText}>{location}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    marginBottom: 0,
    marginTop: 50,
    borderRadius: 20,
    overflow: 'hidden',
    width: '91%',
    aspectRatio: 4 / 6,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 46,
    left: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  topMountainNameContainer: {
    marginBottom: -10,
  },
  bottomMountainNameContainer: {
    marginBottom: 5,
  },
  mountainNameText: {
    color: 'white',
    fontSize: 44,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 4,
  },
  gradingContainer: {
    backgroundColor: '#E9B384',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
  },
  gradingText: {
    color: 'white',
    fontSize: 14,
  },
});

export default CardWithImage;
