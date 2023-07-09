import React from 'react';
import {Image, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default function Index(props) {
  const {style, imageUrl} = props;
  return (
    <View style={[styles.container, style]}>
      <Image source={{ uri: imageUrl }} style={{ ...styles.content, borderRadius: 10 }} />
    </View>
  );
}

Index.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  imageUrl: PropTypes.string,
  resizeMode: PropTypes.string,
};

Index.defaultProps = {
  style: {},
  imageUrl: '',
  resizeMode: 'cover',
};
