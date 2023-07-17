import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Image, Text} from '@components';
import styles from './styles';
import {useTheme} from '@config';
import PropTypes from 'prop-types';

export default function PostListItem(props) {
  const {style, name, location, summitHeight, duration, ydsGrading, ydsClass, date, onPress, image} = props;
  const {colors} = useTheme();
  const cardColor = colors.card;
  return (
    <TouchableOpacity
      style={[styles.contain, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <Image imageUrl={image} style={styles.imageBanner} />
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>{ydsGrading}</Text>
      </View>
      <View style={[styles.content, { zIndex: -1, marginLeft: -10, paddingLeft: 20, backgroundColor: cardColor, borderRadius: 10 }]}>
        {name != '' && (
          <View style={styles.contentTitle}>
            <Text headline semibold>
              {name}
            </Text>
          </View>
        )}
        <View style={{flex: 1}}>
          <Text body2 grayColor numberOfLines={5} style={{paddingVertical: 5}}>
            {`Location: ${location} \n`}
            {`Summit Height: ${summitHeight} \n`}
            {`Duration: ${duration} \n`}
            {`YDS Class: ${ydsClass} \n`}
          </Text>
        </View>
        {date != '' && (
          <View style={styles.contentDate}>
            <Text caption1 primaryColor>
              {date}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

PostListItem.propTypes = {
  image: PropTypes.node.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  onPress: PropTypes.func,
};

PostListItem.defaultProps = {
  image: '',
  title: '',
  description: '',
  date: '',
  style: {},
  onPress: () => {},
};
