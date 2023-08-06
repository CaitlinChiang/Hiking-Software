import React from 'react';
import { View, Image, StyleSheet, Dimensions, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
const cardHeight = (6 * width) / 4;

const CardWithImage = ({ imageSrc, mountainName, location, grading, duration, onPressCross }) => {
    let topMountainName = '';
    let bottomMountainName = '';
    const words = mountainName.split(' ');
  
    if (words.length > 1) {
      topMountainName = words.slice(0, Math.ceil(words.length / 2)).join(' ');
      bottomMountainName = words.slice(Math.ceil(words.length / 2)).join(' ');
    } else {
      bottomMountainName = mountainName;
    }
  
    return (
      <View style={styles.cardContainer}>
        <Image source={{ uri: imageSrc }} style={styles.image} resizeMode="cover" />
        <TouchableOpacity style={styles.crossIconContainer} onPress={onPressCross}>
          <Icon name="times" size={20} color="white" />
        </TouchableOpacity>
        <View style={styles.textContainer}>
          {grading && ( 
            <View style={styles.gradingContainer}>
              <Text style={styles.gradingText}>{"Fitness Level: " + grading}</Text>
            </View>
          )}
          <View style={styles.mountainNameContainer}>
            <View style={styles.topMountainNameContainer}>
              <Text style={styles.mountainNameText}>{topMountainName}</Text>
            </View>
            <View style={styles.bottomMountainNameContainer}>
              <Text style={styles.mountainNameText}>{bottomMountainName}</Text>
            </View>
          </View>
          <View style={styles.locationDurationContainer}>
            <View style={styles.locationContainer}>
              <Icon name="map-marker" size={12} color="white" />
              <Text style={styles.locationText}>{location}</Text>
            </View>
            {duration && (
              <View style={styles.durationContainer}>
                <Text style={styles.durationText}>{duration}</Text>
              </View>
            )}
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
    bottom: 20,
    left: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 30,
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
    backgroundColor: '#EF6262',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    marginRight: 10, 
  },
  gradingText: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 14,
  },
  crossIconContainer: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  durationContainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: -3,
    left: 80, 
    paddingHorizontal: 12, 
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingVertical: 4,
    borderRadius: 20,
    marginLeft: 20,
  },
  durationText: {
    color: 'white',
    fontSize: 14,
  },
});

export default CardWithImage;
